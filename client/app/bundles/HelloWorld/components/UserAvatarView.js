/**
 * Created by Andrea on 07/06/2016.
 */
// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';
import _ from 'lodash';

// Simple example of a React "dumb" component
export default class UserAvatarView extends React.Component {
    static propTypes = {
        user: PropTypes.object,
    };

    state ={
        post:''
    };

    constructor(props, context) {
        super(props, context);
    }

   

    render() {
        const {user} = this.props;
        return (
            <span>
                <img className="avatar" src={'/system/users/avatars/000/000/00'+user.id+'/original/'+user.avatar_file_name}></img><span><strong>{user.email}</strong></span>
            </span>
        );
    }
}
