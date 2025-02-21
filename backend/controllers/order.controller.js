import Order from "../models/order.model.js";   
import Product from "../models/product.model.js";  
 import User from "../models/user.model.js" 
 export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate the products in the order
    const orderProducts = [];
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
      }

      // Check if there's enough quantity in stock
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
      }

      // Decrease stock in the product, ensuring it doesn't go below 1
      const updatedQuantity = product.quantity - item.quantity;
      if (updatedQuantity < 0) {
        return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
      }

      product.quantity = updatedQuantity;
      await product.save();

      // Prepare the product details for the order
      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Add the product price to the total amount
      totalAmount += product.price * item.quantity;
    }

    // Create the order
    const newOrder = await Order.create({
      user: userId,
      products: orderProducts,
      totalAmount,
      status: "pending",
    });

    // After the order is successfully placed, clear the user's cart
    const user = await User.findById(userId); // Assuming you have a User model
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartItems = []; // Clear the cart
    await user.save(); // Save the updated user

    res.status(201).json(newOrder); // Send the response with the new order
  } catch (error) {
    console.error("Error in createOrder controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

