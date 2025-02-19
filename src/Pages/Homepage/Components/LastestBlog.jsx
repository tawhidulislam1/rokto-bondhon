import { useQuery } from "@tanstack/react-query";
import useAxosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const LastestBlog = () => {
    const axiosPublic = useAxosPublic();
    // const [blogs, setBlogs] = useState();
    const { data: blogs = [] } = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const res = await axiosPublic.get("/blog/active");
            const allBlog = res.data;
            const LatestBlog = allBlog.slice(-4).reverse();
            return LatestBlog;
        },
    });
    return (
        <div className="my-10">
            <div>
                <h2 className="text-center text-[#2E2E2E] text-3xl font-semibold dark:text-gray-200">Lastest Blog</h2>
                <p className="text-center py-3"></p>
            </div>
            <div >
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {blogs.map((blog, idx) => {
                        const words = blog.description.split(" ");
                        const shortDescription = words.slice(0, 200).join(" ") + (words.length > 200 ? "..." : "");

                        return (
                            <div key={idx} className="card card-compact bg-[#FDEDEC] shadow-xl">
                                <figure className="h-44">
                                    <img
                                        src={blog.image}
                                        alt="Blog Cover"
                                        className="w-full h-full object-cover rounded-t-xl"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title dark:text-gray-800">{blog.title}</h2>
                                    <div className="dark:text-gray-700" dangerouslySetInnerHTML={{ __html: shortDescription }} />

                                    <div className="card-actions justify-end">
                                        <Link to={`/blog-details/${blog._id}`}>
                                            <button className="btn bg-[#DC143C] text-white border-none">Read More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LastestBlog;