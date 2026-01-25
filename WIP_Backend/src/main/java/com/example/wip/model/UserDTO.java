package com.example.wip.model;

public class UserDTO {

    private long id; 
    private String nombre;
    private String apellido;
    private String nickname;
    private boolean correct;
    
    public UserDTO() {
    }

    public UserDTO(long id, String nombre, String apellido, String nickname, boolean correct) {
        this.setId(id);
        this.setNombre(nombre);
        this.setApellido(apellido);
        this.setNickname(nickname);
        this.setCorrect(correct);

    }

    
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

}
