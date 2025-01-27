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
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {
                    blogs.map(blog => <>
                        <div className="card card-compact bg-[#FDEDEC] shadow-xl">
                            <figure>
                                <img
                                    src={blog.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{blog.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: blog.description }} />

                                <div className="card-actions justify-end">
                                    <Link to={`/blog-details/${blog._id}`}>
                                        <button className="btn btn-primary">Read More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default BlogPage;