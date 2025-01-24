import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ContentHome = () => {
    const axiosSecure = useAxiosSecure();
    const { data: blogs = [], refetch } = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const res = await axiosSecure.get('blog');
            return res.data;
        }
    });
    const handleStatusChange = (user) => {
        const newStatus = user.status === "draft" ? "publised" : "draft";
        axiosSecure.patch(`/blog/${user._id}`, { status: newStatus })
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Status Updated!",
                        text: `your blog is now ${newStatus}`,
                        icon: "success",
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update status", "error");
            });
    };
    return (
        <div>
            <Link to={'/dashboard/add-blog'}>
                <button className="btn"> Add Blog</button>
            </Link>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>Thumble</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            blogs.map((blog, idx) =>
                                <tr key={idx}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={blog.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {blog.title}

                                    </td>
                                    <td>
                                        <button
                                            className={`btn ${blog.status === "publised" ? "btn-success" : "btn-error"} btn-sm`}
                                            onClick={() => handleStatusChange(blog)}
                                        >
                                            {blog.status === "publised" ? "publised (Click to draft)" : "draft (Click to publised)"}
                                        </button>
                                    </td>
                                    <th>
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
                                                        axiosSecure.delete(`/blog/${blog._id}`)
                                                            .then((res) => {
                                                                console.log(`${blog._id}`);
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
                                    </th>
                                </tr >
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ContentHome;