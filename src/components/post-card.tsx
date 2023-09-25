import React from "react";
import "./styles/post-card.css"
import { app_socket_type, file_type, post_input_type, profile_int } from "../services/socket";
import { Icon } from '@iconify/react';
import { getAuthCredntials } from "../utils/token";
import ProfileCardMini from "./profile-card-mini"

interface props{
    postedBy: profile_int
    body: string
    file?: file_type
    postedAt: string | number
    comments: string[]
    likes: string[]
    handleLike: (e: React.MouseEvent<HTMLDivElement>,postId: string)=>void
    // handleComment: (e: React.MouseEvent<HTMLDivElement>,postId: string, comment: post_input_type)=>void
    id: string
}
interface state{
    liked: boolean
    commented: boolean
    retweeted: boolean
}

const API_BASE_URL = process.env.REACT_APP_API_URL

class PostCard extends React.Component<props, state>{
    state = {
        liked: false,
        commented: false,
        retweeted: false
    }

    componentDidMount(): void {
        const userId = getAuthCredntials().user._id
        if(this.props.likes.includes(String(userId))){
            this.setState({liked: true})
        }
        if(this.props.comments.includes(String(userId))){
            this.setState({commented: true})
        }
    }

    executeLike = (e: React.MouseEvent<HTMLDivElement>,postId: string) =>{
        this.state.liked?
        this.setState({liked:false}):
        this.setState({liked: true})
        this.props.handleLike(e,postId)
    }

    executeComment= () =>{

    }

    render(){
        return <div className="post-card">
            {/* <a href={`${API_BASE_URL}/users/${this.props.postedBy._id}`} className="profile">
                <img src={this.props.postedBy.avatar} alt="" className="avatar" />
                <p className="username">{this.props.postedBy.username}</p>
            </a> */}
            <ProfileCardMini user={this.props.postedBy} />
            <a href={`/posts/${this.props.id}`} >
                <p className="body">{this.props.body}</p>
                {this.props.file && <img src={this.props.file.thumbnail} />}
                <aside className="post-time">{this.props.postedAt}</aside>
            </a>
                <div className="actions">
                    <div className="action">
                        <span >{this.props.comments.length} comments</span>
                        <a href={`/posts/${this.props.id}/comment`}  >
                        <Icon className={`icn ${this.state.commented?"active":""}`} icon="ant-design:comment-outlined" />
                        </a>
                    </div>
                    <div onClick={(e)=>this.executeLike(e,this.props.id)} className="action">
                        <span >
                            {this.props.likes.length} likes</span>
                        {
                            !this.state.liked?
                            <Icon className="icn" icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love" color="gray" />:
                            <Icon className="icn" icon="flat-color-icons:like" color="gray" />
                        }
                    </div>
                </div>
        </div>
    }
}

export default PostCard;