import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

// Helper function to get the last 10 days' dates in UTC
function getLast10Days() {
  const dates = [];
  let currentDate = new Date();

  for (let i = 0; i < 10; i++) {
    const date = new Date(currentDate);
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0); // Normalize to UTC midnight
    dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }

  return dates.reverse(); // Oldest to most recent
}

// Helper function to format dates to "DD MMM YYYY"
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export const getAnalyticsData = async () => {
  const datesInRange = getLast10Days();
  const analytics = [];

  // Get **total** count of Users, Products, and Orders (not just last 10 days)
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalSales = await Order.countDocuments();

  for (let date of datesInRange) {
    const formattedDate = formatDate(date);

    // Convert `date` string to a UTC Date object
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

 
    // Get daily count of Users, Products, and Orders created on that day
    const dailyUsers = await User.countDocuments({
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    const dailyProducts = await Product.countDocuments({
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    const dailySales = await Order.countDocuments({
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    analytics.push({
      name: formattedDate,
      users: dailyUsers,
      sales: dailySales,
      products: dailyProducts,
    });
  }

  return {
    totalUsers,    // Total count of users in DB
    totalSales,    // Total count of orders in DB
    totalProducts, // Total count of products in DB
    analytics,     // Breakdown for last 10 days
  };
};
