/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getAdminAllStats } from "@/service/dashboard/dashboardManagement";
import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, Map, Send, LayoutDashboard, TrendingUp } from "lucide-react";

export default function AdminDashboardHome() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const res = await getAdminAllStats();
            if (res.success) setStats(res.data);
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen font-semibold text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-2"></div>
            Loading Admin Dashboard...
        </div>
    );

    const chartData = [
        { name: 'Users', count: stats?.totalUsers || 0 },
        { name: 'Plans', count: stats?.totalTravelPlans || 0 },
        { name: 'Requests', count: stats?.totalJoinRequests || 0 },
    ];

    const pieData = [
        { name: 'Users', value: stats?.totalUsers || 0 },
        { name: 'Plans', value: stats?.totalTravelPlans || 0 },
        { name: 'Requests', value: stats?.totalJoinRequests || 0 },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    <LayoutDashboard className="text-blue-600" /> Admin Overview
                </h1>
                <p className="text-gray-500 mt-1">Global platform statistics and user activity.</p>
            </header>

            {/* 1. Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers}
                    icon={<Users size={24} />}
                    color="text-blue-600"
                    bgColor="bg-blue-100"
                />
                <StatCard
                    title="Total Travel Plans"
                    value={stats?.totalTravelPlans}
                    icon={<Map size={24} />}
                    color="text-green-600"
                    bgColor="bg-green-100"
                />
                <StatCard
                    title="Join Requests"
                    value={stats?.totalJoinRequests}
                    icon={<Send size={24} />}
                    color="text-orange-600"
                    bgColor="bg-orange-100"
                />
                <StatCard
                    title="Growth Rate"
                    value="12%"
                    icon={<TrendingUp size={24} />}
                    color="text-purple-600"
                    bgColor="bg-purple-100"
                />
            </div>

            {/* 2. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-700">Platform Activity</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-700">Data Distribution</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component: Stat Card
function StatCard({ title, value, icon, color, bgColor }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:scale-[1.02] hover:shadow-md cursor-default">
            <div className={`${bgColor} ${color} p-4 rounded-2xl`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-black text-gray-800 mt-0.5">{value || 0}</p>
            </div>
        </div>
    );
}
















// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";
// import { getAdminAllStats } from "@/service/dashboard/dashboardManagement";
// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// export default function AdminDashboardHome() {
//     const [stats, setStats] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadData = async () => {
//             const res = await getAdminAllStats();
//             if (res.success) setStats(res.data);
//             setLoading(false);
//         };
//         loadData();
//     }, []);

//     if (loading) return <p className="text-center p-10">Loading Admin Dashboard...</p>;

//     const chartData = [
//         { name: 'Users', count: stats?.totalUsers },
//         { name: 'Plans', count: stats?.totalTravelPlans },
//         { name: 'Requests', count: stats?.totalJoinRequests },
//         // { name: 'Payments', count: stats?.totalPayments },
//     ];

//     return (
//         <div className="p-8 bg-gray-50 min-h-screen">
//             <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>

//             {/* Overview Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
//                 <StatCard title="Total Users" value={stats?.totalUsers} color="bg-blue-500" />
//                 <StatCard title="Total Plans" value={stats?.totalTravelPlans} color="bg-green-500" />
//                 <StatCard title="Join Requests" value={stats?.totalJoinRequests} color="bg-orange-500" />
//                 {/* <StatCard title="Payments" value={stats?.totalPayments} color="bg-purple-500" /> */}
//             </div>

//             {/* Chart Section */}
//             <div className="bg-white p-6 rounded-lg shadow-sm border h-80">
//                 <h3 className="text-lg font-semibold mb-4">Platform Statistics</h3>
//                 <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={chartData}>
//                         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }

// function StatCard({ title, value, color }: any) {
//     return (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
//             <span className="text-gray-500 text-sm font-medium">{title}</span>
//             <span className={`text-4xl font-bold mt-2 ${color.replace('bg-', 'text-')}`}>{value}</span>
//         </div>
//     );
// }

