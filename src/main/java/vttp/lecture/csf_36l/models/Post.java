package vttp.lecture.csf_36l.models;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Post {
    private String id;
    private String comments;
    private byte[] picture;

    public static Post populate(ResultSet rs) throws SQLException {
        Post post = new Post();

        post.setId(rs.getString("id"));
        post.setComments(rs.getString("comments"));
        post.setPicture(rs.getBytes("picture"));
        
        return post;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }

    public byte[] getPicture() {
        return picture;
    }
    public void setPicture(byte[] image) {
        this.picture = image;
    }

    
    
}
