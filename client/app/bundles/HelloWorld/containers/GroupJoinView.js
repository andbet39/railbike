import React, { PropTypes } from 'react';

export default class GroupJoinView extends React.Component {
    static propTypes = {
        destination: PropTypes.object.isRequired,
        user: PropTypes.object,
        current_user : PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

    }

    componentDidMount(){
    }

    handleSubmit(content){

    }

    render(){
        const {destination,user} = this.props;
        return (
            <article className="panel panel-danger panel-outline">
                <div className="panel-heading icon">
                    <i className="glyphicon glyphicon-heart"></i>
                </div>
                <div className="panel-body">
                    <strong>{user.email}</strong> Joined this group.
                </div>
            </article>
        );
    }
}
