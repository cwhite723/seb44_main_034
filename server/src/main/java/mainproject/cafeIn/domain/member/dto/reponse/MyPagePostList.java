package mainproject.cafeIn.domain.member.dto.reponse;


import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class MyPagePostList {

    private long postId;
    private String image;
    private String title;
    private String author;

    @QueryProjection
    public MyPagePostList(long postId, String image, String title, String author) {
        this.postId = postId;
        this.image = image;
        this.title = title;
        this.author = author;
    }
}