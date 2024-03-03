import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
} from "react-naver-maps";

function MapCreate() {
  const [gpsRequest, setGpsrequest] = useState({
    name: "Default Name",
    gpsLat: 0, //위도
    gpsLng: 0, //경도
    url: "http://www.naver.com",
    subject: "Default Subject",
    date: "2000-01-01",
    address: "서울특별시 서대문구 포방터4길 11-5",
  });
  const [gps, setGps] = useState({
    gpsLat: 0,
    gpsLng: 0,
  });
  const navermaps = useNavermaps();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGpsrequest({
      ...gpsRequest,
      [name]: value,
    });
  };

  const onClickAddress = (e, gps) => {
    e.preventDefault();

    navermaps.Service.geocode(
      {
        address: gps,
      },
      function (status, response) {
        if (status !== navermaps.Service.Status.OK) {
          console.log("error");
          return alert("Something wrong!");
        }

        console.log(response.result);

        const result = response.result;
        const items = result.items;

        // 좌표를 gps에 저장
        setGps({
          gpsLat: items[0].point.y,
          gpsLng: items[0].point.x,
        });

        // gpsRequest 업데이트
        setGpsrequest((prevGpsrequest) => ({
          ...prevGpsrequest,
          gpsLat: items[0].point.y,
          gpsLng: items[0].point.x,
        }));
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiResponse = await axios.post(
        "http://localhost:8080/gps/create",
        gpsRequest,
        { withCredentials: true }
      );

      console.log(apiResponse.data);
      alert("위치 정보 추가가 완료되었습니다!");
      history.push("/map/list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={gpsRequest.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={gpsRequest.subject}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={gpsRequest.address}
            onChange={handleChange}
          />
          <button onClick={(e) => onClickAddress(e, gpsRequest.address)}>
            GPS 변환
          </button>
        </label>
        <br />

        <label>
          위도: {gps.gpsLat}, 경도: {gps.gpsLng}
        </label>
        <br />

        <label>
          Url:
          <input
            type="text"
            name="url"
            value={gpsRequest.url}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">위치 추가</button>
      </form>
      <br />
      <br />
      <a href="https://map.naver.com/p" target="_blank">
        네이버 지도 링크
      </a>
      <br />
      <br />
      <div>
        <button onClick={() => history.push(`/home`)}>홈으로</button>
      </div>
    </div>
  );
}

export default MapCreate;
