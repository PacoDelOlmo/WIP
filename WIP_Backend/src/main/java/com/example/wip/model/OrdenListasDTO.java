package com.example.wip.model;

import java.util.List;

public class OrdenListasDTO {

    private long idTablero;
    private List<Long> listas;

    public OrdenListasDTO(long idTablero, List<Long> listas) {
        this.idTablero = idTablero;
        this.listas = listas;
    }

    public OrdenListasDTO() {
    }


    public long getIdTablero() {
        return idTablero;
    }
    public void setIdTablero(long idTablero) {
        this.idTablero = idTablero;
    }
    public List<Long> getListas() {
        return listas;
    }
    public void setListas(List<Long> listas) {
        this.listas = listas;
    } 

    
}
