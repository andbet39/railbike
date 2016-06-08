import React, { PropTypes   } from 'react';
import update from 'react-addons-update'
import moment from 'moment';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import UserAvatarView from '../components/UserAvatarView';

export default class CreateEventView extends React.Component {
    static propTypes = {
        destination: PropTypes.object.isRequired,
        user: PropTypes.object,
        current_user :PropTypes.object
    };


    constructor(props, context) {
        super(props, context);
        this.state={
            partecipants:[],
            track_info:{}
        }
    }

    componentDidMount(){
        axios.get('/partecipation/getbyevent/'+this.props.destination.id).then((response)=>{
            this.setState({
                partecipants:response.data
            })
        });
        this.setState({
            partecipants:[]
        });

        axios.get('/tracks/'+this.props.destination.track_id+'.json').then((response)=>{
            this.setState({
                track_info:response.data
            })
        });
        this.setState({
            track_info:{}
        })
    }

    handleSubmit(content){

    }
    partecipate(){

        const {destination,current_user} = this.props;

        axios.post('/partecipation/partecipate',{
            event_id:destination.id,
            user_id: current_user.id
        })
            .then((response)=>{
                console.log(response);
                this.setState({
                    partecipants:[...this.state.partecipants,response.data]
                })

            })
            .catch((response)=>{
                console.log(response)
            });
    }

    remove(){
        const {destination,current_user} = this.props;
        axios.post('/partecipation/remove',{
            event_id:destination.id,
            user_id: current_user.id
        })
            .then((response)=>{
                let idx=-1;
                this.state.partecipants.forEach((p,i)=>{
                    if(p.event_id === destination.id && p.user_id === current_user.id){
                        idx= i;
                    }
                });
                this.setState({
                    partecipants:update(this.state.partecipants, {$splice: [[idx, 1]]})
                });
            })
            .catch((response)=>{
                console.log(response)
            });
    }

    render(){
        const {destination,user} = this.props;
        const timeago = moment(destination.created_at).fromNow();

        let btn_partecipate= <button onClick= {()=>this.partecipate()}>Join </button>;

        const part_list = this.state.partecipants.map((p)=>{
            if (p.user.id == this.props.current_user.id){
                btn_partecipate = <button onClick= {()=>this.remove()}>Remove</button>;
            }
            return <p><UserAvatarView user={p.user}></UserAvatarView></p>
        });


        return (
                <article className="panel panel-primary">
                    <div className="panel-heading icon">
                        <i className="glyphicon glyphicon-plus"></i>
                    </div>

                    <div className="panel-heading">
                        <h2 className="panel-title">New event <a href={'/myevents/show/'+ destination.id}>{destination.name}</a></h2>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <p>{destination.description}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p><i className="glyphicon glyphicon-upload"></i> Ascention: {this.state.track_info.elevation}</p>
                                <p><i className="glyphicon glyphicon-download"></i> Descention: {this.state.track_info.descent}</p>
                            </div>
                            <div className="col-md-6">
                                <p><i className="glyphicon glyphicon-resize-horizontal"></i> Distance: {this.state.track_info.distance}</p>
                                <span data-tip data-for={'tooltip'+destination.id} > <i className="glyphicon glyphicon-user"></i> Partecipants  : {this.state.partecipants?this.state.partecipants.length:0}</span>
                            </div>
                        </div>

                        <ReactTooltip id={'tooltip'+destination.id}  place="bottom" type="light" effect="float">
                                {part_list}
                        </ReactTooltip >
                    </div>



                    <div className="panel-footer">
                        {btn_partecipate} <small>Created by <UserAvatarView user={user}></UserAvatarView> {timeago}</small>
                    </div>
                </article>
        );
    }
}
