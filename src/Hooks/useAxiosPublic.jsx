import axios from "axios";


const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
});

const useAxosPublic = () => {
    return axiosPublic;
};

export default useAxosPublic;