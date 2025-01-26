import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user } = useAuth();
    const AxiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await AxiosSecure(`/user/admin/${user.email}`);

            return res.data.admin;
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;