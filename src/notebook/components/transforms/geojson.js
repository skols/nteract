import React, { PropTypes } from 'react';

const L = require('leaflet');

L.Icon.Default.imagePath = '../node_modules/leaflet/dist/images/';

const MIMETYPE = 'application/vnd.geo+json';

export class GeoJSONTransform extends React.Component {
  static shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const map = L.map(this.el);
    // TODO: Determine a strategy for picking tiles
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      id: 'mapbox.light',
    }).addTo(map);
    try {
      const geoJSON = this.props.data.toJS();
      const geoJSONLayer = L.geoJson(geoJSON).addTo(map);
      map.fitBounds(geoJSONLayer.getBounds());
    } catch (err) {
      console.error(err);
    }
  }


  render() {
    return (
      <div>
        <link rel="stylesheet" href="../node_modules/leaflet/dist/leaflet.css" />
        <div
          ref={(el) => { this.el = el; }}
          style={{ height: '600px', width: '100%' }}
        />
      </div>
    );
  }
}

GeoJSONTransform.propTypes = {
  data: PropTypes.object, // eslint-disable-line
                          // it _is_ a generic object after all
};

GeoJSONTransform.MIMETYPE = MIMETYPE;

export default GeoJSONTransform;
