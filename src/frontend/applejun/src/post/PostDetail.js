import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import extractFileNameAddPath from "./extractFileNameAddPath";
import logo from "../post-image/dc787a5f-6946-4644-89c7-4b876c8523c8_defaultProfile.jpg";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      const response = await axios.get(`http://localhost:8080/post/${id}`);
      setPost(response.data.contents);
      setLoading(false);
      console.log(response);
    };
    fetchPostDetail();
  }, [id]);

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

      <h3>이미지</h3>
      {post.images && post.images.length > 0 ? (
        post.images.map((image, index) => (
          <div key={index}>
            <p>File Name: {extractFileNameAddPath(image)}</p>
            <img
              src={extractFileNameAddPath(image)}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: "100%" }}
              onLoad={() => console.log("Image loaded successfully")}
              onError={() => console.error("Error loading image")}
            />

            <p>엥</p>
            <img
              src={
                require("../post-image/dc787a5f-6946-4644-89c7-4b876c8523c8_defaultProfile.jpg")
                  .default
              }
            />
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
      <button>수정하기</button>
    </div>
  );
};

export default PostDetail;
