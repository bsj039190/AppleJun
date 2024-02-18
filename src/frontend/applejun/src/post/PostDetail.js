import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      {post.images &&
        post.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            style={{ maxWidth: "100%" }}
          />
        ))}
    </div>
  );
};

export default PostDetail;
