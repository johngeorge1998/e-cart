import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, products, address } = req.body;

    const orderProducts = [];
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for product ${product.name}` });
      }

      const updatedQuantity = product.quantity - item.quantity;
      if (updatedQuantity < 0) {
        return res
          .status(400)
          .json({ message: `Not enough stock for product ${product.name}` });
      }

      product.quantity = updatedQuantity;
      await product.save();

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const newOrder = await Order.create({
      user: userId,
      products: orderProducts,
      totalAmount,
      status: "pending",
      address: address,
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartItems = [];
    await user.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createOrder controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
