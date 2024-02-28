import React, { useState, useEffect } from "react";
import axios from "axios";

function GetBackground(id) {
  const [imageList, setImageList] = useState([]);
  const [imagePath, setImagePath] = useState();

  useEffect(() => {
    const fetchGetImageList = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/background/list/${id}`
        );
        setImageList(response.data.contents);

        if (imageList.length > 0) {
          const randomIndex = Math.floor(Math.random() * imageList.length);
          setImagePath(imageList[randomIndex].filePath);
          console.log(imagePath);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGetImageList(id);
  }, []);

  const extractFileNameAddPath = (filePath) => {
    // filePath가 정의되어 있을 때
    if (filePath) {
      // \src\frontend\applejun\public\background-image\ 부분을 지우고 파일 이름만 반환
      const fileName = filePath.replace(
        /\src\frontend\applejun\public\background-image\//,
        ""
      );
      setImagePath(fileName);
    } else {
      console.log("error"); // filePath가 undefined일 경우에 대한 기본값 설정
    }
  };

  return extractFileNameAddPath(imagePath);
}

export default GetBackground;
