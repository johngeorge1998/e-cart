 import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
	const totalUsers = await User.countDocuments();
	const totalProducts = await Product.countDocuments();




	return {
		users: totalUsers,
		products: totalProducts,
		
	};
};



function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}
