import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
} from "react-naver-maps";

const MapNaver = () => {
  const navermaps = useNavermaps();
  const [isMounted, setIsMounted] = useState(true);

  var markers = [],
    infoWindows = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/gps/get/list", {
          withCredentials: true,
        });

        if (!isMounted) return; // Check if the component is still mounted

        const map = new navermaps.Map("map", {
          center: new navermaps.LatLng(37.5121391, 126.8426069),
          zoom: 11,
        });

        const markers = response.data.contents.map((gps) => {
          return {
            position: new navermaps.LatLng(gps.gpsLat, gps.gpsLng),
            title: gps.name,
            map: map,
            icon: {
              content: (
                <img
                  src="/public/logo192.png"
                  alt=""
                  style={{
                    margin: 0,
                    padding: 0,
                    border: "0px solid transparent",
                    display: "block",
                    maxWidth: "none",
                    maxHeight: "none",
                    WebkitUserSelect: "none",
                    position: "absolute",
                    width: "32px",
                    height: "32px",
                    left: "0px",
                    top: "0px",
                  }}
                />
              ),
              size: new navermaps.Size(32, 32),
              anchor: new navermaps.Point(16, 32),
            },
          };
        });

        markers.forEach((marker) => {
          // position이 유효한 경우에만 Marker를 생성하도록 검사
          if (marker.position) {
            const naverMarker = new navermaps.Marker({
              ...marker,
              marker,
            });

            if (!naverMarker) {
              console.error("Failed to create the navermaps.Marker object.");
              return; // 중단하여 계속 진행하지 않음
            }
          }

          const infoWindow = new navermaps.InfoWindow({
            content: (
              <div
                style={{ width: "200px", textAlign: "center", padding: "10px" }}
              >
                <b>서울남산타워</b>
                <br />- 네이버 지도 -
              </div>
            ),
          });

          // navermaps.Event.addListener(naverMarker, "click", () => {
          //   if (infoWindow.getMap()) {
          //     infoWindow.close();
          //   } else {
          //     infoWindow.open(map, naverMarker);
          //   }
          // });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => setIsMounted(false);
  }, [isMounted]);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default MapNaver;
