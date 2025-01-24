import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ShowReq = () => {
    const AxiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch all users
    const { data: donations = [], refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bloodReq/${user?.email}`);
            return res.data;
        },
    });


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
    return (
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
                    {donations.map((donation, index) => (
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
                                <button className="btn btn-warning ml-2">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowReq;