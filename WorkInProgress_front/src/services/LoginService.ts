import axiosClient from "../api/axiosClient";


export const LoginService = {

    getCorrectLogin: async (mail : string, pass : string) =>{
        const response = await axiosClient.get(`/login/user/${mail}&${pass}`)
        return response.data;
    }
}