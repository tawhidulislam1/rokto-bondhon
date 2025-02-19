import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [upjelas, setUpjelas] = useState([]);
    const [selectedupjela, setSelectedUpjela] = useState('');
    console.log(selectedupjela);
    const { register,
        handleSubmit,
        watch,
        formState: { errors }, } = useForm();
    const password = watch("password");
    const imageHostingKey = import.meta.env.VITE_IMAGE_API;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    const axiosPublic = useAxosPublic();
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Fetch districts
    useEffect(() => {
        fetch("./districts.json")
            .then(res => res.json())
            .then(data => { setDistricts(data); });
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            fetch("./upazilas.json")
                .then(res => res.json())
                .then(data => {
                    const filteredUpazilas = data.filter(upazila => upazila.district_id === selectedDistrict.id);
                    setUpjelas(filteredUpazilas);
                });
        }
    }, [selectedDistrict]);
    const handleDistrictChange = (e) => {
        const districtName = e.target.value;
        const district = districts.find(d => d.name === districtName);
        setSelectedDistrict(district);
    };



    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await axiosPublic.post(imageHostingApi, formData);
        const image = res.data.data.url;
        console.log(res, data);

        createUser(data.email, data.password)
            .then(res => {

                console.log(res);
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    image: image,
                    bloodGroup: data.bloodGroup,
                    district: data.district,
                    upajela: data.upajela,
                    role: "donor",
                    status: "active",
                };
                console.log(userInfo);
                updateUser(data.name, image)
                    .then(() => {
                        axiosPublic.post("/user", userInfo)
                            .then(res => {
                                console.log(res);
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "top-center",
                                        icon: "success",
                                        title: "Your account has been created",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            });

                        navigate('/');

                    });
            })

            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });

    };
    return (
        <div className="hero bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="hero-content max-w-4xl w-full px-4">
                <div className="card bg-white shadow-2xl rounded-lg w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-8">

                        <h2 className="text-2xl font-bold text-center text-[#DC143C] mb-6">
                            Create a new account
                        </h2>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="Enter your email"
                                className="input input-bordered border-gray-300 outline-none dark:bg-white dark:text-black"
                                required
                            />
                            {errors.email && <span className="text-red-700">field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="input input-bordered border-gray-300 outline-none dark:bg-white dark:text-black"
                                required
                            />
                            {errors.name && <span className="text-red-700">Name field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium ">Image</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                {...register("image", { required: true })}
                                className="input input-bordered border-gray-300 outline-none dark:bg-white dark:text-black"
                                required
                            />
                            {errors.image && <span className="text-red-700"> field is required</span>}

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Select Your Blood Group</span>
                            </label>
                            <select
                                className="select select-bordered border-gray-300  dark:bg-white dark:text-black"
                                name="bloodGroup"
                                defaultValue={"default"}
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
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">
                                    Select Your district
                                </span>
                            </label>
                            <select
                                className="select select-bordered border-gray-300  dark:bg-white dark:text-black"
                                name="district"
                                defaultValue={"default"}
                                {...register("district", { required: true })}
                                onChange={handleDistrictChange}
                                required
                            >
                                {errors.district && <span className="text-red-700"> field is required</span>}

                                <option value="default" disabled >
                                    Choose a district
                                </option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name} ({district.bn_name})
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Upazila Select */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">
                                    Select Your upjela
                                </span>
                            </label>
                            <select
                                id="upazilas"
                                defaultValue={"default"}

                                {...register("upajela", { required: true })}
                                onChange={(e) => setSelectedUpjela(e.target.value)}
                                disabled={!selectedDistrict}
                                className="select select-bordered border-gray-300 dark:bg-white dark:text-black"
                            >
                                {errors.upajela && <span className="text-red-700"> field is required</span>}

                                <option value="">Select a district first</option>
                                {upjelas.map((upazila) => (
                                    <option key={upazila.id} value={upazila.name}>
                                        {upazila.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", { required: true })}
                                placeholder="Enter your password"
                                className="input input-bordered border-gray-300 outline-none dark:bg-white dark:text-black"
                                required
                            />
                            {errors.password && <span className="text-red-700"> field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confo_password"
                                {...register("confo_password", {
                                    required: true,
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                placeholder="Enter your password"
                                className="input input-bordered border-gray-300 outline-none  dark:bg-white dark:text-black"
                                required
                            />
                            {errors.confo_password && <span className="text-red-700"> Please confirm your password</span>}

                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-[#DC143C] hover:bg-red-700 text-white border-none">
                                Create Account
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            You have an account?{" "}
                            <a href="#" className="text-[#DC143C] font-medium hover:underline">
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
