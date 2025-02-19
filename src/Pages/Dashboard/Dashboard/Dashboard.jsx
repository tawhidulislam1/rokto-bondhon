import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RiRefundFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, CartesianGrid, BarChart, XAxis, YAxis, Bar } from "recharts";

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ["admin-states"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-states");
            return res.data;
        },
    });

    const bloodGroupData = stats.bloodGroups
        ? Object.entries(stats.bloodGroups).map(([group, count]) => ({
            name: group,
            value: count,
        }))
        : [];

    // Dynamically Generate Colors for Each Blood Group
    const generateColors = (length) => {
        const colors = ["#DC143C", "#FF6347", "#FFD700", "#32CD32", "#4169E1", "#8A2BE2", "#FF4500", "#00CED1"];
        return Array.from({ length }, (_, i) => colors[i % colors.length]); // Repeat colors if needed
    };

    const COLORS = generateColors(bloodGroupData.length);
    const requestStatusData = stats.requestStatus
        ? Object.entries(stats.requestStatus).map(([status, count]) => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),  // Capitalize the status name
            count,
        }))
        : [];

    return (
        <div className="p-6">
            <h3 className="text-3xl mb-6">
                Welcome back, <strong>{user?.displayName}</strong>
            </h3>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat bg-white p-4 rounded-lg shadow-md">
                    <div className="stat-figure text-secondary">
                        <RiRefundFill className="text-4xl text-red-500" />
                    </div>
                    <div className="stat-title text-gray-500">Total Funding</div>
                    <div className="stat-value text-red-600">
                        {stats.reveneu || 0} <small>tk</small>
                    </div>
                </div>

                <div className="stat bg-white p-4 rounded-lg shadow-md">
                    <div className="stat-figure text-secondary">
                        <FaUser className="text-4xl text-blue-500" />
                    </div>
                    <div className="stat-title text-gray-500">Total Donors</div>
                    <div className="stat-value text-blue-600">{stats.user || 0}</div>
                </div>

                <div className="stat bg-white p-4 rounded-lg shadow-md">
                    <div className="stat-figure text-secondary">
                        <CiSquareQuestion className="text-4xl text-green-500" />
                    </div>
                    <div className="stat-title text-gray-500">Total Blood Requests</div>
                    <div className="stat-value text-green-600">{stats.bloodRequeste || 0}</div>
                </div>
            </div>
            <div className="lg:flex">
                <div className="lg:w-1/2">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Donor Blood Group Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={bloodGroupData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#DC143C"
                                    dataKey="value"
                                    label
                                >
                                    {bloodGroupData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Donation Request Status</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={requestStatusData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div></div>
            </div>

            {/* Blood Group Pie Chart */}


        </div>
    );
};

export default Dashboard;
