package com.example.wip.model;

public class NewElementDTO {
    
    private String tittle;

    
    public NewElementDTO() {
    }

    public NewElementDTO(String tittle) {
        this.setTittle(tittle);
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    
}
