import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CiSquareQuestion } from "react-icons/ci";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, CartesianGrid, BarChart, XAxis, YAxis, Bar } from "recharts";
const UserHome = () => {
    const { user } = useAuth();
    const AxiosSecure = useAxiosSecure();
    // Fetch all users
    const { data: donations = [], refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bloodReq/email/${user?.email}`);
            return res.data;
        },
    });

    console.log(donations);
    const sortedDonations = [...donations].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Slice to get the latest 3 donations
    const newRequest = sortedDonations.slice(0, 3);
    const updateStatus = (id, status) => {
        AxiosSecure.patch(`/bloodReq/${id}`, { status: status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Role Updated!",
                        text: `Your Blood Is Found`,
                        icon: "success",
                    });
                    refetch();
                }
            });
    };
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                AxiosSecure.delete(`/bloodReq/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        };
                    });
            }
        });
    };
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
        <div>
            <h3 className="text-3xl">Welcome back, <strong>{user?.displayName}</strong></h3>
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
            {donations.length > 0 && <>
                <div className="container mx-auto p-6">
                    <h2 className="text-3xl font-semibold text-center mb-6">Recent Donation Requests</h2>

                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Recipient Name</th>
                                <th className="px-4 py-2 border">Location</th>
                                <th className="px-4 py-2 border">Donation Date</th>
                                <th className="px-4 py-2 border">Donation Time</th>
                                <th className="px-4 py-2 border">Blood Group</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newRequest.map((donation, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{donation.recipientName}</td>
                                    <td className="px-4 py-2 border">
                                        {donation.district}, {donation.upajela}
                                    </td>
                                    <td className="px-4 py-2 border">{donation.donationDate}</td>
                                    <td className="px-4 py-2 border">{donation.donationtime}</td>
                                    <td className="px-4 py-2 border">{donation.bloodGroup}</td>
                                    <td className="px-4 py-2 border">{donation.status}
                                        {donation.status === "inprogress" && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(donation._id, "done")}
                                                    className="btn btn-sm btn-success mr-2"
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(donation._id, "canceled")}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border flex">

                                        <button
                                            onClick={() => handleDelete(donation._id)}
                                            className="btn btn-danger ml-2"
                                        >
                                            Delete
                                        </button>
                                        <button className="btn btn-info ml-2">View</button>
                                        <Link to={`/dashboard/udpateReq/${donation._id}`}>
                                            <button className="btn btn-warning ml-2">Edit</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>}
        </div>
    );
};

export default UserHome;