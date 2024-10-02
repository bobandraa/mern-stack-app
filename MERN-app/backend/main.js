import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/products.model.js";

dotenv.config();

const app = express();

app.post("/products", async(req, res) => {
    const product = req.body; //user entered data to send

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, message: newProduct })
    } catch(error){
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message:("Server Error")});
    } 
});

console.log(process.env.MONGO_URI);

app.listen(4000, () => {
    connectDB();
    console.log("Server started at http://localhost:4000");
});