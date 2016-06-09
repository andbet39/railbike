import React, { PropTypes } from 'react';
import _ from 'lodash';
import {GoogleMapLoader, GoogleMap, Marker,Polyline} from "react-google-maps";
import axios from 'axios';
import SearchControl from '../components/SearchControl'
import TrackInfoView from '../components/TrackInfoView'
import TracksListView from '../components/TracksListView'


export default class TrackFinder extends React.Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired, // this is passed from the Rails view
  };

  constructor(props, context) {
    super(props, context);

     this.state = {
         current_user: this.props.current_user,
         markers: [],
         searchStr: '',
         last_bounds: {},
         selected_track: null,
         tracks:[]
     };

    _.bindAll(this, 'handleBoundsChanged');
    _.bindAll(this, 'handleCenterChanged');
    _.bindAll(this, 'search');


  }


  handleBoundsChanged(){
  }

  handleCenterChanged(){
  }

    resetBounds(){
        this.state.map.fitBounds(this.state.last_bounds);
        this.setState({
            selected_track:null
        })
    }

  search(event){

    this.setState(
        {markers:[]}
    );

      const ne_lat=this.state.map.getBounds().getNorthEast().lat();
      const ne_lng=this.state.map.getBounds().getNorthEast().lng();
      const sw_lat=this.state.map.getBounds().getSouthWest().lat();
      const sw_lng=this.state.map.getBounds().getSouthWest().lng();


      axios.get('/mytrack/find?ne_lat='+ne_lat+'&ne_lng='+ne_lng+'&sw_lat='+sw_lat+'&sw_lng='+sw_lng+this.state.searchStr)
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
        });
  }

  handleMarkerclick(index,event){
    console.log(index);

    this.setState({
        last_bounds:this.state.map.getBounds()
    });
    const trk_id = index;//this.state.markers[index].key;
    axios.get('/mytrack/'+trk_id)
        .then((response)=>{
          console.log(response);
          const points = response.data.points;

          let bounds = new google.maps.LatLngBounds();
          let path=[];

          points.forEach((p)=>{
            const pt={lat:p.latitude,lng:p.longitude};
            const myLatLng = new google.maps.LatLng({lat: p.latitude, lng: p.longitude});

            bounds.extend(myLatLng);

            path.push(pt);
          });

          this.setState({
            currentPath:path,
              selected_track:response.data
          });

          this.state.map.fitBounds(bounds);
        });
  }

    handleSearchParamChange(searchparam){

        const dist_min = searchparam.distance.min;
        const dist_max = searchparam.distance.max;
        const asc_max = searchparam.ascention.max;
        const asc_min = searchparam.ascention.min;
        const desc_min = searchparam.descention.min;
        const desc_max = searchparam.descention.max;

        const searchstr = '&dist_max='+dist_max+'&dist_min='+dist_min+'&asc_min='+asc_min+'&asc_max='+asc_max+'&desc_min='+desc_min+'&desc_max='+desc_max;

        this.setState({
            searchStr:searchstr
        });

        this.search();

    }

    handleTrackSelect(id){
        console.log(id);
        this.handleMarkerclick(id);
    }

  render() {
    const path=this.state.currentPath;
      let polyline='';
      let view_selected='';
      let tracks_list='';

      if(path && path.length ) {
           polyline = <Polyline path={path}></Polyline>
      }

      if(this.state.selected_track){
          view_selected=<TrackInfoView onClose={()=>this.resetBounds()} track={this.state.selected_track}></TrackInfoView>
      }
      if (this.state.tracks){
          tracks_list=<TracksListView onSelectTrack={(id)=>this.handleTrackSelect(id)} tracks={this.state.tracks}></TracksListView>
      }
      return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="row">
                            <SearchControl onSearchParamChange={(searchparam)=>this.handleSearchParamChange(searchparam)}></SearchControl>
                            <button className="btn btn-success btn-search" onClick={this.search}>Search</button>
                    </div>
                    <div className="row">
                        {view_selected}
                        {tracks_list}
                    </div>
                </div>
                <div className="col-md-7">
                    <div style={{height:"500px"}}>
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
                          onClick={this.handleMarkerclick.bind(this, marker.key)}
                         />
                      );
                  })}
                    {polyline}
                  </GoogleMap>
              }
                            />
                        </section>
                    </div>
                </div>
            </div>
        </div>

    );
  }
}
