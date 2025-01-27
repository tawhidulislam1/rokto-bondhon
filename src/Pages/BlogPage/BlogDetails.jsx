import { useLoaderData } from "react-router-dom";


const BlogDetails = () => {
    const { title, image, description } = useLoaderData();
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="rounded-lg shadow-lg bg-white overflow-hidden max-w-4xl mx-auto">
                {/* Image Section */}
                <div className="overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full  object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                        {title}
                    </h2>

                    {/* Description */}
                    <div className="text-gray-700 leading-relaxed text-lg">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;