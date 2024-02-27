import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const history = useHistory();

  useEffect(() => {
    const fetchPostDetail = async () => {
      const response = await axios.get(`http://localhost:8080/post/${id}`);
      setPost(response.data.contents);
      console.log(response);
    };
    fetchPostDetail();
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        // 삭제 요청을 보냅니다.
        await axios.delete(`http://localhost:8080/post/delete/${id}`);
        // 삭제가 완료되면 리스트 페이지로 이동합니다.
        alert("삭제가 완료되었습니다.");
        history.replace("/post/get/list");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const extractFileNameAddPath = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
    return parts.pop();
  };

  return (
    <div>
      <h2>포스트 세부 정보</h2>
      <p>ID: {post.id}</p>
      <p>제목: {post.title}</p>
      <p>업로더: {post.uploader}</p>
      <p>날짜: {post.date}</p>
      <p>내용: {post.content}</p>
      <p>gps1: {post.gps1}</p>
      <p>gps2: {post.gps2}</p>
      <p>gps3: {post.gps3}</p>

      <button onClick={() => history.push(`/post/update/${id}`)}>
        수정하기
      </button>

      <button onClick={handleDelete}>삭제</button>

      <h3>이미지</h3>
      {post.images && post.images.length > 0 ? (
        post.images.map((image, index) => (
          <div key={index}>
            <p>File Name: {extractFileNameAddPath(image)}</p>
            <p>Image : {image}</p>
            <img
              src={`/post-image/${extractFileNameAddPath(image)}`}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: "100%" }}
              onLoad={() => console.log("Image loaded successfully")}
              onError={() => console.error("Error loading image")}
            />
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default PostDetail;
