import { Router } from "express";
import { products } from "../utils/constants.mjs";

const router = Router();

// a get request to display all the products
router.get("/api/products", (request, response) => {
  response.send(products);
});

export default router;
