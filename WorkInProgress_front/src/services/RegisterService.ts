import axiosClient from "../api/axiosClient";

export interface RegisterUser{
    nombre : string,
    apellido : string,
    nombreUsuario : string,
    correo : string,
    contrasena : string

}

export const RegisterService = {

    postRegister: async (register : RegisterUser) =>{
        const response = await axiosClient.post(`/register/user/`, JSON.stringify(register))
        return response.data;
    }
}