import React, { useState } from "react";
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

  const history = useHistory();

  const handleSubmit = async (e) => {
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
          value={postRequest.uploader}
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
    </form>
  );
};

export default PostWrite;
