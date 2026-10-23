import Products from "../model/productModel.js";

export const getAll = async (req, res) => {
    try {
        const allProducts = await Products.find();
        if(!allProducts || allProducts.length === 0) {
            return res.status(404).json({message: "There are no Products with your request"})
        }
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}