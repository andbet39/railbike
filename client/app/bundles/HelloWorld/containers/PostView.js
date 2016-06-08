/**
 * Created by Andrea on 05/06/2016.
 */
import React, { PropTypes } from 'react';
import PostForm from '../components/PostForm';
import axios from 'axios';


export default class PostView extends React.Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        user: PropTypes.object,
        group: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = { posts: this.props.posts };

    }


    componentDidMount(){
    }

    handleSubmit(content){
        console.log('PostView component');
        let post = { content:content , destination_id:this.props.group.id, destination_type:'Group',user_id:this.props.user.id};
        console.log(post);
        axios.post('/posts.json',post)
            .then((response)=>{
                console.log(response);

                this.setState({
                    posts:[...this.state.posts,response.data]
                });
            })
            .catch((response)=>{
                console.log(response)
            });

    }

    render(){
        return (
            <div>
                <h2>Group posts</h2>
                 <div>
                     {this.state.posts.map((post) =>{
                         return <div key={post.id}>{post.created_at} - {post.content}</div>;
                 })}
                 </div>
                <PostForm onSubmit={(post) => this.handleSubmit(post)}></PostForm>

            </div>
    );
    }
}
