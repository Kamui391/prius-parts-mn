import { DATA_URLS } from "../config.js";
import { fetchJson, once } from "../fn/http.js";

export const loadSuppliers = once(() => fetchJson(DATA_URLS.suppliers));

// [{ id: 1, ... }] -> Map { 1 => { id: 1, ... } }  (id-аар хурдан хайхад)
export async function loadSupplierMap() {
  const suppliers = await loadSuppliers();
  return new Map(suppliers.map((supplier) => [supplier.id, supplier]));
}