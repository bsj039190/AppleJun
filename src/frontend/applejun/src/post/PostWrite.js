import React, { useState, useEffect } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

const PostWrite = () => {
  const [postRequest, setPostRequest] = useState({
    title: "",
    uploader: 1,
    date: "2024-03-12",
    content: "",
    gps1: 1,
    gps2: 1,
    gps3: 1,
  });
  const [fileList, setFileList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [gpsList, setGpsList] = useState([]);
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

    // 이미지 미리보기 생성
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleDateChange = (date) => {
    setPostRequest({
      ...postRequest,
      date,
    });
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
    const loadStoredUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        setCurrentUser(userObject.id);
        console.log(userObject.id);
      }
    };

    loadStoredUser();
    getGps();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser != 3) {
      const formData = new FormData();

      console.log(postRequest);

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

      {/* <label>
        Date:
        <input
          type="text"
          name="date"
          value={postRequest.date}
          onChange={handleChange}
        />
      </label>
      <br /> */}

      <label>
        Date:
        {/* <DatePicker
          selected={postRequest.date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        /> */}
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
        <select name="gps1" value={postRequest.gps1} onChange={handleChange}>
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
        <select name="gps2" value={postRequest.gps2} onChange={handleChange}>
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
        <select name="gps3" value={postRequest.gps3} onChange={handleChange}>
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
        {imagePreviews.length > 0 ? (
          imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                marginRight: "10px",
              }}
            />
          ))
        ) : (
          <p>이미지 미리보기</p>
        )}
      </div>

      <button type="submit">Submit</button>
      {currentUser === 3 && <p>게스트 계정은 업로드 할 수 없습니다.</p>}
    </form>
  );
};

export default PostWrite;
