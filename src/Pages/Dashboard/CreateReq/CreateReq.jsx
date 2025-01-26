import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateReq = () => {
    const { user } = useAuth();
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [upjelas, setUpjelas] = useState([]);
    const [selectedUpjela, setSelectedUpjela] = useState('');
    const [profile, setProfile] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        fetch("/districts.json")
            .then(res => res.json())
            .then(data => setDistricts(data));
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            fetch("/upazilas.json")
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
        setSelectedUpjela('');
    };
    useEffect(() => {
        axiosSecure.get(`/user/profile/${user?.email}`)
            .then(res => {
                setProfile(res.data);
            });
    }, []);

    console.log(profile.status);
    const onSubmit = (data) => {
        console.log(selectedUpjela);
        if (profile?.status === "active") {
            const reqInfo = {
                name: user?.displayName || "",
                email: user?.email || "",
                recipientName: data.recipientName,
                district: data.district,
                upajela: data.upajela,
                hospitalName: data.hospitalName,
                fullAddress: data.fullAddress,
                bloodGroup: data.bloodGroup,
                donationDate: data.donationDate,
                donationtime: data.donationTime,
                requestMessage: data.requestMessage,
                status: "pending",
                createdAt: new Date(),
            };

            axiosSecure.post("bloodReq", reqInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Your Requste has been created",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    navigate('/dashboard/my-donation-requests');
                });

            return;
        }
        Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Your account has been blocked. Please contact support.",
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl text-center font-semibold mb-6">Create Donation Request</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6">

                    <div className="flex flex-col">
                        <label className="text-lg">Requester Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered border-gray-300 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="requesterEmail" className="text-lg">Requester Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered border-gray-300 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="recipientName" className="text-lg">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            {...register("recipientName", { required: "Recipient name is required" })}
                            className="input input-bordered border-gray-300 outline-none"
                        />
                        {errors.recipientName && <span className="text-red-700">{errors.recipientName.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="recipientDistrict" className="text-lg">Recipient District</label>
                        <select
                            className="select select-bordered border-gray-300 outline-none"
                            name="district"
                            defaultValue="default"
                            {...register("district", { required: "District is required" })}
                            onChange={handleDistrictChange}
                            required
                        >
                            {errors.district && <span className="text-red-700">Field is required</span>}
                            <option value="default" disabled>
                                Choose a district
                            </option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.name}>
                                    {district.name} ({district.bn_name})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="recipientUpazila" className="text-lg">Recipient Upazila</label>
                        <select
                            id="upazilas"
                            {...register("upajela", { required: "Upazila is required" })}
                            onChange={(e) => setSelectedUpjela(e.target.value)}
                            disabled={!selectedDistrict}
                            className="select select-bordered border-gray-300 outline-none"
                        >
                            {errors.upajela && <span className="text-red-700">{errors.upajela.message}</span>}
                            <option value="" disabled>Select a district first</option>
                            {upjelas.map((upazila) => (
                                <option key={upazila.id} value={upazila.name}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="hospitalName" className="text-lg">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            {...register("hospitalName", { required: "Hospital name is required" })}
                            className="input input-bordered border-gray-300 outline-none"
                        />
                        {errors.hospitalName && <span className="text-red-700">{errors.hospitalName.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="fullAddress" className="text-lg">Full Address</label>
                        <input
                            type="text"
                            name="fullAddress"
                            {...register("fullAddress", { required: "Full address is required" })}
                            className="input input-bordered border-gray-300 outline-none"
                        />
                        {errors.fullAddress && <span className="text-red-700">{errors.fullAddress.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="bloodGroup" className="text-lg">Blood Group</label>
                        <select
                            name="bloodGroup"
                            {...register("bloodGroup", { required: "Blood group is required" })}
                            className="select select-bordered border-gray-300 outline-none"
                        >
                            <option value="">Select a blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.bloodGroup && <span className="text-red-700">{errors.bloodGroup.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="donationDate" className="text-lg">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            {...register("donationDate", { required: "Donation date is required" })}
                            className="input input-bordered border-gray-300 outline-none"
                        />
                        {errors.donationDate && <span className="text-red-700">{errors.donationDate.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="donationTime" className="text-lg">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            {...register("donationTime", { required: "Donation time is required" })}
                            className="input input-bordered border-gray-300 outline-none"
                        />
                        {errors.donationTime && <span className="text-red-700">{errors.donationTime.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="requestMessage" className="text-lg">Request Message</label>
                        <textarea
                            name="requestMessage"
                            {...register("requestMessage", { required: "Request message is required" })}
                            className="textarea textarea-bordered border-gray-300 outline-none"
                        />
                        {errors.requestMessage && <span className="text-red-700">{errors.requestMessage.message}</span>}
                    </div>

                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Request</button>
                </div>
            </form>
        </div>
    );
};

export default CreateReq;
