// import React, { useEffect, useState } from "react";
// import { fetchStatistics } from "../api";
// import { Box, Typography, Paper } from "@mui/material";
// import BackToTop from "../components/BackToTop";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#a4de6c"];

// function StatisticsPage() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadStats = async () => {
//       try {
//         const data = await fetchStatistics();
//         setStats(data);
//       } catch (err) {
//         console.error("Error fetching statistics:", err);
//         setError("Failed to load statistics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadStats();
//   }, []);

//   if (loading) return <p>Loading statistics...</p>;
//   if (error) return <p>{error}</p>;

//   // ✅ Transform API data into chart-friendly format
//   const expenseData = stats.categories.map((cat) => ({
//     category: cat.categories__title,
//     amount: cat.total,
//   }));

//   return (
//     <div>
//     <Box sx={{ px: 4, py: 6 }}>
//       <Typography variant="h4" gutterBottom>
//         Expense Breakdown
//       </Typography>

//       <Paper elevation={3} sx={{ p: 4, height: 550}}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={expenseData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="amount" fill="#8884d8">
//               {expenseData.map((entry, index) => (
//                 <cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </Paper>
//     </Box>
//     <BackToTop />
//     </div>
//   );
// }

// export default StatisticsPage;









import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../api";
import BackToTop from "../components/BackToTop";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = ["#b59f82", "#8b6f47", "#c9b79c", "#a68b6a", "#7c6651"];

function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStatistics();
        setStats(data);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p className="text-center">Loading statistics...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  // ✅ Transform API data into chart-friendly format
  const expenseData = stats.categories.map((cat) => ({
    category: cat.categories__title,
    amount: cat.total,
  }));

  return (
    <div className="min-h-screen font-serif p-8"
    style={{ backgroundImage: "url('/statistics.webp')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
       }}
    >
      <h2 className="text-3xl font-bold mb-6">Expense Breakdown</h2>

      <div>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={expenseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c9b79c" />
            <XAxis dataKey="category" stroke="#5c4a32" />
            <YAxis stroke="#5c4a32" />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount">
              {expenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <BackToTop />
    </div>
  );
}

export default StatisticsPage;
