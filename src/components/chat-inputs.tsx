import React from "react";
import { Icon } from "@iconify/react";
import {toBase64} from "../utils/file-utils"

import "./styles/chat-inputs.css";
import { file_type } from "../services/socket";
import { generateThumbnail } from "../utils/file-utils";

interface props{
    emitMessage: (data: {body: string, file?: file_type})=>void
    
}

interface state{

}

export default class ChatInputs extends React.Component<props, state>{
    inputRef = React.createRef() as React.RefObject<HTMLInputElement>
    handleSend = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const inputVal = this.inputRef.current!.value
        if(!inputVal.length)return;
        this.props.emitMessage({body: String(inputVal)})
    }
    handleFileSend = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        // e.preventDefault()
        const files = e.target.files
        if(!files?.length)return;
        for(let i in files){
            const file = files[i]
            if(!(file instanceof Blob))continue;
            const {name, size, type} = file
            if(!type.startsWith("image") && !type.startsWith("video")){
                alert(`${type.slice(type.lastIndexOf("/")+1, type.length)} is not supported `)
                continue;
            }
            if(size > 20 * 1040 * 1000){ //if file is greater than 20mb show error message and ignore
                alert(`file ${name} is too large`)
                continue;
            }
            const url = await toBase64(file) 
            const thumbnail = await generateThumbnail({url: String(url), type})
            const fileObj = {url: thumbnail as string, size, format: type.slice(type.lastIndexOf("/"), type.length), name}
            const data = {file: fileObj, body: ""}
            this.props.emitMessage(data)
        }
    }
    render(){
        return <form className="chat-inputs" >
            <div className="file-select">
                <input multiple onChange={(e)=>this.handleFileSend(e)} type="file" />
            <Icon className="icn" icon="teenyicons:attach-outline" />
            </div>
            <div className="text-icn-input" >
                <input ref={this.inputRef} type="text" name="chat-text-input" placeholder="type here..." className="chat-text-input" />
                <div className="icn-input"></div>
            </div>
            <button onClick={(e)=>{
                this.handleSend(e)
                this.inputRef.current!.value = ""
                }} className="send-btn">
            <Icon icon="bi:send" className="icn" />
            </button >
        </form>
    }
}