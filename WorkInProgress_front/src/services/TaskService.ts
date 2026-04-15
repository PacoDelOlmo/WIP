import axiosClient from "../api/axiosClient";
import type { UserTO } from "./LoginService";

export interface TaskTO{
    id: number,
    titulo: String,
    descripcion: String,
    completada: boolean,
    creador: UserTO,
    etiquetas: TagTO[],
    comentarios: CommentTO[],
}

export interface TagTO{
    id: number,
    etiqueta: String,
}

export interface CommentTO{
    id: number,
    contenido: String,
    user: UserTO,
    fecha: String,
}

export const TaskService = {

    getAllTasks: async () => {
        const response = await axiosClient.get<TaskTO[]>('/');
        return response.data;
    },

    createTask: async (task: Omit<TaskTO, 'id'>) => {
        const response = await axiosClient.post<TaskTO>('/tareas', task);
        return response.data;
    },

    updateTask: async (id : number, estado: boolean) => {
        const response = await axiosClient.patch<TaskTO>(`/tareas/${id}`, {estado});
        return response.data;
    },
}