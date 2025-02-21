import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

// Helper function to get the last 10 days' dates
function getLast10Days() {
  const dates = [];
  let currentDate = new Date();

  // Generate dates for the last 10 days
  for (let i = 0; i < 10; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i); // Subtract i days from current date
    dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }

  return dates.reverse(); // To start from the oldest to the most recent
}

// Helper function to format dates to "DD MMM YYYY" format
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Intl.DateTimeFormat('en-GB', options).format(date); // Returns in the desired format: "01 Feb 2024"
}

export const getAnalyticsData = async () => {
  const datesInRange = getLast10Days();
  const analytics = [];
  let totalUsers = 0;
  let totalProducts = 0;
  let totalSales = 0;

  for (let date of datesInRange) {
    const formattedDate = formatDate(date);

    // Get user count for each date
    const dailyUsers = await User.countDocuments({
      createdAt: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) },
    });
    totalUsers += dailyUsers; // Accumulate total users

    // Get product count for each date
    const dailyProducts = await Product.countDocuments({
      createdAt: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) },
    });
    totalProducts += dailyProducts; // Accumulate total products

    // Get order count (sales) for each date
    const dailySales = await Order.countDocuments({
      createdAt: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) },
    });
    totalSales += dailySales; // Accumulate total sales

    // Push the daily data to the analytics array
    analytics.push({
      name: formattedDate,
      users: dailyUsers,
      sales: dailySales,
      products: dailyProducts,
    });
  }

  // Add total counts to the response
  return {
    totalUsers,
    totalSales,
    totalProducts,
    analytics, // Array of the last 10 days' data
  };
};
