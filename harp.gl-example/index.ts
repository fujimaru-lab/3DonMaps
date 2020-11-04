import { GeoCoordinates } from "@here/harp-geoutils";
import { MapAnchor, MapViewEventNames } from "@here/harp-mapview";
import THREE = require("three");
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { View } from "./View";

const cood = { 
    lond: 40.707085,
    latd: -74.010727
}

const app = new View({
    canvas: document.getElementById("map") as HTMLCanvasElement
});

const mapView = app.mapView;
// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener("resize", () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

let heading = -90;
mapView.addEventListener(MapViewEventNames.Render, () => {
    mapView.lookAt({ heading });
    heading += 0.2;
});
mapView.beginAnimation();

const anchor = new THREE.Object3D() as MapAnchor<THREE.Object3D>;
anchor.anchor = new GeoCoordinates(cood.lond, cood.latd, 0);
mapView.mapAnchors.add(anchor);

async function getIVinci() {
    const loader = new GLTFLoader();
    loader.load('./resources/vinci.glb', (gltf) => {
        anchor.add(gltf.scene);
        mapView.update();
    }, 
    undefined, 
    (error) => console.log(error));
    mapView.lookAt({
        target: new GeoCoordinates(cood.lond, cood.latd),
        tilt: 75,
        zoomLevel: 16,
    });
    mapView.update();
}
getIVinci();

// make sure the map is rendered
mapView.update();