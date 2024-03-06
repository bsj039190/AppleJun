import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const PostWrite = () => {
  const [postRequest, setPostRequest] = useState({
    title: "",
    uploader: 1,
    date: "2000-01-01",
    content: "",
    gps1: 1,
    gps2: 1,
    gps3: 1,
  });
  const [fileList, setFileList] = useState([]);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostRequest({
      ...postRequest,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileList(files);
  };

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        setCurrentUser(userObject.id);
        console.log(userObject.id);
      }
    };

    loadStoredUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser != 3) {
      const formData = new FormData();

      console.log(postRequest.uploader);

      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          formData.append("fileList", fileList[i]);
        }
      } else {
        formData.append("fileList", new Blob()); // fileList가 비어 있을 때 빈 Blob을 append
      }

      formData.append(
        "postRequest",
        new Blob([JSON.stringify(postRequest)], { type: "application/json" })
      );

      console.log([...formData]);
      try {
        const response = await axios.post(
          "http://localhost:8080/post/create",
          formData,
          { withCredentials: true }
        );

        console.log(response.data);
        alert("작성을 완료하였습니다!");
        history.push("/post/get/list");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    } else {
      alert("게스트 계정은 업로드 할 수 없습니다.");
      history.push("/post/get/list");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={postRequest.title}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Uploader:
        <input
          type="text"
          name="uploader"
          value={currentUser}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Date:
        <input
          type="text"
          name="date"
          value={postRequest.date}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Content:
        <input
          type="text"
          name="content"
          value={postRequest.content}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        GPS1:
        <input
          type="text"
          name="gps1"
          value={postRequest.gps1}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        GPS2:
        <input
          type="text"
          name="gps2"
          value={postRequest.gps2}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        GPS3:
        <input
          type="text"
          name="gps3"
          value={postRequest.gps3}
          onChange={handleChange}
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

      <button type="submit">Submit</button>
      {currentUser === 3 && <p>게스트 계정은 업로드 할 수 없습니다.</p>}
    </form>
  );
};

export default PostWrite;
