import axiosClient from "../api/axiosClient";

export interface Task{
    // datos que recibimos con el dto
}

export const TaskService = {

    getAllTasks: async () => {
        const response = await axiosClient.get<Task[]>('/');
        return response.data;
    },

    createTask: async (task: Omit<Task, 'id'>) => {
        const response = await axiosClient.post<Task>('/tareas', task);
        return response.data;
    },

    updateTask: async (id : number, estado: boolean) => {
        const response = await axiosClient.patch<Task>(`/tareas/${id}`, {estado});
        return response.data;
    },
}