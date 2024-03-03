import axios from "axios";

const BackgroundUpload = async (uploadFile, backgroundRequest) => {
  console.log("엄준식");

  console.log(backgroundRequest);

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

  console.log([...formData]);
  const upload = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/background/upload",
        formData,
        { withCredentials: true }
      );

      console.log(response.data);
      alert("작성을 완료하였습니다!");

      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  upload();
};

export default BackgroundUpload;
