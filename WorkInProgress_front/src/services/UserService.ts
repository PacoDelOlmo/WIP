import axiosClient from "../api/axiosClient";
import type { newElementTO } from "./TaskQueueService";

export interface ElementTO{
    id: number,
    titulo: string,
    tipo: string,
}

export const UserService = {

    getBusqueda: async (id : number, busqueda: newElementTO) =>{
        const response = await axiosClient.post<ElementTO[]>(`/users/${id}/buscar`, busqueda);
        return response.data;
    },
}