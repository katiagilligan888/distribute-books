import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
  Markers
} from "react-simple-maps";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

class GiverMap extends Component {
  constructor(props) {
    super(props);
  }

  getGiversArray = givers => {
    const coordinates = givers
      .filter(giver => {
        return giver.lat || giver.latitude;
      })
      .map(giver => {
        if (giver.lat) {
          return { coordinates: [giver.long, giver.lat] };
        } else if (giver.latitude) {
          return { coordinates: [giver.longitude, giver.latitude] };
        }
      });
    return coordinates;
  };

  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11, 0, 0]
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup>
            <Geographies geography="/static/world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          hover: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                        }}
                      />
                    )
                )
              }
            </Geographies>
            <Markers>
              {this.getGiversArray(this.props.givers).map((marker, i) => {
                return (
                  <Marker marker={marker}>
                    <circle cx={0} cy={0} r={5} />
                  </Marker>
                );
              })}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default GiverMap;
