import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BackgroundDelete(id) {
  const isConfirmed = window.confirm("사진을 삭제하시겠습니까?");

  if (isConfirmed) {
    try {
      axios.delete(`http://localhost:8080/background/delete/${id}`, {
        withCredentials: true,
      });

      alert("삭제가 완료되었습니다.");
      return 1;
    } catch (error) {
      console.log(error);
    }
  }

  return 0;
}

export default BackgroundDelete;
