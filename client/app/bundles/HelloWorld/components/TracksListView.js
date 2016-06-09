/**
 * Created by andreaterzani on 09/06/16.
 */


import React, { PropTypes } from 'react';
import InputRange from 'react-input-range';

import _ from 'lodash';

export default class TracksListView extends React.Component {
    static propTypes = {
        tracks: PropTypes.array,
        onSelectTrack:PropTypes.func
    };



    constructor(props, context) {
        super(props, context);
    }

    handleSelect(id){
        console.log("selected" + id);
        this.props.onSelectTrack(id)

    }

    render() {
        const {tracks} = this.props;
        return (
            <ul className="list-group">
                {tracks.map((track)=> {
                        return <li className="list-group-item" key={track.id}>
                            <strong>{track.name}</strong>
                                 <button className="btn btn-xs btn-success pull-right" onClick={()=>this.handleSelect(track.id)} >Select</button>
                         </li>
                    })
                    }
            </ul>

        );
    }
}
