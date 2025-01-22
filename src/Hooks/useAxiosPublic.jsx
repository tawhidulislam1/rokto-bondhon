import axios from "axios";


const axiosPublic = axios.create({
    baseURL: "https://bistro-boss-serve-ten.vercel.app",
});

const useAxosPublic = () => {
    return axiosPublic;
};

export default useAxosPublic;