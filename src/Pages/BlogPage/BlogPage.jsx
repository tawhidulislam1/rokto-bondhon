import { useQuery } from "@tanstack/react-query";
import useAxosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const BlogPage = () => {
    const axiosPublic = useAxosPublic();
    const { data: blogs = [] } = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const res = await axiosPublic.get("/blog/active");
            return res.data;
        },
    });
    return (
        <div className="my-10">
            <div>
                <h2 className="text-center text-[#2E2E2E] text-3xl font-semibold dark:text-gray-200">All Blog</h2>
                <p className="text-center py-3"></p>
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {
                    blogs.map((blog, idx) => <div key={idx}>
                        <div className="card card-compact bg-[#FDEDEC] shadow-xl">
                            <figure className="h-40">
                                <img
                                    src={blog.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title dark:text-gray-800">{blog.title}</h2>
                                <div className="dark:text-gray-700" dangerouslySetInnerHTML={{ __html: blog.description }} />

                                <div className="card-actions justify-end">
                                    <Link to={`/blog-details/${blog._id}`}>
                                        <button className="btn btn-primary">Read More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default BlogPage;