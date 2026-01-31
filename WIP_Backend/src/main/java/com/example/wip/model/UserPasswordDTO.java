package com.example.wip.model;

public class UserPasswordDTO {

    private long id;
    private String oldPassword;
    private String newPassword;


    public UserPasswordDTO() {
    }

    
    public UserPasswordDTO(long id, String oldPassword, String newPassword) {
        this.setId(id);
        this.setOldPassword(oldPassword);
        this.setNewPassword(newPassword);
    }


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getOldPassword() {
        return oldPassword;
    }
    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    
}
