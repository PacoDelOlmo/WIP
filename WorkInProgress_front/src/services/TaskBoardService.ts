import axiosClient from "../api/axiosClient";
import type { newElementTO, TaskQueueTO } from "./TaskQueueService";

export interface BoardTO{
    id: number,
    nombreTablero: string,
    listaTareas: TaskQueueTO[],
}




export const TaskBoardService = {
    
    getTablero: async(idTablero : number) => {
        const response = await axiosClient.get<BoardTO>(`/taskboard/tablero/${idTablero}`);
        return response.data;
    },

    createTablero: async(tablero: newElementTO, idUser: Number, idWorkspace: Number) => {
        const response = await axiosClient.post<BoardTO>(`/users/${idUser}/workspace/${idWorkspace}/tablero/nuevo`, tablero);
        return response.data;
    },

}