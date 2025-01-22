import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [upjelas, setUpjelas] = useState([]);
    const [selectedupjela, setSelectedUpjela] = useState('');

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

    const { register,
        handleSubmit,
        formState: { errors }, } = useForm();
    const onSubmit = (data) => console.log(data);
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
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
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
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Image</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                {...register("image", { required: true })}
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Select Your Blood Group</span>
                            </label>
                            <select
                                className="select select-bordered border-gray-300"
                                name="bloodGroup"
                                {...register("bloodGroup", { required: true })}
                                required
                            >
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
                                className="select select-bordered border-gray-300"
                                name="district"
                                {...register("district", { required: true })}
                                onChange={handleDistrictChange}
                                required
                            >
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
                                value={selectedupjela}
                                {...register("upajela", { required: true })}
                                onChange={(e) => setSelectedUpjela(e.target.value)}
                                disabled={!selectedDistrict}
                                className="select select-bordered border-gray-300"
                            >
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
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confo_password"
                                {...register("confo_password", { required: true })}
                                placeholder="Enter your password"
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
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
