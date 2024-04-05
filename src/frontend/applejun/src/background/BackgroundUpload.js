import axios from "axios";

const BackgroundUpload = async (uploadFile, backgroundRequest) => {
  const formData = new FormData();

  if (uploadFile == null) {
    console.error("No Image");
  } else {
    const file = uploadFile[0];
    formData.append("file", file);
  }

  formData.append(
    "backgroundImageRequest",
    new Blob([JSON.stringify(backgroundRequest)], { type: "application/json" })
  );

  const upload = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/background/upload",
        formData,
        { withCredentials: true }
      );

      alert("작성을 완료하였습니다!");

      return 1;
    } catch (error) {
      console.log(error);
      alert("업로드 실패!");
      return 0;
    }
  };

  upload();
};

export default BackgroundUpload;
