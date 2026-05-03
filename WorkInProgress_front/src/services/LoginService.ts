import axiosClient from "../api/axiosClient";

export interface UserTO{
    id: number,
    nombre: String, 
    apellido: String,
    nickname: String,
    correcto: boolean,
}

export const LoginService = {

    getCorrectLogin: async (mail : string, pass : string) =>{
        const response = await axiosClient.get(`/login/user/${mail}&${pass}`)
        return response.data;
    },

    getUserById: async (id :number) =>{
        const response = await axiosClient.get(`/users/user/${id}`);
        return response.data;
    }
}