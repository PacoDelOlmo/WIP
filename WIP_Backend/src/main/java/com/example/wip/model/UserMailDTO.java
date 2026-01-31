package com.example.wip.model;

public class UserMailDTO {
    
    private long id;
    private String mail;

    
    public UserMailDTO() {
    }

    public UserMailDTO(long id, String mail) {
        this.setId(id);
        this.setMail(mail);
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getMail() {
        return mail;
    }
    public void setMail(String mail) {
        this.mail = mail;
    }
}
