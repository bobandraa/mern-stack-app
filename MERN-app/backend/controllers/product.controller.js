import mongoose from "mongoose";

import Product from "../models/products.model.js";


export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("Error fetching products", error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
};

export const createProduct =  async(req, res) => {
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
};

//using PUT method when updating full collection- use PATCH when updating specfic feilds of the collection
export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: true, message: "Invalid product id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}); // new:true object returns the old document by default
        res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({success: false, message: "Server error."});
    }

};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log("id:", id);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: true, message: "Invalid product id"})
    }
    
    try {
        await Product.findByIdAndDelete (id);
        res.status(201).json({success: true, message: ("Product deleted.")});
    } catch (error) {
        console.error("Error in Deleteing product:", error.message);
        res.status(500).json({success: false, message: ("Server error")});
    }
};