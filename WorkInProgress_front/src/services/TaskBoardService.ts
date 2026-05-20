import axiosClient from "../api/axiosClient";
import type { newElementTO, TaskQueueTO } from "./TaskQueueService";

export interface BoardTO{
    id: number,
    nombreTablero: string,
    listaTareas: TaskQueueTO[],
    color: string,
}

export interface OrdenListas{
    idTablero: number;
    listas: number[];
}

export interface OrdenTareas{
    idLista: number;
    tareas: number[];
}



export const TaskBoardService = {
    
    getTablero: async(idTablero : number) => {
        const response = await axiosClient.get<BoardTO>(`/taskboard/tablero/${idTablero}`);
        return response.data;
    },

    getIdWS:  async(idTablero : number) => {
        const response = await axiosClient.get<number>(`/users/tablero/${idTablero}`);
        return response.data;
    },

    createTablero: async(tablero: newElementTO, idUser: Number, idWorkspace: Number) => {
        const response = await axiosClient.post<BoardTO>(`/users/${idUser}/workspace/${idWorkspace}/tablero/nuevo`, tablero);
        return response.data;
    },

    editarNombreTablero: async (nuevoNombre: newElementTO, idUser: number, idTablero: number, idWs: number, ) => {
        const response = await axiosClient.put<BoardTO>(`/users/${idUser}/workspace/${idWs}/tablero/${idTablero}/editar`, nuevoNombre);
        return response.data;
    }, 

    editarColorTablero: async (nuevoColor: newElementTO, idUser: number, idTablero: number, idWs: number, ) => {
        const response = await axiosClient.put<BoardTO>(`/users/${idUser}/workspace/${idWs}/tablero/${idTablero}/editar_color`, nuevoColor);
        return response.data;
    }, 

    updateOrdenListas: async (idTablero: number, nuevasOrden: OrdenListas) => {
        const response = await axiosClient.put<boolean>(`/taskboard/tablero/${idTablero}/actualizar_orden`, nuevasOrden);
        return response.data;
    },

    updateOrdenTareasLista: async (idTablero: number, idLista: number, nuevoOrden: OrdenTareas) => {
        const response = await axiosClient.put<boolean>(`/taskboard/tablero/${idTablero}/lista/${idLista}/actualizar_orden`, nuevoOrden);
        return response.data;
    },

    deleteTablero: async (idTablero : number) =>{
        const response = await axiosClient.put<boolean>(`/taskboard/tablero/${idTablero}/borrar`);
        return response.data;
    }


}