const emptyGeojson = {
  type: "FeatureCollection",
  features: [],
};

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [103.849, 1.33627],
  zoom: 17,
});

map.on("load", () => {
  // map.addSource("data", {
  //   type: "geojson",
  //   data, // from ./data.js
  // });
  // map.addSource("data4arrow", {
  //   type: "geojson",
  //   data: addBearing(data4arrow), // from ./data.js
  // });
  map
    .addSource("osm-node-source", {
      type: "geojson",
      data: emptyGeojson,
    })
    .addLayer({
      id: "osm-node-circle-layer",
      type: "circle",
      source: "osm-node-source",
    })
    .addLayer({
      id: "osm-node-line-layer",
      type: "line",
      source: "osm-node-source",
    });

  // map.addLayer({
  //   id: "nodes-layer",
  //   type: "symbol",
  //   source: "data",
  //   layout: {
  //     "icon-image": "rocket-15",
  //   },
  // });

  // map.addLayer({
  //   id: "ways-layer",
  //   type: "line",
  //   source: "data",
  // });

  // map.addLayer({
  //   id: "symbols",
  //   type: "symbol",
  //   source: "data4arrow",
  //   layout: {
  //     "icon-allow-overlap": true,
  //     "symbol-placement": "line",
  //     "symbol-spacing": 1, // default 250px
  //     "icon-image": "rocket-15",
  //     "icon-rotate": ["get", "rotate"],
  //   },
  //   paint: {},
  // });
});

const handleMapChange = () => {
  console.log("handleMapChange", map.getCenter(), map.getBounds());

  const bounds = map.getBounds();
  // Overpass QL: https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide
  // const ql = `data=[out:json];node(${bounds.getSouthWest().lat},${
  //   bounds.getSouthWest().lng
  // },${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});out;`;
  // const ql = `data=[out:json];way[highway](${bounds.getSouthWest().lat},${
  //   bounds.getSouthWest().lng
  // },${bounds.getNorthEast().lat},${bounds.getNorthEast().lng});node(w);out;`;
  const ql = `data=[out:json];
  (
    way[highway](${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${
    bounds.getNorthEast().lat
  },${bounds.getNorthEast().lng});node(w);
  );
  out;`;

  console.log("loading...");
  fetch(`http://overpass-api.de/api/interpreter?${ql}`)
    .then(function (response) {
      console.log("loaded.");
      return response.json();
    })
    .then(function (data) {
      const geojson = osmtogeojson(data);
      console.log(data, geojson);
      map.getSource("osm-node-source").setData(geojson);
    })
    .catch(function () {
      console.log("Booo");
    });
};

map.on("zoomend", handleMapChange);
map.on("dragend", handleMapChange);
