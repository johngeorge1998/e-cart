import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: true,
    },
    quantity: { 
      type: Number,
      required: true,  
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


// Middleware to remove product if quantity reaches 0
productSchema.post("save", async function (doc) {
  if (doc.quantity === 0) {
    await Product.findByIdAndDelete(doc._id);
    console.log(`Product with ID ${doc._id} deleted due to zero quantity.`);
  }
});


const Product = mongoose.model("Product", productSchema);

export default Product;
