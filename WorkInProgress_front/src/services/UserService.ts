import axiosClient from "../api/axiosClient";
import type { newElementTO } from "./TaskQueueService";

export interface ElementTO{
    id: number,
    titulo: string,
    tipo: string,
}

export interface UserRecoverTO{
    correo: string,
    usuario: string,
}

export interface RecoverContrasenaTO{
    correo: string,
    nuevaPass: string,
}

export interface UserMailTO{
    id: number,
    mail: string,
}


export interface UserPasswordTO{
    id: number,
    oldPassword: string,
    newPassword: string,
}

export interface ConfirmationTO{
    idUser: number,
    correct: boolean,
    description: string,
}

export const UserService = {

    getBusqueda: async (id : number, busqueda: newElementTO) =>{
        const response = await axiosClient.post<ElementTO[]>(`/users/${id}/buscar`, busqueda);
        return response.data;
    },

    postValidarDatos: async (datos: UserRecoverTO) => {
        const response = await axiosClient.post<boolean>('/users/recuperar_contrasena/validar', datos);
        return response.data;
    },

    putReestablecerContrasena: async (datos: RecoverContrasenaTO) =>{
        const response = await axiosClient.put<boolean>('/users/recuperar_contrasena', datos);
        return response.data;
    },

    editUserCorreo: async(id: number, nuevoEmail: UserMailTO) => {
        const response = await axiosClient.put<ConfirmationTO>(`/users/${id}/nuevo_correo`, nuevoEmail);
        return response.data;
    },

    editUserPassword: async(id: number, nuevaPass: UserPasswordTO) => {
        const response = await axiosClient.put<ConfirmationTO>(`/users/${id}/nuevo_contrasena`, nuevaPass);
        return response.data;
    },

    editUserName: async(id: number, nuevoNickname: UserMailTO) => {
        const response = await axiosClient.put<ConfirmationTO>(`/users/${id}/nuevo_nombre_usuario`, nuevoNickname);
        return response.data;
    },



}