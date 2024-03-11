import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PostUpdate = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [fileList, setFileList] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    uploader: 1,
    date: "2024-03-12",
    content: "",
    gps1: 1,
    gps2: 1,
    gps3: 1,
  });

  const [gpsList, setGpsList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const history = useHistory();

  const extractFileNameAddPath = (filePath) => {
    const parts = filePath.split(/[\\/]/);
    return parts.pop();
  };

  const handleInputChange = (e) => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileList(files);

    // 이미지 미리보기 생성
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleDateChange = (date) => {
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      date: date ? date.toISOString().split("T")[0] : null,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append("fileList", fileList[i]);
      }
    } else {
      formData.append("fileList", new Blob()); // fileList가 비어 있을 때 빈 Blob을 append
    }

    formData.append(
      "postRequest",
      new Blob([JSON.stringify(updatedPost)], { type: "application/json" })
    );

    console.log([...formData]);

    try {
      await axios.put(`http://localhost:8080/post/update/${id}`, formData, {
        withCredentials: true,
      });

      // 업데이트 성공 후 리다이렉션
      alert("업데이트가 완료되었습니다!");
      history.push(`/post/get/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const getGps = async () => {
    try {
      const response = await axios.get("http://localhost:8080/gps/get/list", {
        withCredentials: true,
      });
      setGpsList(response.data.contents);
      console.log(response.data.contents);
    } catch (error) {
      console.error("Error fetching GPS list:", error);
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postResponse = await axios.get(
          `http://localhost:8080/post/${id}`,
          {
            withCredentials: true,
          }
        );
        setPost(postResponse.data.contents);
        console.log(postResponse.data.contents);

        // 포스트 정보가 있으면, 해당 정보를 사용하여 updatedPost 초기값 설정
        if (postResponse.data.contents) {
          const { title, uploader, date, content, gps1, gps2, gps3 } =
            postResponse.data.contents;

          // date 배열을 가공하여 ISO 문자열로 변환
          const isoDateString = new Date(
            date[0],
            date[1] - 1,
            date[2]
          ).toISOString();

          setUpdatedPost({
            title,
            uploader,
            date: isoDateString,
            content,
            gps1,
            gps2,
            gps3,
          });
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
      }
    };
    fetchPostDetail();
    getGps();
  }, [id]);

  useEffect(() => {
    // 기존 이미지가 존재하면 이미지 미리보기 생성
    if (post.images && post.images.length > 0) {
      const previews = post.images.map(
        (image) => `/post-image/${extractFileNameAddPath(image)}`
      );
      setImagePreviews(previews);
      console.log(previews);
    }
  }, [post.images]);

  return (
    <div>
      <h2>포스트 업데이트</h2>
      <p>ID: {post.id}</p>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={updatedPost.title}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Uploader:
        <input
          type="text"
          name="uploader"
          value={updatedPost.uploader}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Date:
        <DatePicker
          selected={updatedPost.date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </label>
      <br />

      <label>
        Content:
        <textarea
          name="content"
          value={updatedPost.content}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        GPS1:
        <select
          name="gps1"
          value={updatedPost.gps1}
          onChange={handleInputChange}
        >
          {gpsList.map((gps) => (
            <option key={gps.id} value={gps.id}>
              {gps.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        GPS2:
        <select
          name="gps2"
          value={updatedPost.gps2}
          onChange={handleInputChange}
        >
          {gpsList.map((gps) => (
            <option key={gps.id} value={gps.id}>
              {gps.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        GPS3:
        <select
          name="gps3"
          value={updatedPost.gps3}
          onChange={handleInputChange}
        >
          {gpsList.map((gps) => (
            <option key={gps.id} value={gps.id}>
              {gps.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        File(s):
        <input
          type="file"
          name="fileList"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <br />

      <div>
        {/* 이미지 미리보기 */}
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index + 1}`}
            style={{ maxWidth: "500px", margin: "5px" }}
          />
        ))}
      </div>

      <button onClick={handleUpdate}>업데이트</button>
      <button onClick={() => history.goBack()}>돌아가기</button>
    </div>
  );
};

export default PostUpdate;
