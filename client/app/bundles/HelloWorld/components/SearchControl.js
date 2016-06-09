

import React, { PropTypes } from 'react';
import InputRange from 'react-input-range';

import _ from 'lodash';

export default class SearchControl extends React.Component {
    static propTypes = {
        onSearchParamChange: PropTypes.func,
    };



    state ={
        searchparam:{},
        distanceValue:{min:0,max:200},
        elevationValue:{min:0,max:10000},
        descentValue:{min:0,max:10000}
    };

    constructor(props, context) {
        super(props, context);
        this.callParent = _.debounce(this.callParent,500);
    }

    handleDistanceChange(component,values){
        this.setState({
            distanceValue:values
        })
        this.callParent();

    }
    handleElevationChange(component,values){
        this.setState({
            elevationValue:values
        })
        this.callParent();

    }

    handleDescentChange(component,values){
        this.setState({
            descentValue:values
        })
        this.callParent();
    }

    callParent(){

        const searchparam={
            distance:this.state.distanceValue,
            ascention:this.state.elevationValue,
            descention:this.state.descentValue
        };
        console.log(searchparam);


        this.props.onSearchParamChange(searchparam);

    }

    componentDidMount(){
       // this.callParent();
    }


    render() {
        const {user} = this.props;
        return (
            <span>
                <form className="form">
                  <div className="form-group">
                          <label>Distance</label>
                          <InputRange
                              maxValue={200}
                              minValue={0}
                              value={this.state.distanceValue}
                              onChange={this.handleDistanceChange.bind(this)}
                          />
                  </div>
                  <div className="form-group">
                      <label >Ascention</label>

                 <InputRange
                     maxValue={10000}
                     minValue={0}
                     value={this.state.elevationValue}
                     onChange={this.handleElevationChange.bind(this)}
                 />
                  </div>
                  <div className="form-group">
                          <label for="exampleInputEmail1">Descention</label>
                 <InputRange
                     maxValue={10000}
                     minValue={0}
                     value={this.state.descentValue}
                     onChange={this.handleDescentChange.bind(this)}
                 />
                  </div>

                </form>
            </span>
        );
    }
}
