import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    image: {type: String},
    category: {type: [String]},
    features: {type: String},
    quantity: {type: Number},
    isActive: {type: Boolean},
    article: {type: String},
})

export default mongoose.model("Products", productSchema)