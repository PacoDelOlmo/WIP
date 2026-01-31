package com.example.wip.model;

public class ConfirmationObject {
    
    private long idUser;
    private boolean correct;
    private String description;

    
    public ConfirmationObject() {
    }

    
    public ConfirmationObject(long idUser, boolean correct, String description) {
        this.setIdUser(idUser);
        this.setCorrect(correct);
        this.setDescription(description);
    }


    public long getIdUser() {
        return idUser;
    }
    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }
    public boolean isCorrect() {
        return correct;
    }
    public void setCorrect(boolean correct) {
        this.correct = correct;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }


    
}
