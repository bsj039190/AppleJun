import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [gpsList, setGpsList] = useState();

  const history = useHistory();

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        // 삭제 요청을 보냅니다.
        await axios.delete(`http://localhost:8080/post/delete/${id}`, {
          withCredentials: true,
        });
        // 삭제가 완료되면 리스트 페이지로 이동합니다.
        alert("삭제가 완료되었습니다.");
        history.replace("/post/get/list");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  //사진정보에서 이름부분만 추출
  const extractFileNameAddPath = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
    return parts.pop();
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      const response = await axios.get(`http://localhost:8080/post/${id}`, {
        withCredentials: true,
      });
      setPost(response.data.contents);
      console.log(response.data.contents);

      console.log(post.gps1);
    };
    fetchPostDetail();
  }, [id]);

  useEffect(() => {
    const getGps = async () => {
      const gpsResponse = await axios.get(
        `http://localhost:8080/gps/get/list`,
        {
          withCredentials: true,
        }
      );

      // post.gps1, post.gps2, post.gps3 값과 일치하는 항목만 필터링
      const filteredGpsList = gpsResponse.data.contents.filter((gpsItem) => {
        return (
          gpsItem.id === post.gps1 ||
          gpsItem.id === post.gps2 ||
          gpsItem.id === post.gps3
        );
      });

      setGpsList(filteredGpsList);
      console.log(filteredGpsList);
    };
    getGps();
  }, [post]);

  return (
    <div>
      <h2>포스트 세부 정보</h2>
      <p>ID: {post.id}</p>
      <p>제목: {post.title}</p>
      <p>업로더: {post.uploader}</p>
      <p>
        날짜:{" "}
        {post.date?.[0]
          ? `${post.date[0]}년 ${post.date[1]}월 ${post.date[2]}일`
          : "0"}
      </p>
      <p>내용: {post.content}</p>

      <h3>GPS 목록</h3>
      {gpsList && gpsList.length > 0 ? (
        // 모든 항목의 id가 1인 경우에만 "No GPS data available"을 출력
        gpsList.every((gpsItem) => gpsItem.id === 1) ? (
          <p>No GPS data available</p>
        ) : (
          <ul>
            {gpsList.map(
              (gpsItem) =>
                // id가 1인 경우는 출력하지 않음
                gpsItem.id !== 1 && (
                  <li key={gpsItem.id}>
                    <a
                      href={gpsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {gpsItem.name}
                    </a>
                    {/* 다른 GPS 속성들을 여기에 출력 */}
                  </li>
                )
            )}
          </ul>
        )
      ) : (
        <p>No GPS data available</p>
      )}

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
