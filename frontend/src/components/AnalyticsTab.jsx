import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    analytics: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData); // Update with new structure
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.totalUsers.toLocaleString()} // Use totalUsers from the response
          icon={Users}
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.totalProducts.toLocaleString()} // Use totalProducts from the response
          icon={Package}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()} // Use totalSales from the response
          icon={ShoppingCart}
        />
      </div>

      {/* Analytics Chart */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analyticsData.analytics}> {/* Use the analytics array here */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="users"
              fill="#808080"
              name="Users"
              barSize={30}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="products"
              fill="#000"
              name="Products"
              barSize={30}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="sales"
              fill="#36454f"
              name="Sales"
              barSize={30}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-white text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-400 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-white opacity-70">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
