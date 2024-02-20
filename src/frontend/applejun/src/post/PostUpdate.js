import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const PostUpdate = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [fileList, setFileList] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    uploader: 1,
    date: "2000-01-01",
    content: "",
    gps1: 1,
    gps2: 1,
    gps3: 1,
  });

  const history = useHistory();

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/post/${id}`);
        setPost(response.data.contents);
        console.log(response);

        // 포스트 정보가 있으면, 해당 정보를 사용하여 updatedPost 초기값 설정
        if (response.data.contents) {
          const { title, uploader, date, content, gps1, gps2, gps3 } =
            response.data.contents;
          setUpdatedPost({
            title,
            uploader,
            date,
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
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileList(files);
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
      await axios.put(`http://localhost:8080/post/update/${id}`, formData);

      // 업데이트 성공 후 리다이렉션
      alert("업데이트가 완료되었습니다!");
      history.push(`/post/get/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

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
        <input
          type="text"
          name="date"
          value={updatedPost.date}
          onChange={handleInputChange}
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
        <input
          type="text"
          name="gps1"
          value={updatedPost.gps1}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        GPS2:
        <input
          type="text"
          name="gps2"
          value={updatedPost.gps2}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        GPS3:
        <input
          type="text"
          name="gps3"
          value={updatedPost.gps3}
          onChange={handleInputChange}
        />
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

      <button onClick={handleUpdate}>업데이트</button>
      <button onClick={() => history.push(`/post/detail/${id}`)}>
        돌아가기
      </button>
    </div>
  );
};

export default PostUpdate;
