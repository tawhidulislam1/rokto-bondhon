import axios from "axios";


const axiosPublic = axios.create({
    baseURL: "https://rokto-bondhon-server-side.vercel.app",
});

const useAxosPublic = () => {
    return axiosPublic;
};

export default useAxosPublic;