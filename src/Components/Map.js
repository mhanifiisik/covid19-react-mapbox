import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { RiSkullLine } from "react-icons/ri";

const token = process.env.REACT_APP_MAPBOX_KEY;
const Map = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 17,
    longitude: 8,
    zoom: 2,
  });
  useEffect(() => {
    fetch(process.env.REACT_APP_COVID_API_URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <NavigationControl style={navControlStyle} />
        {data.map((data, index) => (
          <Marker
            latitude={data.countryInfo.lat}
            longitude={data.countryInfo.long}
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setSelected(data);
            }}
          >
            <RiSkullLine color="#9b2226" size={20} />
          </Marker>
        ))}
        {selected ? (
          <Popup
            latitude={selected.countryInfo.lat}
            longitude={selected.countryInfo.long}
            onClose={() => {
              setSelected(null);
            }}
          >
            <div className="popup-text">
              <div className="top-text">
                <div className="popup-left">
                  <h1>{selected.country}</h1>
                  <div className="left-description">
                    <p>{selected.continent}</p>
                    <p>Population: {selected.population}</p>
                  </div>
                </div>
                <div className="popup-right">
                  <img
                    src={selected.countryInfo.flag}
                    className="flag"
                    alt="country"
                  />
                </div>
              </div>

              <div className="bot-text">
                <p>
                  <span>Today Cases:</span>
                  {selected.todayCases}
                </p>
                <p>
                  <span>Today Recovered:</span>
                  {selected.todayRecovered}
                </p>
                <p>
                  <span>Today Deaths:</span>
                  {selected.todayDeaths}
                </p>
                <p>
                  <span>Active Cases:</span>
                  {selected.todayCases}
                </p>
                <p>
                  <span>Total Recovered:</span>
                  {selected.recovered}
                </p>
                <p>
                  <span>Total Deaths:</span>
                  {selected.deaths}
                </p>
                <p>
                  <span>Critical:</span>
                  {selected.recovered}
                </p>
                <p>
                  <span>Number of Tests:</span>
                  {selected.tests}
                </p>
              </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
