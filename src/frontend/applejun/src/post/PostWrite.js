import React, { useState } from "react";

const PostWrite = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "수정된 제목",
    uploader: 1,
    date: "", // 현재 날짜로 초기화
    content: "수정된 내용",
    gps1: 1,
    gps2: 1,
    gps3: 1,
  });

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpload = async () => {
    const postData = new FormData();

    // 파일들을 formData에 추가
    files.forEach((file, index) => {
      postData.append("fileList[${index}]", file);
    });

    // 정보를 JSON 형식으로 추가
    const contentsData = {
      userNo: formData.uploader,
      title: formData.title,
      content: formData.content,
      categoryCode: 1, // 예시로 1로 고정
      dues: 0, // 예시로 0으로 고정
      personNumber: 1, // 예시로 1로 고정
    };
    postData.append(
      "contentsData",
      new Blob([JSON.stringify(contentsData)], { type: "application/json" })
    );

    // 'postRequest' 파트 추가
    postData.append("postRequest", ""); // 빈 값을 추가

    try {
      const response = await fetch("http://localhost:8080/post/create", {
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        // 성공적으로 업로드되었을 때의 처리
        console.log("업로드 성공");
      } else {
        // 업로드 실패 시의 처리
        console.error("업로드 실패");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생", error);
    }
  };

  return (
    <div>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Files:
        <input type="file" onChange={handleFileChange} multiple />
      </label>
      <br />
      <label>
        Contents:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PostWrite;
