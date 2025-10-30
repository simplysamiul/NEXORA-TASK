import axios from "axios";


const axiosInstance = axios.create({
    baseURL: `https://nexora-backend-ten.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;