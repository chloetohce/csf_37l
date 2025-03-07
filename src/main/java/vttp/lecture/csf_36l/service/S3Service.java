package vttp.lecture.csf_36l.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${do.storage.bucket}")
    private String bucketName;

    @Value("${do.storage.endpoint}")
    private String endpoint;

    public String upload(MultipartFile file, String comments, String id) throws IOException {
        Map<String, String> metadata = Map.of(
            "comments", comments,
            "id", id, 
            "uploadDatetime", String.valueOf(System.currentTimeMillis())
        );
        
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setUserMetadata(metadata);

        String originalFileName = file.getOriginalFilename();
        String fileName = "";
        if (originalFileName.equals("blob")) {
            fileName = id + ".png";
        }

        // Construct a post object request, and pass in data
        PutObjectRequest request = new PutObjectRequest(bucketName, fileName, file.getInputStream(), objectMetadata);
        request.withCannedAcl(CannedAccessControlList.PublicRead);
        amazonS3.putObject(request);

        System.out.println("https://%s.%s/%s".formatted(bucketName, endpoint, fileName));

        return "https://%s.%s/%s".formatted(bucketName, endpoint, fileName);
    }
}
