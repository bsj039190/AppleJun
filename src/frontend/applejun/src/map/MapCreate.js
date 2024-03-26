import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/app/Background.css";
import "../css/app/UpperbarProfile.css";
import "../css/app/MapCreate.css";
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
  const [marker, setMarker] = useState({});
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(0);
  const naverLink = `https://map.naver.com/p/search/${gpsRequest.name}`;
  const [mapInstance, setMapInstance] = useState(null);

  const [left, setLeft] = useState({
    name: "",
    profileImage: "",
  });

  const [right, setRight] = useState({
    name: "",
    profileImage: "",
  });

  const extractProfileImageName = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
    return parts.pop();
  };

  const fetchProfile = async (e) => {
    const joon = await axios.get(`http://localhost:8080/account/get/1`, {
      withCredentials: true,
    });

    const joonData = joon.data.contents;
    if (joonData !== null) {
      console.log(joonData);
      setLeft({
        name: joonData.name,
        profileImage: extractProfileImageName(joonData.profileImage),
      });
    }

    const soo = await axios.get(`http://localhost:8080/account/get/2`, {
      withCredentials: true,
    });

    const sooData = soo.data.contents;
    if (sooData !== null) {
      console.log(sooData);
      setRight({
        name: sooData.name,
        profileImage: extractProfileImageName(sooData.profileImage),
      });
    }
  };

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

        const position = new navermaps.LatLng(
          items[0].point.y,
          items[0].point.x
        );

        const marker = new navermaps.Marker({
          map: mapInstance,
          position,
        });

        setMarker(marker);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser != 3) {
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
    } else {
      alert("게스트 계정은 업로드 할 수 없습니다.");
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
    fetchProfile();
  }, []);

  useEffect(() => {
    if (gps.gpsLat == 0) {
      // map 변수 선언
      const mapInstance = new navermaps.Map("map", {
        center: new navermaps.LatLng(37.5121391, 126.8426069),
        zoom: 10,
      });
    } else {
      const mapInstance = new navermaps.Map("map", {
        center: new navermaps.LatLng(gps.gpsLat, gps.gpsLng),
        zoom: 19,
      });
      console.log(mapInstance);
      setMapInstance(mapInstance);

      marker.setMap(mapInstance);
    }
  }, [gps]);

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        id="n_1920__10"
        className="gradient-background"
        style={{ zIndex: -2 }}
      >
        <svg className="n_27_t">
          <linearGradient
            id="n_27_t"
            spreadMethod="pad"
            x1="0"
            x2="1"
            y1="0.5"
            y2="0.5"
          >
            <stop offset="0" stopColor="#ffe0e7" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#d6eaff" stopOpacity="1"></stop>
          </linearGradient>
          <rect
            id="n_27_t"
            rx="0"
            ry="0"
            x="0"
            y="0"
            width="100%"
            height="100%"
          ></rect>
        </svg>
      </div>

      <div className="upperbarLeftSubject">
        <img src="/logos/Map.png" style={{ width: "40px", height: "auto" }} />
        <p
          className="customTextColorAndShadow"
          style={{ display: "flex", marginLeft: "0px" }}
        >
          새로운 장소
        </p>
      </div>

      <div className="upperbarProfileGruop customTextColorAndShadow">
        <p>{left.name}</p>
        <img
          src={`/profile-image/${left.profileImage}`}
          alt="leftProfile"
          className="upperbarProfileGruopImg"
        />

        <img
          src="/logos/Heart.png"
          alt="Heart"
          style={{ width: "50px", height: "50px" }}
        />

        <img
          src={`/profile-image/${right.profileImage}`}
          alt="rightProfile"
          className="upperbarProfileGruopImg"
        />
        <p>{right.name}</p>
      </div>

      <div className="upperbarHomeButton">
        <img
          src="/logos/HomeButton.png"
          onClick={() => history.push(`/home`)}
          style={{ width: "36px", height: "36px" }}
        />
      </div>

      <div className="mapGroup">
        <form
          onSubmit={handleSubmit}
          style={{ marginLeft: "100px", color: "#FFA8BC" }}
        >
          <p style={{ fontSize: "30px" }}>새로운 장소 저장하기</p>
          <div className="mapGroupLabel">
            <label>
              이름
              <input
                type="text"
                name="name"
                value={gpsRequest.name}
                onChange={handleChange}
                style={{ width: "223px" }}
              />
            </label>
          </div>

          <div className="mapGroupLabel">
            <label>
              주소
              <input
                type="text"
                name="address"
                value={gpsRequest.address}
                onChange={handleChange}
                style={{ width: "330px" }}
              />
              <button onClick={(e) => onClickAddress(e, gpsRequest.address)}>
                GPS 변환
              </button>
            </label>
          </div>

          <div className="mapGroupLabel">
            <label>
              위도: {gps.gpsLat} 경도: {gps.gpsLng}
            </label>
          </div>

          <div className="mapGroupLabel">
            <label>
              카테고리
              <input
                type="text"
                name="subject"
                value={gpsRequest.subject}
                onChange={handleChange}
                style={{ width: "95px" }}
              />
            </label>
          </div>

          <div className="mapGroupLabel">
            <label>
              URL
              <input
                type="text"
                name="url"
                value={gpsRequest.url}
                onChange={handleChange}
                style={{ width: "330px" }}
              />
            </label>
            <button>
              <a
                href={naverLink}
                target="_blank"
                style={{ color: "white", textDecoration: "none" }}
              >
                URL 수정
              </a>
            </button>
          </div>

          <div className="mapGroupLabel">
            <button type="submit">저장하기</button>
            {currentUser === 3 && <p>게스트 계정은 업로드 할 수 없습니다.</p>}
          </div>
        </form>

        <div
          id="map"
          style={{
            width: "550px",
            height: "550px",
            marginLeft: "60px",
            marginTop: "100px",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>
    </div>
  );
}

export default MapCreate;
