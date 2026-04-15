import axiosClient from "../api/axiosClient";
import type { TaskTO } from "./TaskService";

export interface BoardTO{
    id: number,
    nombreTablero: String,
    listaTareas: TaskQueueTO[],
}

export interface TaskQueueTO{
    titulo: String,
    tareas: TaskTO[],
}


export const TaskBoardService = {
    
    getTablero: async(idTablero : number) => {
        const response = await axiosClient.get<BoardTO>(`/taskboard/tablero/${idTablero}`);
        return response.data;
    },

}