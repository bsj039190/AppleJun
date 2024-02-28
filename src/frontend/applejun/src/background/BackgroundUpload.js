import axios from "axios";

function BackgroundUpload(uploadFile, backgroundRequest) {
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
        formData
      );

      console.log(response.data);
      alert("작성을 완료하였습니다!");

      return 1;
    } catch (error) {
      console.log(error);
    }
  };
  upload();

  return 0;
}

export default BackgroundUpload;
