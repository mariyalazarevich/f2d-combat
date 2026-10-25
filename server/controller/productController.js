import Products from "../model/productModel.js";

export const getAll = async (req, res) => {
    try {
        const allProducts = await Products.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}