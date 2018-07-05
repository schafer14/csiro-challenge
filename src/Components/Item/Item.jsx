import React from "react";
import { Panel, Col } from "react-bootstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => {
    let lat = parseFloat(props.gps.lat);
    let lng = parseFloat(props.gps.lng);
    return (
      <GoogleMap
        style={{ height: "200px !imporant" }}
        defaultZoom={8}
        defaultCenter={{ lat: lat, lng: lng }}
      >
        {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
      </GoogleMap>
    );
  })
);

const item = props => {
  const hoverClass = props.row ? "hover hover-right" : "hover hover-up";
  return (
    <Col md={props.row ? 12 : 4} onClick={props.click}>
      <Panel className={"pointer " + hoverClass}>
        <Panel.Heading>{props.name}</Panel.Heading>
        {props.row ? null : (
          <Panel.Body>
            <MyMapComponent
              gps={props.address.geo}
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8rCLGyCnPhMrRpQuJXRsKUAB2O7kvP14&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Panel.Body>
        )}

        <Panel.Footer>
          <div>Email: {props.email}</div>
          <div>Username: {props.username}</div>
          <div>Phone: {props.phone}</div>
          <div>Website: {props.website}</div>
          <div>Company: {props.company.name}</div>
        </Panel.Footer>
      </Panel>
    </Col>
  );
};

export default item;
