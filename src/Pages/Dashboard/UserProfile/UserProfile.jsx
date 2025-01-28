import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth"; // Custom hook for user authentication
import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // Custom hook for secure axios
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
    const { user, updateUser, setLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditable, setIsEditable] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { data: profile = [], refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/profile/${user?.email}`);
            reset(res.data);
            return res.data;
        }
    });

    const handleEdit = () => setIsEditable(true);

    const onSubmit = async (data) => {
        console.log(data);
        updateUser(data.name, data.image)
            .then(() => {
                axiosSecure.patch(`/user/profile/${user?.email}`, data)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: "success",
                                title: "Profile updated successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                            setIsEditable(false);
                            setLoading(false);
                        }

                    })
                    .catch(err => {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.message,
                        });
                    });

            });

    };
    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-6">Update User Profile</h2>

            <div className="flex justify-end mb-4">
                {isEditable ? (
                    <button
                        onClick={handleSubmit(onSubmit)}
                        className="btn btn-success"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="btn btn-primary"
                    >
                        Edit
                    </button>
                )}
            </div>

            <form className="space-y-4">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-lg">Name</label>
                    <input
                        type="text"
                        defaultValue={user?.displayName || ""}
                        {...register("name", { required: "Name is required" })}
                        readOnly={!isEditable}
                        className={`input input-bordered ${isEditable ? "border-blue-500" : "border-gray-300"} outline-none`}
                    />
                    {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                </div>

                {/* Email (Read-only) */}
                <div className="flex flex-col">
                    <label className="text-lg">Email</label>
                    <input
                        type="email"
                        defaultValue={profile?.email || ""}
                        readOnly
                        className="input input-bordered border-gray-300 outline-none"
                    />
                </div>

                {/* Avatar */}
                <div className="flex flex-col">
                    <label className="text-lg">Image</label>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Give Image Url</span>
                        </label>
                        {/* File input */}
                        <input
                            type="url"
                            defaultValue={profile?.image}
                            name="image"
                            {...register("image", { required: "Image is required" })}
                            className="input input-bordered border-gray-300 outline-none"
                        />
                        {/* Display existing image if available */}
                        {profile?.image && !errors.image && (
                            <div className="mt-2">
                                <img
                                    src={profile.image} // Assuming profile.image contains the URL
                                    alt="Current profile"
                                    className="w-20 h-20 object-cover rounded-full"
                                />
                            </div>
                        )}
                        {errors.image && (
                            <span className="text-red-700">{errors.image.message}</span>
                        )}
                    </div>

                </div>

                {/* District */}
                <div className="flex flex-col">
                    <label className="text-lg">District</label>
                    <input
                        type="text"
                        defaultValue={profile?.district || ""}
                        {...register("district", { required: "District is required" })}
                        readOnly={!isEditable}
                        className={`input input-bordered ${isEditable ? "border-blue-500" : "border-gray-300"} outline-none`}
                    />
                    {errors.district && <span className="text-red-600">{errors.district.message}</span>}
                </div>

                {/* Upazila */}
                <div className="flex flex-col">
                    <label className="text-lg">Upazila</label>
                    <input
                        type="text"
                        defaultValue={profile?.upajela || ""}
                        {...register("upajela", { required: "Upazila is required" })}
                        readOnly={!isEditable}
                        className={`input input-bordered ${isEditable ? "border-blue-500" : "border-gray-300"} outline-none`}
                    />
                    {errors.upajela && <span className="text-red-600">{errors.upajela.message}</span>}
                </div>

                {/* Blood Group */}
                <div className="flex flex-col">
                    <label className="text-lg">Blood Group</label>
                    <select
                        className="select select-bordered border-gray-300"
                        name="bloodGroup"
                        defaultValue={profile?.bloodGroup || ""}
                        {...register("bloodGroup", { required: true })}
                        required
                    >
                        {errors.bloodGroup && <span className="text-red-700"> field is required</span>}

                        <option value="default" disabled>
                            Choose a blood group
                        </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>


                    {errors.bloodGroup && <span className="text-red-600">{errors.bloodGroup.message}</span>}
                </div>
            </form>
        </div>
    );
};

export default UserProfile;
