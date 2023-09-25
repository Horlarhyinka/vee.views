import React, { useEffect, useState } from "react";
import ProfileCardMini from "../components/profile-card-mini";
import { app_socket_type, post_input_type, post_type } from "../services/socket";
import PostCard from "../components/post-card";
import axios from "axios";
import { getToken } from "../utils/token";
import authRequest from "../utils/auth-request";
import { useParams } from "react-router-dom";
import NewPost from "./new-post";
import AppHead from "../components/app-head";
import { getHandleLike } from "../utils/funcs";
import "./styles/comment-page.css";

const API_BASE_URL = process.env.REACT_APP_API_URL


interface props{
    socket: app_socket_type
}

interface state{
    post?: post_type
}

const CommentPage = (props:props) =>{
    const [post,setPost] = useState<post_type>()
    const [errMessage, setErrMessage] = useState()
    const [likes, setLikes] = useState<string[]>([])
    const {postId} = useParams()

    const handleLike = getHandleLike(props.socket)

    useEffect(()=>{
        authRequest(()=>axios.get(API_BASE_URL+"/posts/"+postId, {headers:{
            Authorization: `Bearer ${getToken()}`
        }})).then(res=>{
            const data = res.data.data as post_type
            setLikes(data.likes)
            setPost(data)
        }).catch(err=>{
            const message = err.response?.data?.message
            setErrMessage(message)
        })
    },[])

    props.socket.off("like").on("like",(data)=>{  
        if(likes.includes(data.userId)){
            setLikes([...likes].filter(l=>String(l)!== String(data.userId)))

        }else{
            setLikes([...likes, String(data.userId)])
        }
    })

        return <div className="comment-page">
            <AppHead />
            {!post?<p>{errMessage? errMessage: "failed to fetch post"} </p>:
            <PostCard 
            id={String((post! as post_type)._id)}
            postedBy={(post! as post_type).postedBy} 
            body={(post! as post_type).body} 
            file={(post! as post_type).file} 
            postedAt={(post! as post_type).createdAt} 
            key={(post! as post_type)._id} 
            comments={(post! as post_type).comments}
            likes={likes}
            handleLike={handleLike}
            // handleComment={handleComment}
            />}
            <NewPost socket={props.socket} replyTo={post?.postedBy.username} />
        </div>
    }

export default CommentPage