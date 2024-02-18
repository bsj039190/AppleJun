import React, { useState } from "react";

const PostWrite = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "수정된 제목",
    uploader: 1,
    content: "수정된 내용",
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
      postData.append(`fileList[${index}]`, file);
    });

    // 정보를 JSON 형식으로 추가
    const contentsData = {
      uploader: Number(formData.uploader),
      title: formData.title,
      content: formData.content,
      date: getCurrentDate(),
      gps1: 1, // Example value
      gps2: 1, // Example value
      gps3: 1, // Example value
    };

    postData.append(
      "postRequest",
      new Blob([JSON.stringify(contentsData)], { type: "application/json" })
    );

    try {
      const response = await fetch("http://localhost:8080/post/create", {
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        console.log("업로드 성공");
      } else {
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
// const [post, setPost] = useState();
// const [fileList, setFileList] = useState([]);

// const changeValue = (e) => {
//   setPost({
//     ...post,
//     [e.target.name]: e.target.value,
//   });
// };

// const saveFile = (e) => {
//   setFileList(e.target.files[0]);
// };

// const submitPost = (e) => {
//   e.preventDefault();

//   const formData = new FormData();

//   formData.append("fileList", fileList);
//   formData.append("postRequest", JSON.stringify(post));

//   fetch("http://localhost:8080/post/create", {
//     method: "POST",
//     body: formData,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// return (
//   <form onSubmit={submitPost}>
//     <input type="text" name="title" onChange={changeValue} />
//     <input type="text" name="contents" onChange={changeValue} />
//     <input type="file" onChange={saveFile} />
//     <button type="submit">등록</button>
//   </form>
// );
