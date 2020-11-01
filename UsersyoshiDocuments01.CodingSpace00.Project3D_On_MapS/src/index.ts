import lowerGeoData from './data/gsi20201101220423432.json';
import upperGeoData from './data/upper_layer.json';

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 17.5,
    center: { lat: 35.693173, lng: 139.761801 },
  });

  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
  map.setTilt(45);

  // オブジェクト(i-Vinciの立体文字列)の底面と上面のPolygonをoverlayに追加
  map.data.addGeoJson(lowerGeoData);
  map.data.addGeoJson(upperGeoData);
  map.data.setStyle({
    fillColor: "orange",
    fillOpacity: 0.75
  });

  // オブジェクト(i-Vinciの立体文字列)の側面のpolylineを追加
  for (let i = 0; i < lowerGeoData.features.length; i++){
    for (let j = 0; j < lowerGeoData.features[i].geometry.coordinates[0].length; j++){
      let lp = lowerGeoData.features[i].geometry.coordinates[0][j];
      let up = upperGeoData.features[i].geometry.coordinates[0][j];
      const line = new google.maps.Polyline({
        path: [
          {lat: lp[1], lng: lp[0]},
          {lat: up[1], lng: up[0]}
        ],
        map: map
      });
    }
  }
}
export { initMap };
