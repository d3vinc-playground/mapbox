const eventNames = [
  // Lifecycle events
  // https://docs.mapbox.com/mapbox-gl-js/api/map/#events-lifecycle
  "load",
  "render",
  "idel",
  "error",
  "webglcontextlost",
  "webglcontextrestored",
  // Data loading events
  // https://docs.mapbox.com/mapbox-gl-js/api/map/#events-data-loading
  "data",
  "styledata",
  "sourcedata",
  "dataloading",
  "styledataloading",
  "sourcedataloading",
  "styleimagemissing",
];

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [103.82364, 1.26396],
  zoom: 16,
});

console.log("Event order:");

eventNames.forEach((name) => {
  map.on(name, () => {
    console.log(name);
  });
});
