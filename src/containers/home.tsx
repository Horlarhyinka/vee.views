import React, { useEffect } from "react";
import"./styles/home.css";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import PostCard from "../components/post-card"
import { app_socket_type, post_type } from "../services/socket";
import axios from "axios";
import { getToken } from "../utils/token";
import { commentToPost, likePost, setPosts } from "./store/post";
import AppHead from "../components/app-head";
import { Icon } from '@iconify/react';
import authRequest from "../utils/auth-request";

type state = {
    
}
type props = {
    socket: app_socket_type
}

const API_BASE_URL = process.env.REACT_APP_API_URL


const Home = (props: props) => {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        authRequest(()=>axios.get(API_BASE_URL + "/posts", {headers:{
            "Authorization": "Bearer " + getToken()
        }})).then(res=>{
            const posts = res.data.data as post_type[]
            dispatch(setPosts(posts))
        })
        .catch(ex=>{
            console.log(ex)
        })
    },[])
    const searchRef = React.createRef() as React.RefObject<HTMLInputElement>
    const handleLike = (e: React.MouseEvent<HTMLDivElement>, postId: string):void=>{
        props.socket.emit("like",{postId})
    }

    const handleSearch = ()=>{
        const currText = String(searchRef.current!.value)
        authRequest(()=>axios.get(API_BASE_URL + "/posts?q=" + currText, {headers:{
            "Authorization": "Bearer " + getToken()
        }}))
            .then(res=>{
                const posts = res.data.data as post_type[]
                dispatch(setPosts(posts))
            })
            .catch(ex=>{
                console.log(ex)
            })
    }

    props.socket.off("like").on("like",(data)=>{  
        dispatch(likePost({postId:data.postId, userId: data.userId}))
    })

    props.socket.on("comment", (data)=>{
        dispatch(commentToPost({postId: data.postId, userId: data.userId}))
    })

        return (<div className="home">
            <AppHead searchRef={searchRef} handleSearch={handleSearch} hasSearch={true} />
                    {
                        useAppSelector(state=>state.post.posts)
                        .map(post=><PostCard 
                            id={String(post._id)}
                            postedBy={post.postedBy} 
                            body={post.body} 
                            file={post.file} 
                            postedAt={post.createdAt} 
                            key={post._id} 
                            comments={post.comments}
                            likes={post.likes}
                            handleLike={handleLike}
                            />)
                    }
                    <a href="/new" className="new-post-btn">
                    <Icon className="icn" icon="system-uicons:write" />  
                </a>
                </div>)

}

export default Home;