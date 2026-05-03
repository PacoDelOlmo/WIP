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

    updateTask: async (id : number, estado: boolean) => {
        const response = await axiosClient.patch<TaskTO>(`/tareas/${id}`, {estado});
        return response.data;
    },
}