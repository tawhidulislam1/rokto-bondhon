import axios from "axios";


const axiosSecure = axios.create({
    baseURL: "https://bistro-boss-serve-ten.vercel.app",
});


const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;