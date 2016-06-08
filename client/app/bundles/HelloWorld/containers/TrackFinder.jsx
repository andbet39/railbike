import React, { PropTypes } from 'react';
import _ from 'lodash';
import {GoogleMapLoader, GoogleMap, Marker,Polyline} from "react-google-maps";
import axios from 'axios';

// Simple example of a React "smart" component
export default class TrackFinder extends React.Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired, // this is passed from the Rails view
  };

  constructor(props, context) {
    super(props, context);

     this.state = { current_user: this.props.current_user,markers:[] };

    _.bindAll(this, 'handleBoundsChanged');
    _.bindAll(this, 'handleCenterChanged');
    _.bindAll(this, 'search');

  }


  handleBoundsChanged(){

  }

  handleCenterChanged(){
    console.log("Center Changed")
  }

  search(){

    this.setState(
        {markers:[]}
    );
    console.log("Bound Changed");
    const ne_lat=this.state.map.getBounds().getNorthEast().lat();
    const ne_lng=this.state.map.getBounds().getNorthEast().lng();
    const sw_lat=this.state.map.getBounds().getSouthWest().lat();
    const sw_lng=this.state.map.getBounds().getSouthWest().lng();

    axios.get('/mytrack/findinbound?ne_lat='+ne_lat+'&ne_lng='+ne_lng+'&sw_lat='+sw_lat+'&sw_lng='+sw_lng)
        .then((response)=>{
          console.log(response);
          this.setState(
              {
                tracks:response.data
              });

          this.state.tracks.forEach((trk)=>{
            const mrk = { position:{lat:trk.start_lat,lng:trk.start_lng},
                          key:trk.id,
                          defaultAnimation: 2};

            this.setState({
              markers:[...this.state.markers,mrk]
            });
          });
        })
  }

  handleMarkerclick(index,event){
    console.log(index);

    const trk_id = this.state.markers[index].key;
    axios.get('/mytrack/'+trk_id)
        .then((response)=>{
          console.log(response);
          const points = response.data.points;

          let path=[];

          points.forEach((p)=>{
            const pt={lat:p.latitude,lng:p.longitude};
            path.push(pt);
          });

          this.setState({
            currentPath:path
          })

        });
  }

  render() {
    const path=this.state.currentPath

    return (
      <div style={{height:"500px"}}>
        <button onClick={this.search}>Search</button>
        <section style={{height: "100%"}}>
          <GoogleMapLoader containerElement={<div style={{height: "100%"}} />}
              googleMapElement={
                  <GoogleMap
                    ref={(_map) => {
                      this.state.map = _map
                    }
                    }
                    defaultZoom={3}
                    defaultCenter={{ lat: 42.363882, lng: 12.044922 }}
                    onBoundsChanged={this.handleBoundsChanged}
                    onCenterChanged={this.handleCenterChanged}
                  >

                  {this.state.markers.map((marker, index) => {
                      return (
                        <Marker
                          {...marker}
                          onClick={this.handleMarkerclick.bind(this, index)}
                         />
                      );
                  })}

                  <Polyline path={path}></Polyline>
                  </GoogleMap>
              }
          />
        </section>
      </div>
    );
  }
}
