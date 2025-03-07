package vttp.lecture.csf_36l.repository;

import java.sql.ResultSet;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import vttp.lecture.csf_36l.models.Post;

@Repository
public class FileUploadRepository {
    public static final String INSERT = """
            insert into posts (id, comments, picture) values (?, ?, ?);
            """;

    public static final String SELECT_ALL = """
            select id, comments, picture from posts where id = ?
            """;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String upload(MultipartFile file, String comments) {
        String id = UUID.randomUUID()
            .toString()
            .replace("-", "")
            .substring(0, 8);
        
        try {
            byte[] filesByte = file.getBytes();
            jdbcTemplate.update(INSERT, id, comments, filesByte);

        } catch (Exception e) {
            // TODO: handle exception
        }
        return id;
    }

    public Optional<Post> getPostById(String id) {
        System.out.println(id);
        return jdbcTemplate.query((SELECT_ALL), (ResultSet rs) -> {
            if (rs.next()) {
                return Optional.of(Post.populate(rs));
            } else {
                return  Optional.empty();
            }
        }, id);
    }
}
