import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: { type: String },
        image: { type: [String] },
        category: { type: [String] },
        inStock: { type: Boolean},
        article: { type: String },
    }
);


export default mongoose.model("Products", productSchema)