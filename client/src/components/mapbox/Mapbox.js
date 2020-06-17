import React, { Component } from 'react'
import * as mapboxgl from 'mapbox-gl'


export default class Mapbox extends Component {
  constructor(){
    super()
    this.mapRef = React.createRef();
  }
  componentDidMount(){
    const locations = JSON.parse(document.getElementById('map').dataset.locations)
    // 1. Draw Map
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: 
'pk.eyJ1IjoibXVyY2llZ2FsbyIsImEiOiJja2JqaWFtemEwbmF1MnJ0ZHJsNXFiOTByIn0.HCRDiCTZiILWMA7ZmzfYDQ',
      scrollZoom:false
    });

    //2. Set markers
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach(el => {
      new mapboxgl.Marker(
        <div/>
      )
      .setLngLat(el.coordinates)
      .addTo(this.map);

    // 3 Set PopUps
      new mapboxgl.Popup({offset:30})
      .setLngLat(el.coordinates)
      .setHTML(`<p>${el.description}</p>`)
      .addTo(this.map);
      // on current locations on map
      bounds.extend(el.coordinates)
    });

  this.map.fitBounds(bounds, {
    padding:{
      top: 200,
      bottom: 200,
      left: 200,
      right: 100
    }
  });
  }
  render() {
    return <>
      <div style={{width: "100%", height:"80vh"}} ref={this.mapRef}></div>
    </>
  }
}
