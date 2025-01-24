import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUser = () => {
    const AxiosSecure = useAxiosSecure();

    // Fetch all users
    const { data: users = [], refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await AxiosSecure.get("user");
            return res.data;
        },
    });

    // Handle status change
    const handleStatusChange = (user) => {
        const newStatus = user.status === "active" ? "blocked" : "active";
        AxiosSecure.patch(`/user/status/${user._id}`, { status: newStatus })
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Status Updated!",
                        text: `${user.name} is now ${newStatus}`,
                        icon: "success",
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update status", "error");
            });
    };

    // Handle role change
    const handleRoleChange = (user, newRole) => {
        AxiosSecure.patch(`/user/role/${user._id}`, { role: newRole })
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Role Updated!",
                        text: `${user.name} is now a ${newRole}`,
                        icon: "success",
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update role", "error");
            });
    };

    return (
        <div>
            <div className="flex justify-evenly">
                <h3 className="text-3xl">Total Users: {users.length}</h3>
                <h3 className="text-3xl">All Users</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img src={user.image} alt="User" />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>
                                    <select
                                        className="select select-bordered border-gray-300"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user, e.target.value)}
                                    >
                                        <option value="Donor">Donor</option>
                                        <option value="Volunteer">Volunteer</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className={`btn ${user.status === "active" ? "btn-success" : "btn-error"} btn-sm`}
                                        onClick={() => handleStatusChange(user)}
                                    >
                                        {user.status === "active" ? "Active (Click to Block)" : "Blocked (Click to Activate)"}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "This will delete the user permanently.",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Yes, delete it!",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    AxiosSecure.delete(`/user/${user._id}`).then((res) => {
                                                        if (res.data.deletedCount > 0) {
                                                            Swal.fire("Deleted!", "User has been deleted.", "success");
                                                            refetch();
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <FaTrash className="text-red-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
