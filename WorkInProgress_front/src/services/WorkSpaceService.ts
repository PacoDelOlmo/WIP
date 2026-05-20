import axiosClient from "../api/axiosClient";
import type { UserTO } from "./LoginService";
import type {BoardTO} from './TaskBoardService';
import type { newElementTO } from "./TaskQueueService";

export interface WorkSpaceTO{
    id: number,
    nombre: string, 
    tableros: BoardTO[],
    idPropietario: number,
    color: string,
}

export interface UserWorkSpaceTO{
    usuario: UserTO,
    rol: string,
}

export const WorkSpaceService = {

    getWorkSpaces: async(idUser: Number) => {
        const response = await axiosClient.get<WorkSpaceTO[]>(`/workspace/usuario/${idUser}`);
        return response.data;
    },
    
    createEspacioTrabajo: async(workSpace: newElementTO, idUser: Number) => {
        const response = await axiosClient.post<WorkSpaceTO>(`/users/${idUser}/workspace/nuevo`, workSpace);
        return response.data;
    },

    getEspacioTrabajo: async(id: number | undefined) => {
        const response = await axiosClient.get<WorkSpaceTO>(`/workspace/obtener/${id}`);
        return response.data;
    }, 

    getUsuariosPermisos: async(id: number) => {
        const response = await axiosClient.get<UserWorkSpaceTO[]>(`/workspace/${id}/permisos`);
        return response.data;
    },

    deleteQuitarPermisos: async(id: number, idUser: number) => {
        const response = await axiosClient.put<boolean>(`/workspace/${id}/user/${idUser}/quitar`);
        return response.data;
    },

    addPermisos : async(id: number, correo: string) => {
        const response = await axiosClient.post<boolean>(`/workspace/${id}/compartir/user/${correo}`);
        return response.data;
    },

    editarNombreWorkSpace: async(id: number, idUser: number, nuevoNombre: newElementTO) => {
        const response = await axiosClient.put<boolean>(`/users/${idUser}/workspace/${id}/editar`, nuevoNombre);
        return response.data;
    },

    editarColorWorkSpace: async(id: number, idUser: number, nuevoColor: newElementTO) => {
        const response = await axiosClient.put<boolean>(`/users/${idUser}/workspace/${id}/editar_color`, nuevoColor);
        return response.data;
    },
}