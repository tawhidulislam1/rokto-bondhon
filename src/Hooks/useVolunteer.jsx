import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useVolunteer = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isVolunteer = [], isPending: isVolunteerLoading } = useQuery({
        queryKey: [user?.email, "Volunteer"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/volunteer/${user.email}`);
            return res.data;
        }
    });
    return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;