import axiosClient from "../api/axiosClient";
import { type UserCompleteDTO } from "../pages/home/Home";

export interface UserTO{
    id: number,
    nombre: string, 
    apellido: string,
    nickname: string,
    correcto: boolean,
}

export const LoginService = {

    getCorrectLogin: async (mail : string, pass : string) =>{
        const response = await axiosClient.get(`/login/user/${mail}&${pass}`)
        return response.data;
    },

    getUserById: async (id :number) =>{
        const response = await axiosClient.get<UserCompleteDTO>(`/users/user/${id}`);
        return response.data;
    }
}