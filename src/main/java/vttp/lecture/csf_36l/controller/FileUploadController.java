package vttp.lecture.csf_36l.controller;

import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import vttp.lecture.csf_36l.models.Post;
import vttp.lecture.csf_36l.repository.FileUploadRepository;
import vttp.lecture.csf_36l.service.S3Service;



@RestController
public class FileUploadController {
    private static final String BASE64_PREFIX = "data:image/png;base64,";

    @Autowired
    private FileUploadRepository fileUploadRepository;

    @Autowired
    private S3Service s3Service;

    @PostMapping(path="/api/upload", consumes=MediaType.MULTIPART_FORM_DATA_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> upload(@RequestPart("file") MultipartFile file, @RequestPart("comments") String comments
    ) {
        try {

            String id = fileUploadRepository.upload(file, comments);

            if (id != null && !id.isEmpty()) {
                String s3endpointUrl = this.s3Service.upload(file, comments, id);
            }

            return ResponseEntity.ok()
                .body("{\"id\": \"%s\"}".formatted(id));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(e.getMessage());
        }
    }

    @GetMapping(path="/api/image/{id}")
    public ResponseEntity<String> getImage(@PathVariable String id) {
        Optional<Post> p = this.fileUploadRepository.getPostById(id);
        Post post = p.get();
        String encodedString = Base64.getEncoder().encodeToString(post.getPicture()); //get encoder to convert byte array to a string

        String payload = String.format(payload = """
                        {
                            "image": "%s%s"
                        }
                        """, BASE64_PREFIX, encodedString);
        return ResponseEntity.ok(payload);
    }
    
    
}
