import { db } from "../config/db.js";

export const getallproducts = () => {
  return db("products").select("id", "name", "price");
};
