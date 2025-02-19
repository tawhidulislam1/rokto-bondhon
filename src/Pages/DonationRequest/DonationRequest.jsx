import { useQuery } from "@tanstack/react-query";
import useAxosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useState } from "react";

const DonationRequest = () => {
    const axiosPublic = useAxosPublic();
    const [requests, setRequest] = useState([]);
    const { data: donations = [] } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosPublic.get('bloodReq/status');
            setRequest(res.data);
            return res.data;
        }
    });
    const handleSortOld = () => {
        const sortedCampaigns = [...donations].sort((a, b) => new Date(a.donationDate) - new Date(b.donationDate));
        setRequest(sortedCampaigns);
    };;
    const handleSortnew = () => {
        const sortedCampaigns = [...donations].sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
        setRequest(sortedCampaigns);
    };;

    return (
        <div className="my-10">
            <div className="flex justify-start">
                <h3 className="text-3xl">All Donation Request</h3>

            </div>
            <div className="flex justify-end mb-4 gap-4">
                <button
                    onClick={handleSortOld}
                    className="px-4 py-2 text-xs bg-[#DC143C] text-white rounded hover:bg-[#d34864]"
                >
                    Sort by old Date 
                </button>
                <button
                    onClick={handleSortnew}
                    className="px-4 py-2 text-xs bg-[#DC143C] text-white rounded hover:bg-[#d34864]"
                >
                    Sort by New Date
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient name</th>
                            <th>Location</th>
                            <th>Blood group</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((donation, idx) => (
                            <tr key={donation._id}>
                                <th>{idx + 1}</th>
                                <td>{donation.recipientName}</td>
                                <td>{donation.district},{donation.upajela}</td>
                                <td>{donation.bloodGroup}</td>
                                <td>{donation.donationDate}</td>
                                <td>{donation.donationtime} </td>
                                <td>

                                    <Link to={`/donation-request/${donation._id}`}>
                                        <button className="btn bg-[#DC143C] text-white">View More</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationRequest;