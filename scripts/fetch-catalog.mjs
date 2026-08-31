import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const firebaseConfig = {
  apiKey: "AIzaSyDGIJXX3MR1CxmIJbJHyVzbfRa0M0Sw6FQ",
  authDomain: "rajbiosis-central.firebaseapp.com",
  projectId: "rajbiosis-central",
  storageBucket: "rajbiosis-central.firebasestorage.app",
  messagingSenderId: "190335913620",
  appId: "1:190335913620:web:99a14edcbb528f06c1ee81"
};

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

async function run() {
  console.log("Initializing Firebase and fetching catalog from Firestore...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    const categorySnap = await getDocs(
      collection(
        db,
        "websites",
        "glucometersin",
        "pages",
        "categoryproducts",
        "categories"
      )
    );

    const allProducts = [];

    await Promise.all(
      categorySnap.docs.map(async (categoryDoc) => {
        const data = categoryDoc.data();
        const categoryName = data.category || categoryDoc.id;

        try {
          const subcategoriesCol = collection(
            db,
            "websites",
            "glucometersin",
            "pages",
            "categoryproducts",
            "categories",
            categoryDoc.id,
            "subcategories"
          );

          const subcategoriesSnap = await getDocs(subcategoriesCol);

          subcategoriesSnap.forEach((subDoc) => {
            const subData = subDoc.data();
            const subCategoryName = subData.subCategory || subDoc.id;

            const categoryProducts = (subData.products || [])
              .filter((p) => p.isPublished !== false)
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${subDoc.id}-${index}`,
                category: categoryName,
                subCategory: subCategoryName,
                slug: item.slug || makeSlug(item.title),
              }));

            allProducts.push(...categoryProducts);
          });
        } catch (subErr) {
          console.error(`Error fetching subcategories for category ${categoryDoc.id}:`, subErr);
        }

        if (data.products?.length) {
          const directProducts = data.products
            .filter((p) => p.isPublished !== false)
            .map((item, index) => ({
              ...item,
              uid: `${categoryDoc.id}-direct-${index}`,
              category: categoryName,
              subCategory: item.subCategory || categoryName,
              slug: item.slug || makeSlug(item.title),
            }));
          allProducts.push(...directProducts);
        }
      })
    );

    try {
      const oldSnap = await getDoc(
        doc(
          db,
          "websites",
          "glucometersin",
          "pages",
          "products"
        )
      );

      if (oldSnap.exists()) {
        const oldProducts = (oldSnap.data().products || [])
          .filter((p) => p.isPublished !== false)
          .map((item, index) => ({
            ...item,
            uid: `other-${index}`,
            category: "Other Products",
            subCategory: item.subCategory || "Other Products",
            slug: item.slug || makeSlug(item.title),
          }));

        allProducts.push(...oldProducts);
      }
    } catch (oldErr) {
      console.error("Error fetching legacy products:", oldErr);
    }

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const targetDir = path.join(__dirname, "..", "src", "data");
    const productsDir = path.join(targetDir, "products");
    
    if (!fs.existsSync(productsDir)) {
      fs.mkdirSync(productsDir, { recursive: true });
    }

    // 1. Write individual full product files
    console.log("Writing individual product JSON files...");
    allProducts.forEach((product) => {
      const productSlug = product.slug;
      if (productSlug) {
        const filePath = path.join(productsDir, `${productSlug}.json`);
        fs.writeFileSync(filePath, JSON.stringify(product, null, 2), "utf-8");
      }
    });

    // 2. Trim product info to create a lightweight summary catalog file
    const trimmedProducts = allProducts.map((p) => ({
      uid: p.uid,
      title: p.title,
      brand: p.brand || "",
      model: p.model || "",
      category: p.category || "",
      subCategory: p.subCategory || "",
      slug: p.slug,
      image: p.image || p.images?.[0] || "",
      images: p.images || []
    }));

    const targetFile = path.join(targetDir, "catalog-static.json");
    fs.writeFileSync(targetFile, JSON.stringify(trimmedProducts, null, 2), "utf-8");
    
    const publicDir = path.join(__dirname, "..", "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicFile = path.join(publicDir, "catalog-static.json");
    fs.writeFileSync(publicFile, JSON.stringify(trimmedProducts, null, 2), "utf-8");
    
    console.log(`Successfully wrote ${allProducts.length} product files to ${productsDir}`);
    console.log(`Successfully wrote trimmed catalog summary to ${targetFile} and ${publicFile}`);
    process.exit(0);
  } catch (err) {
    console.error("Fatal error fetching catalog:", err);
    process.exit(1);
  }
}

run();
