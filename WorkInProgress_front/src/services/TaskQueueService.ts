import axiosClient from "../api/axiosClient";
import type { TaskTO } from "./TaskService";

export interface newElementTO{
    tittle: string;
}

export interface TaskQueueTO{
    id: number;
    titulo: string,
    tareas: TaskTO[],
}

export const TaskQueueService = {

    getAllTasks: async () => {
        const response = await axiosClient.get<TaskTO[]>('/');
        return response.data;
    },

    createTaskQueue: async (lista: newElementTO, idTablero: number) => {
        const response = await axiosClient.post<TaskQueueTO>(`/taskboard/tablero/${idTablero}/nueva_lista`, lista);
        return response.data;
    },

    editarNombreLista: async (nuevoNombre: newElementTO, idTablero: number, idLista: number) => {
        const response = await axiosClient.put<TaskQueueTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/editar`, nuevoNombre);
        return response.data;
    }, 

    editarColorLista: async (nuevoColor: newElementTO, idTablero: number, idLista: number) => {
        const response = await axiosClient.put<TaskQueueTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/editar_color`, nuevoColor);
        return response.data;
    }, 

    deleteLista: async ( idTablero: number, idLista: number) =>{
        const response = await axiosClient.put<boolean>(`/taskboard/tablero/${idTablero}/lista/${idLista}/borrar`);
        return response.data;
    }

}