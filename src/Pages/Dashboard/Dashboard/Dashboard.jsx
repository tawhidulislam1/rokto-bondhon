import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RiRefundFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: stats = [] } = useQuery({
        queryKey: ['admin-states'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-states');
            return res.data;
        }
    });
    return (
        <div>
            <h3 className="text-3xl">Welcome back, <strong>{user?.displayName}</strong></h3>
            <div className="lg:stats w-full shadow ">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <RiRefundFill className="text-2xl" />
                    </div>
                    <div className="stat-title">total funding</div>
                    <div className="stat-value">{stats.reveneu}<small>tk</small></div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser className="text-2xl"></FaUser>
                    </div>
                    <div className="stat-title"> total user</div>
                    <div className="stat-value">{stats.user}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <CiSquareQuestion className="text-2xl" />

                    </div>
                    <div className="stat-title">total blood donation request
                    </div>
                    <div className="stat-value">{stats.bloodRequeste}</div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;