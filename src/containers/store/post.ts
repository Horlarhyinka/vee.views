import { createSlice } from "@reduxjs/toolkit";
import { post_type } from "../../services/socket";

const initialState:{posts: post_type[]} = { posts: [] }

const postSlice = createSlice({
    name: "post",
    reducers:{
        setPosts: (state, param)=>{
            const posts = param.payload as post_type[]
            state.posts = posts
        } ,
        deletePost: (state, param)=>{
            const postId = param.payload as string
            state.posts = state.posts.filter(post=>String(post._id) !== String(postId))
        },
        pushPost: (state, param)=>{
            const post = param.payload as post_type
            state.posts = [...state.posts, post]
        },
        likePost: (state, param)=>{
            const {postId, userId} = param.payload as {postId: string, userId: string}
            const indx = state.posts.findIndex(post=>String(post._id)===String(postId))
            if(indx < 0)return
            if(state.posts[indx].likes.includes(userId)){//unlike if already liked
                state.posts[indx].likes = state.posts[indx].likes.filter(l=>String(l)!== String(userId))
            }else{
                state.posts[indx].likes.push(String(userId))
            }
        },
        commentToPost: (state, param)=>{
            const {postId, userId} = param.payload as {postId: string, userId: string}
            const target = state.posts.find(post=>String(post._id)===String(postId))
            if(!target)return;
            target.comments.push(String(userId))
        }
    },
    initialState
})

const {reducer, actions} = postSlice
export const {setPosts, pushPost, deletePost, likePost, commentToPost} = actions
export default reducer

