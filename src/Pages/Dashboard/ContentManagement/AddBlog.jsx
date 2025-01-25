import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import useAxosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const AddBlog = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const imageHostingKey = import.meta.env.VITE_IMAGE_API;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    const axiosPublic = useAxosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const description = form.description.value;
        const title = form.title.value;
        const thumbnail = form.thumbnail.files[0];


        const formData = new FormData();
        formData.append("image", thumbnail);
        const res = await axiosPublic.post(imageHostingApi, formData);
        const image = res.data.data.url;
        console.log(image);
        const blogInfo = {
            title: title,
            description: description,
            status: "draft",
            image: image,
        };

        axiosSecure.post('/blog', blogInfo)
            .then(res => {
                console.log(res);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your Blog has been created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/content-management');
                }

            });

    };
    return (
        <div className="hero bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="hero-content max-w-4xl w-full px-4">
                <div className="card bg-white shadow-2xl rounded-lg w-full">
                    <form onSubmit={handleSubmit} className="card-body p-8">

                        <h2 className="text-2xl font-bold text-center text-[#DC143C] mb-6">
                            Add a Blog
                        </h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter your title"
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Thumbnail</span>
                            </label>
                            <input
                                type="file"
                                name="thumbnail"
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Description</span>
                            </label>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                name='description'
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={() => { }}
                            />

                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn bg-[#DC143C] hover:bg-red-700 text-white border-none">
                                Add
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;