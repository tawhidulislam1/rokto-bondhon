import { useQuery } from "@tanstack/react-query";
import useAxosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const DonationRequest = () => {
    const axiosPublic = useAxosPublic();
    const { data: donations = [] } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosPublic.get('bloodReq/status');
            return res.data;
        }
    });

    return (
        <div className="my-10">
            <div className="flex justify-start">
                <h3 className="text-3xl">All Donation Request</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>recipient name</th>
                            <th>location</th>
                            <th>blood group</th>
                            <th>date</th>
                            <th>time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, idx) => (
                            <tr key={donation._id}>
                                <th>{idx + 1}</th>
                                <td>{donation.recipientName}</td>
                                <td>{donation.district},{donation.upajela}</td>
                                <td>{donation.bloodGroup}</td>
                                <td>{donation.donationDate}</td>
                                <td>{donation.donationtime} </td>
                                <td>

                                    <Link to={`/donation-request/${donation._id}`}>
                                        <button className="btn btn-info">View More</button>
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