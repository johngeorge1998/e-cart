import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products });
	} catch (error) {
		console.error("Error in getAllProducts controller:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts.length) {
			return res.status(404).json({ message: "No featured products found" });
		}

		await redis.set("featured_products", JSON.stringify(featuredProducts));
		res.json(featuredProducts);
	} catch (error) {
		console.error("Error in getFeaturedProducts controller:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category, quantity } = req.body;

		if (quantity < 1) {
			return res.status(400).json({ message: "Product quantity must be at least 1." });
		}

		let cloudinaryResponse = null;
		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url || "",
			category,
			quantity,
		});

		res.status(201).json(product);
	} catch (error) {
		console.error("Error in createProduct controller:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			try {
				const publicId = product.image.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("Deleted image from Cloudinary");
			} catch (error) {
				console.error("Error deleting image from Cloudinary:", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error in deleteProduct controller:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
	  const products = await Product.aggregate([
 		{
		  $match: {
			quantity: { $gt: 0 },
		  },
		},
 		{ $sample: { size: 4 } },
 		{
		  $project: {
			_id: 1,
			name: 1,
			description: 1,
			image: 1,
			price: 1,
		  },
		},
	  ]);
	  
	  res.json(products);
	} catch (error) {
	  console.error("Error in getRecommendedProducts controller:", error);
	  res.status(500).json({ message: "Server error", error: error.message });
	}
  };
  

export const getProductsByCategory = async (req, res) => {
	try {
		const products = await Product.find({ category: req.params.category });
		res.json({ products });
	} catch (error) {
		console.error("Error in getProductsByCategory controller:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		product.isFeatured = !product.isFeatured;
		await product.save();
		await updateFeaturedProductsCache();

		res.json(product);
	} catch (error) {
		console.error("Error in toggleFeaturedProduct controller:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.error("Error in update cache function:", error);
	}
}

export const editProduct = async (req, res) => {
	try {
	  const { name, description, price, image, category, quantity } = req.body;
	  const productId = req.params.id;
  
	  // Check if the quantity is valid
	  if (quantity < 0) {
		return res.status(400).json({ message: "Product quantity must be at least 0." });
	  }
  
	  // Find the product to update
	  const product = await Product.findById(productId);
	  if (!product) {
		return res.status(404).json({ message: "Product not found" });
	  }
  
	  // Handle image upload if provided
	  let cloudinaryResponse = null;
	  if (image) {
		cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
	  }
  
	  // Update product fields
	  product.name = name || product.name;
	  product.description = description || product.description;
	  product.price = price || product.price;
	  product.image = cloudinaryResponse?.secure_url || product.image;
	  product.category = category || product.category;
	  product.quantity = quantity !== undefined ? quantity : product.quantity;
  
	  // Save updated product
	  await product.save();
  
	  // Optionally clear the featured products cache if this is a featured product
	  if (product.isFeatured) {
		await updateFeaturedProductsCache();
	  }
  
	  res.json(product);
	} catch (error) {
	  console.error("Error in editProduct controller:", error);
	  res.status(500).json({ message: "Server error", error: error.message });
	}
  };
  