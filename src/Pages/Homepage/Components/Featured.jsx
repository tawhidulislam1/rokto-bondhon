import { BiDonateBlood } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

const Featured = () => {
    return (
        <div className="my-10">
            <div>
                <h2 className="text-center text-[#2E2E2E] text-3xl font-semibold dark:text-gray-200">Be the Hero Someone Needs Today</h2>
                <p className="text-center py-3 dark:text-gray-300">Explore Featured Blood Donation Drives, Stories, and Facts That Save Lives</p>
            </div>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3">
                <div className="card  bg-[#FDEDEC] shadow-xl">
                    <figure className="px-10 pt-10">
                        <FaSearch className="text-3xl text-[#DC143C]"></FaSearch>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title dark:text-gray-800">Geo-Search</h2>
                        <p className="dark:text-gray-700">With the geo-search feature, finding blood donors has become easier than ever. Enter your location and you will be shown the donors available in the closest proximity</p>

                    </div>
                </div>
                <div className="card bg-[#FDEDEC] shadow-xl">
                    <figure className="px-10 pt-10">
                        <BiDonateBlood className="text-3xl text-[#DC143C]"></BiDonateBlood>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title dark:text-gray-800">Real-time Connect:</h2>
                        <p className="dark:text-gray-700">No delays in receiving blood anymore. Connect with donors and recipients in real-time</p>

                    </div>
                </div>
                <div className="card bg-[#FDEDEC] shadow-xl">
                    <figure className="px-10 pt-10">
                        <MdNotificationsActive className="text-3xl text-[#DC143C]"></MdNotificationsActive>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title dark:text-gray-800">Notifications</h2>
                        <p className="dark:text-gray-700">Get updates on blood requests so that you are informed the moment a donor is available or a request is made</p>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Featured;