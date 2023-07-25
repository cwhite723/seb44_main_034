package mainproject.cafeIn.domain.post.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.service.CafeService;
import mainproject.cafeIn.domain.post.dto.request.PostRequest;
import mainproject.cafeIn.domain.post.dto.response.MultiPostResponse;
import mainproject.cafeIn.domain.post.dto.response.PostDetailResponse;
import mainproject.cafeIn.domain.post.service.PostService;
import mainproject.cafeIn.domain.postbookmark.service.PostBookmarkService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final PostBookmarkService postBookmarkService;
    private final CafeService cafeService;

    // 게시물 등록
    @PostMapping(value = "/{cafe-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse<Long> createPost(@PathVariable("cafe-id") Long cafeId,
                                                @RequestPart(value = "dto") PostRequest request,
                                                @RequestPart(value = "postImage", required = false) MultipartFile image) throws IOException {

        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long postId = postService.createPost(loginId, cafeId, request, image);

        return new ApplicationResponse<>(postId);
    }

    // 게시물 수정
    @PatchMapping(value = "/{post-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<Long> patchPost(@PathVariable("post-id") Long postId,
                                               @RequestPart(value = "dto") PostRequest request,
                                               @RequestPart(value = "postImage", required = false) MultipartFile image) throws IOException {

        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long cafeId = postService.updatePost(loginId, postId, request, image);

        // 오류 파악용으로 컨트롤러 메서드로 옮김
        cafeService.calculateRating(cafeService.findCafeById(cafeId));

        return new ApplicationResponse<>(postId);
    }

    // 게시물 상세 조회
    @GetMapping("/{post-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<PostDetailResponse> getPost(@PathVariable("post-id") Long postId) {

        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        PostDetailResponse response = postService.findPost(loginId, postId);

        return new ApplicationResponse<>(response);
    }

    // 게시물 리스트 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<MultiPostResponse> getPosts(@Positive @RequestParam int page,
                                                           @Positive @RequestParam int size) {

        MultiPostResponse response = postService.findPosts(page, size);

        return new ApplicationResponse<>(response);
    }

    // 게시물 삭제
    @DeleteMapping("/{post-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<Long> deletePost(@PathVariable("post-id") Long postId) {

        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long cafeId = postService.deletePost(loginId, postId);

        // 오류 파악용으로 컨트롤러 메서드로 옮김
        cafeService.calculateRating(cafeService.findCafeById(cafeId));

        return new ApplicationResponse<>(cafeId);
    }

    // 게시글 북마크 기능
    @PostMapping("/{post-id}/bookmark")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse createPostBookmark(@PathVariable("post-id") Long postId) {

        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        postBookmarkService.createPostBookmark(loginId, postId);

        return new ApplicationResponse();
    }
}
