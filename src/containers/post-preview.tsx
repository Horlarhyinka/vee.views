import React, { useEffect, useState } from "react";
import PostCard from "../components/post-card";
import { app_socket_type, post_type } from "../services/socket";
import {getHandleLike} from "../utils/funcs"
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "../utils/token";
import authRequest from "../utils/auth-request";
import AppHead from "../components/app-head";
import "./styles/post-preview.css"

interface props{
    socket: app_socket_type
}


interface priv_post_type extends post_type{
    replies: post_type[]
}

const API_BASE_URL = process.env.REACT_APP_API_URL

const PostPreview = (props: props) =>{
    const [post, setPost] = useState<post_type>()
    const [replies, setReplies] = useState<post_type[]>()
    const [errMessage, setErrMessage] = useState("error occured")
    const [likes, setLikes] = useState<string[]>([])

    const {postId} = useParams()

    const handleLike = getHandleLike(props.socket)

    useEffect(()=>{
        authRequest(()=>axios.get(API_BASE_URL + "/posts/" + postId, {
            headers:{Authorization: `Bearer ${getToken()}`} }))
            .then(res=>{
                const data = res.data.data as priv_post_type
                setPost(data)
                setLikes(data.likes)
                setReplies(data.replies)
                console.log(replies)
            }).catch(err=>{
                const message = err.response?.data?.message
                console.log(err)
                setErrMessage(message)
            })
        },[postId])

        props.socket.off("like").on("like",(data)=>{ 
            if(String(data.postId) === String(post?._id)){
            if(likes.includes(data.userId)){
                setLikes([...likes].filter(l=>String(l)!== String(data.userId)))
            }else{
                setLikes([...likes, String(data.userId)])
            }
            }else{
                setReplies(replies?.map(post=>{
                    const pId = String(data.postId)
                    const uId = String(data.userId)
                    if(String(post._id)===pId){
                        if(post.likes.includes(uId)){
                            post.likes = post.likes.filter(l=>String(l)!==uId)
                        }else{
                            post.likes.push(uId)
                        }
                    }
                    return post
                }))
            }
        })


    return <>
    <AppHead />
    {!post?<p>{errMessage}</p>:<div className="post-preview">
    <div className="main">
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
        />
    </div>
    <div className="replies">
    {
        replies?.map(reply=><PostCard 
        id={String((reply! as post_type)._id)}
        postedBy={(reply! as post_type).postedBy} 
        body={(reply! as post_type).body} 
        file={(reply! as post_type).file} 
        postedAt={(reply! as post_type).createdAt} 
        key={(reply! as post_type)._id} 
        comments={(reply! as post_type).comments}
        likes={(reply! as post_type).likes}
        handleLike={handleLike}
        />
        )
    }
    </div>

</div>}</>
}

export default PostPreview