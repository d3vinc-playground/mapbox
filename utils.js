// add bearing to geojson
const addBearing = (data) => {
  return {
    ...data,
    features: data.features.map((feature) => {
      const ret = {
        ...feature,
      };
      var point1 = turf.point(ret.geometry.coordinates[0]);
      var point2 = turf.point(ret.geometry.coordinates[1]);
      var bearing = turf.bearing(point1, point2);
      ret.properties.rotate = bearing;
      return ret;
    }),
  };
};
