// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';
import _ from 'lodash';

// Simple example of a React "dumb" component
export default class PostForm extends React.Component {
    static propTypes = {
        group_id: PropTypes.string,
        user_id: PropTypes.string,
        onSubmit: PropTypes.func
    };

    state ={
        post:''
    };

    constructor(props, context) {
        super(props, context);

        _.bindAll(this, 'handleSubmit');

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.post);
        console.log(this.state.post)
    };

    render() {
        return (
            <div>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input type="text" ref="message" placeholder="Enter your message"
                           value={this.state.post}
                           onChange={(event) => {
                                 this.setState({post: event.target.value});
                            }
                    }/>
                    <button className="btn" onClick={this.handleSubmit}>Send</button>
                </form>
            </div>
        );
    }
}
