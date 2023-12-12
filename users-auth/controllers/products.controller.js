import { getallproducts } from "../models/products.model.js";

export const _getallproducts = async (req, res) => {
  try {
    const rows = await getallproducts();
    res.json(rows);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: e.message });
  }
};
