import axiosClient from "../api/axiosClient";
import type { UserTO } from "./LoginService";
import type { newElementTO } from "./TaskQueueService";

export interface TaskTO{
    id: number,
    titulo: string,
    descripcion: string,
    completada: boolean,
    creador: UserTO,
    etiquetas: TagTO[],
    comentarios: CommentTO[],
}

export interface newTaskTO{
    titulo: string,
    creador: number,
}

export interface TagTO{
    id: number,
    etiqueta: string,
}

export interface CommentTO{
    id: number,
    contenido: string,
    user: UserTO,
    fecha: string,
}

export const TaskService = {

    getAllTasks: async () => {
        const response = await axiosClient.get<TaskTO[]>('/');
        return response.data;
    },

    createTask: async (task: newTaskTO, idTablero: number, idLista: number) => {
        const response = await axiosClient.post<TaskTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/nueva_tarea`, task);
        return response.data;
    },

    updateTask: async (id : number, estado: boolean) => {
        const response = await axiosClient.patch<TaskTO>(`/tareas/${id}`, {estado});
        return response.data;
    },

    addComment: async (comentario: newElementTO, idTablero: number, idLista: number, idTarea: number, idUser: number) => {
        const response = await axiosClient.post<CommentTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/tarea/${idTarea}/user/${idUser}/nuevo_comentario`, comentario);
        return response.data;
    },

    addEtiqueta: async (etiqueta: newElementTO, idTablero: number, idLista: number, idTarea: number, idUser: number) => {
        const response = await axiosClient.post<TagTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/tarea/${idTarea}/user/${idUser}/nueva_etiqueta`, etiqueta);
        return response.data;
    },

    editarNombreTarea: async (nuevoNombre: newElementTO, idTablero: number, idLista: number, idTarea: number) => {
        const response = await axiosClient.put<TaskTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/tarea/${idTarea}/editar_nombre`, nuevoNombre);
        return response.data;
    }, 

    editarTarea: async (tareaEditada: TaskTO, idTablero: number, idLista: number, idTarea: number) =>{
        const response = await axiosClient.put<TaskTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/tarea/${idTarea}/editar`, tareaEditada);
        return response.data;
    },

    actualizarEstadoTarea: async (idTablero: number, idLista: number, idTarea: number) => {
        const response = await axiosClient.put<TaskTO>(`/taskboard/tablero/${idTablero}/lista/${idLista}/tarea/${idTarea}/actualizar_estado`);
        return response.data;
    }, 
    
}
