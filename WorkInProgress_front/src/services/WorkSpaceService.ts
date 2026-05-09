import axiosClient from "../api/axiosClient";
import type {BoardTO} from './TaskBoardService';
import type { newElementTO } from "./TaskQueueService";

export interface WorkSpaceTO{
    id: number,
    nombre: string, 
    tableros: BoardTO[]
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
}