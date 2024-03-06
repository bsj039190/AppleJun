import React, { useEffect } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
  Overlay,
} from "react-naver-maps";

const MapComponent = () => {
  const navermaps = useNavermaps();

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    const mapOptions = {
      center: new navermaps.LatLng(37.552758094502494, 126.98732600494576),
      zoom: 15,
    };

    const map = new navermaps.Map("map", mapOptions);

    const markerOptions = {
      position: new navermaps.LatLng(37.552758094502494, 126.98732600494576),
      map: map,
      title: "남산서울타워",
      // icon: {
      //   content:
      //     '<img src="/resources/img/chu.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 32px; height: 32px; left: 0px; top: 0px;">',
      //   size: new navermaps.Size(32, 32),
      //   anchor: new navermaps.Point(16, 32),
      // },
    };

    const marker = new navermaps.Marker(markerOptions);

    const infoWindowOptions = {
      content:
        '<div style="width:200px;text-align:center;padding:10px;"><b>서울남산타워</b><br> - 네이버 지도 - </div>',
    };

    const infoWindow = new navermaps.InfoWindow(infoWindowOptions);

    navermaps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });
  };

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default MapComponent;
