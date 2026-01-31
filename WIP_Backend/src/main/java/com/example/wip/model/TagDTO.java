package com.example.wip.model;

public class TagDTO {

    private long id;
    private String etiqueta;

    

    public TagDTO() {
    }

    

    public TagDTO( long id, String etiqueta) {
        this.setId(id);
        this.setEtiqueta(etiqueta);
    }



    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    
    
}
