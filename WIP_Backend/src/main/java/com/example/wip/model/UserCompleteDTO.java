package com.example.wip.model;

import java.util.ArrayList;
import java.util.List;

public class UserCompleteDTO {

    private long id;
    private String username;
    private String mail;
    private List<WorkspaceDTO> workspace;

    public UserCompleteDTO(){
        this.setWorkspace(new ArrayList<WorkspaceDTO>());
    }

    public UserCompleteDTO(long id, String username, String mail, List<WorkspaceDTO> workspace) {
        this.setId(id);
        this.setUsername(username);
        this.setMail(mail);
        this.setWorkspace(workspace);
    }


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getMail() {
        return mail;
    }
    public void setMail(String mail) {
        this.mail = mail;
    }
    public List<WorkspaceDTO> getWorkspace() {
        return workspace;
    }
    public void setWorkspace(List<WorkspaceDTO> workspace) {
        this.workspace = workspace;
    }

    
    
}
