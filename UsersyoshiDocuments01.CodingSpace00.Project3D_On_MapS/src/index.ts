import lowerGeoData from "./data/gsi20201101220423432.json";
import upperGeoData from "./data/upper_layer.json";
import circleAndPolygonGeoData from "./data/circle_and_polygon.json";

let map: google.maps.Map;
const circleGeoData = circleAndPolygonGeoData.features[0];
const polygonGeoData = circleAndPolygonGeoData.features[1];

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 15.5,
    center: { lat: 35.693173, lng: 139.761801 },
  });

  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
  map.setTilt(45);

  // オブジェクト(i-Vinciの立体文字列)の底面と上面のPolygonをoverlayに追加
  map.data.addGeoJson(lowerGeoData);
  map.data.addGeoJson(upperGeoData);
  map.data.setStyle({
    fillColor: "orange",
    fillOpacity: 0.75,
  });

  // 矩形をoverlayに追加。
  // GeoJsonから読み取ったデータをもとに矩形を初期化
  const rectangle = new google.maps.Polygon({
    paths: (polygonGeoData.geometry.coordinates[0] as number[][]).map((c) => {
      return new google.maps.LatLng(c[1], c[0]);
    }),
    strokeOpacity: polygonGeoData.properties._fillOpacity,
    fillColor: polygonGeoData.properties._fillColor,
  });
  rectangle.setMap(map);

  // 円形をoverlayに追加
  // GeoJsonから読み取ったデータをもとに円形を初期化
  const circle = new google.maps.Circle({
    center: new google.maps.LatLng(
      circleGeoData.geometry.coordinates[1] as number,
      circleGeoData.geometry.coordinates[0] as number
    ),
    draggable: true,
    editable: true,
    fillColor: circleGeoData.properties._fillColor,
    fillOpacity: circleGeoData.properties._fillOpacity,
    radius: circleGeoData.properties._radius,
  });
  circle.setMap(map);

  // オブジェクト(i-Vinciの立体文字列)の側面のpolylineを追加
  for (let i = 0; i < lowerGeoData.features.length; i++) {
    for (
      let j = 0;
      j < lowerGeoData.features[i].geometry.coordinates[0].length;
      j++
    ) {
      const lp = lowerGeoData.features[i].geometry.coordinates[0][j];
      const up = upperGeoData.features[i].geometry.coordinates[0][j];
      const line = new google.maps.Polyline({
        path: [
          { lat: lp[1], lng: lp[0] },
          { lat: up[1], lng: up[0] },
        ],
        map: map,
      });
    }
  }
}
export { initMap };
