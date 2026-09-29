import { NextResponse } from "next/server";
import { getDynamicCatalog } from "@/lib/dynamic-catalog";
import { WEBSITE_ID } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const products = getDynamicCatalog();
    return NextResponse.json(
      { success: true, websiteId: WEBSITE_ID, products },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  } catch (e) {
    console.error("API Catalog route error:", e);
    return NextResponse.json(
      { success: false, error: e.message, products: [] },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  }
}
