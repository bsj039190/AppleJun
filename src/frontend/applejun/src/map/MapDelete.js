import axios from "axios";

function MapDelete(id, name) {
  const isConfirmed = window.confirm(`${name}을 삭제하시겠습니까?`);

  if (isConfirmed) {
    try {
      axios.delete(`http://localhost:8080/gps/delete/${id}`);

      alert("삭제가 완료되었습니다.");
      alert("지도로 이동합니다.");
    } catch (error) {
      console.error(error);
    }
  }
}

export default MapDelete;
