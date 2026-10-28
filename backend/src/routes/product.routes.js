import express from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getAllProducts, getProductsBySeller } from "../controllers/product.controller.js"
import multer from "multer"
import { createProductValidator } from "../validator/product.validator.js";


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024    // 5 MB
    }
})


const router = express.Router()


/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */

router.post("/", authenticateSeller, upload.array('images', 7), createProductValidator, createProduct)


/**
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
router.get("/seller", authenticateSeller, getProductsBySeller)

/**
 * @route GET /api/products
 * @description Get all products (for public view)
 * @access Public
 */
router.get("/", getAllProducts) 

export default router;  