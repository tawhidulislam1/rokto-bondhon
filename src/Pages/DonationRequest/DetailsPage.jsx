import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const DetailsPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        name,
        email,
        bloodGroup,
        district,
        upajela,
        hospitalName,
        fullAddress,
        donationDate,
        donationtime,
        requestMessage,
        status, _id
    } = useLoaderData();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const Donneremail = form.email.value;
        const Doonername = form.name.value;
        const status = "inprogress";
        const reqInfo = {
            donnerEamil: Donneremail,
            Doonername: Doonername,
            status: status,
        };
        axiosSecure.patch(`/bloodReq/donerUpdate/${_id}`, reqInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Doner Infomation Updated ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate('/donation-request');
            });

    };
    return (
        <div className="my-14">
            <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg border border-[#dc143c] w-full max-w-lg mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-[#dc143c]">{name}</h2>
                    <span
                        className={`py-1 px-3 rounded-lg text-sm ${status === "pending"
                            ? "bg-yellow-500 text-gray-900"
                            : "bg-green-500 text-gray-800"
                            }`}
                    >
                        {status}
                    </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg font-bold text-gray-300">Blood Group:</span>
                    <span className="text-xl font-bold text-[#dc143c]">{bloodGroup}</span>
                </div>

                <div className="space-y-2 mb-4">
                    <p>
                        <span className="font-semibold text-gray-300">Donation Date: </span>
                        {donationDate}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Donation Time: </span>
                        {donationtime}
                    </p>
                </div>

                <div className="space-y-2 mb-4">
                    <p>
                        <span className="font-semibold text-gray-300">District: </span> {district}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Upazila: </span> {upajela}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Hospital: </span>
                        {hospitalName}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Full Address: </span>
                        {fullAddress}
                    </p>
                </div>

                <div className="space-y-2 mb-4">
                    <p>
                        <span className="font-semibold text-gray-300">Recipient Email:</span>{" "}
                        {email}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Request Message:</span>{" "}
                        {requestMessage}
                    </p>
                </div>

                {/* Button */}
                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="w-full py-2 bg-[#dc143c] hover:bg-[#dc143c]-600 text-white font-semibold rounded-lg transition duration-200">
                    donate
                </button>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal h-96 modal-bottom sm:modal-middle">
                <div className="modal-box ">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium dark:text-white">Email</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user.displayName}
                                name="name"
                                placeholder="Enter your email"
                                className="input input-bordered border-gray-300 outline-none"
                                required
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium dark:text-white">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={user.email}
                                placeholder="Enter your email"
                                className="input input-bordered border-gray-300 outline-none "
                                required
                                readOnly

                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#DC143C] hover:bg-red-700 text-white border-none">
                                Donate
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>

    );
};

export default DetailsPage;