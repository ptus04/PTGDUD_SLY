import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);

  // Fetch data from API
  useEffect(() => {
    fetch("https://res.cloudinary.com/dqyqckhcd/raw/upload/dashboard.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Helper function to format numbers
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  // Helper function to format currency
  const formatCurrency = (value, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 p-6">
      {/* Top Stats */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {data.stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
          >
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold">
              {stat.currency
                ? formatCurrency(stat.value, stat.currency)
                : formatNumber(stat.value)}
            </p>
            <p
              className={`text-sm ${
                stat.changeType === "increase"
                  ? "text-green-500"
                  : stat.changeType === "decrease"
                    ? "text-red-500"
                    : "text-yellow-500"
              }`}
            >
              {stat.changeType === "increase" ? "↑" : "↓"} {stat.change}%
            </p>
            <a
              href={stat.link.url}
              className="text-sm text-blue-500 hover:underline"
            >
              {stat.link.text}
            </a>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Total Sales Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              {data.charts.totalSales.title}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.charts.totalSales.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Statistics Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {data.charts.monthlyStatistics.title}
            </h3>
            <button className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200">
              Last 7 Days
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.charts.monthlyStatistics.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.bottomStats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center justify-between rounded-lg bg-white p-6 shadow"
          >
            <div>
              <h3 className="text-sm text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold">{formatNumber(stat.value)}</p>
            </div>
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full bg-${stat.color}-100`}
            >
              <p className={`font-bold text-${stat.color}-500`}>
                {stat.progress}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
