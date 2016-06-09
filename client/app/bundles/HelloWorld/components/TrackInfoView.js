/**
 * Created by andreaterzani on 09/06/16.
 */


import React, { PropTypes } from 'react';
import InputRange from 'react-input-range';

import _ from 'lodash';

export default class TrackInfoView extends React.Component {
    static propTypes = {
        track: PropTypes.object,
        onClose:PropTypes.func
    };



    constructor(props, context) {
        super(props, context);
    }

    handleClose()
    {
        this.props.onClose();
    }

    render() {
        const {track} = this.props;
        return (
            <div>
                <h3>{track.name}</h3>
                <button className="btn btn-success" onClick={()=>this.handleClose()}>Reset</button>
            </div>

        );
    }
}
