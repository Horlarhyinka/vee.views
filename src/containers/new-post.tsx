import React from "react";
import "./styles/new-post.css"
import { app_socket_type, file_type, post_input_type } from "../services/socket";
import { generateThumbnail, toBase64 } from "../utils/file-utils";
import { useParams } from "react-router-dom";

interface props {
    socket: app_socket_type
    replyTo?: string
}

interface state{
    file?: file_type
}

const API_BASE_URL = process.env.REACT_APP_API_URL

const NewPost = (props: props)=>{
    const [file, setFile] = React.useState<file_type>()
    const fileRef = React.createRef() as React.RefObject<HTMLInputElement>
    const bodyRef = React.createRef() as React.RefObject<HTMLTextAreaElement>
    const postId = useParams()["postId"]
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const body = String(bodyRef.current!.value)
        if(!body.trim().length && !file)return
        const data: post_input_type = {body}
        file &&( data.file = file)
        postId && (data.replyTo = postId)
        props.socket.emit("post", data)
        fileRef.current!.files = null
        bodyRef.current!.value = ""
        setFile(undefined)
        window.location.assign("/")
    }

    const handleFileSelect = async(e: React.ChangeEvent<HTMLInputElement>) =>{
        const target = e.target.files![0]
        if(!target)return;
        if(!(target instanceof Blob))return;
            const {name, size, type} = target
            if(!type.startsWith("image") && !type.startsWith("video")){
                alert(`${type.slice(type.lastIndexOf("/")+1, type.length)} is not supported `)
                return;
            }
            if(size > 20 * 1040 * 1000){ //if file is greater than 20mb show error message and ignore
                alert(`file ${name} is too large`)
                return;
            }
        const url = await toBase64(target)
        const thumbnail = await generateThumbnail({url, type})
        const file: file_type = {url, thumbnail, name, size}
            setFile(file)
    }

        return <div className="new-post">
            {props.replyTo && <p className="reply-to">replying to <span>@{props.replyTo}</span> post</p>}
            <form>
                {file && <img src={(file as file_type).thumbnail} alt={(file as file_type).name} className="file-preview" />}
                <input type="file"
                 onChange={(e)=>handleFileSelect(e)} 
                 ref={fileRef} />
                <textarea ref={bodyRef} rows={5} >
                </textarea>
                <br></br>
                <button onClick={(e)=>handleSubmit(e)} >post</button>
            </form>
        </div>
    
}

export default NewPost