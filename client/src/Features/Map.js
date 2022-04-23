import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {        
    width: "800px",
    height: "450px",
    marginLeft: "auto",
    marginRight: "auto"
};

export default class MapContainer extends Component {

    render() {
        return (
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={this.props.defaultCoordinates}
                fetchDetails={true}
                >
                {
                    this.props.myCoordinates.map(item => {
                        return (
                        <Marker key={item.name} position={item.location}/>
                        )
                    })
                }
                </GoogleMap>
        )
    }
}