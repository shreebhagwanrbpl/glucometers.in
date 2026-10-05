import "server-only";
import { WEBSITE_ID, COMPANY_ID } from "./catalog-utils";
export const ADMIN_API_BASE_URL=(process.env.ADMIN_API_BASE_URL||process.env.ADMIN_API_URL||"https://admin.rajbiosis.app").replace(/\/+$/,"");
function buildUrl(pathname,params={}){const url=new URL(`${ADMIN_API_BASE_URL}${pathname.startsWith("/")?pathname:`/${pathname}`}`);Object.entries({websiteId:WEBSITE_ID,companyId:COMPANY_ID,...params}).forEach(([k,v])=>{if(v!==undefined&&v!==null&&v!=="")url.searchParams.set(k,String(v));});return url;}
export async function adminFetch(pathname,options={},params={}){const r=await fetch(buildUrl(pathname,params),{...options,cache:"no-store",headers:{Accept:"application/json",...(options.headers||{})}});const t=await r.text();let b=null;try{b=t?JSON.parse(t):null}catch{b=t;}if(!r.ok||b?.success===false||b?.ok===false)throw new Error(`Admin API ${r.status}: ${typeof b==="string"?b:JSON.stringify(b)}`);return b;}
export async function postAdminQuery(endpoint,payload={}){return adminFetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({websiteId:WEBSITE_ID,companyId:COMPANY_ID,...payload})});}
export async function fetchCatalogFromAdmin(){const j=await adminFetch("/api/catalog");const p=j?.products??j?.data?.products??j?.data??j;return Array.isArray(p)?p:[];}
