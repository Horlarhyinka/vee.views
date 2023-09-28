import React, { useEffect, useState } from "react";
import { file_type, profile_int } from "../services/socket";
import default_img from "../public/default_img.png";
import { Icon } from '@iconify/react';
import AppHead from "../components/app-head";
import "./styles/profile.css";
import axios from "axios";
import { getAuthCredntials, getToken } from "../utils/token";
import authRequest from "../utils/auth-request";
import { toBase64, generateThumbnail } from "../utils/file-utils";
import { usernameRegex } from "../utils/regex";


interface props{
    editable?: boolean
}

const API_URL = process.env.REACT_APP_API_URL

interface res_int {
    _id: string, email: string, username: string, about: string, avatar: string
}

const Profile = (props: props) =>{
    const [profile, setProfile] = useState<res_int>()
    const [disableFields, setDisableFields] = useState<boolean>(true)
    useEffect(()=>{
        authRequest(()=>axios.get(API_URL + "/users/" + getAuthCredntials().user._id, {
            headers: {Authorization: `Bearer ${getToken()}`}
        })).then(res=>{
            const data = res.data.data as res_int
            setProfile({...data})
            usernameRef.current && (data.username && (usernameRef.current!.value = data.username))
           aboutRef.current && ( data.about && (aboutRef.current!.value = data.about))

        })
    },[])
    const usernameRef = React.createRef() as React.RefObject<HTMLInputElement>
    const aboutRef = React.createRef() as React.RefObject<HTMLInputElement>

    const [imageFile, setImageFile] = useState<file_type>()

    const handleSubmit = () =>{
        const update:{username?: string, about?: string, avatar?: string} = {}
        const currUsername = usernameRef.current!.value
        if(currUsername && currUsername !== profile?.username){
            if(!usernameRegex.test(currUsername)){
                alert("invalid username")
                return;
            }
            update.username = currUsername
        }
        const currAbout = aboutRef.current!.value
        if(currAbout && currUsername !== profile?.about){
            update.about = currAbout
        }
        if(imageFile){
            update.avatar = imageFile.url
        }
        if(!Object.values(update).length)return;
        authRequest(()=>axios.put(API_URL+"/users/me",update, {headers:{
            Authorization: `Bearer ${getToken()}`
        }})).then(res=>{
            toggleEdit()
        })
    }

    const handleFile = async(e: React.ChangeEvent<HTMLInputElement>) =>{
        const target = e.target.files![0]
        if(!target)return;
        if(!(target instanceof Blob))return;
            const {name, size, type} = target
            if(!type.startsWith("image")){
                alert(`${type.slice(type.lastIndexOf("/")+1, type.length)} is not supported `)
                return;
            }
            if(size > 20 * 1040 * 1000){ //if file is greater than 20mb show error message and ignore
                alert(`file ${name} is too large`)
                return;
            }
        let url = await toBase64(target)
        url = (await generateThumbnail({url, type})) as string
        const file: file_type = {url, name, size}
            setImageFile(file)
    }

    const toggleEdit = () =>disableFields?setDisableFields(false):setDisableFields(true)

    return <div className="profile-page">
        <AppHead/>
        {props.editable && (disableFields?
        <div onClick={toggleEdit} className="edit-btn">
            <Icon className="icn edit" icon="mdi:edit" />
            <p>Edit</p>
        </div>:
        <div onClick={handleSubmit} className="edit-btn">
            <Icon className="icn" icon="game-icons:check-mark" width="22" />
            <p>Done</p>
        </div>)}
        <div  className="img-wrapper">
            <img src={imageFile?imageFile.url:!profile?.avatar?default_img: profile.avatar} alt="avatar" />
            {props.editable && <div>
                <input onChange={(e)=>handleFile(e)} type="file" />
                <Icon className="icn" icon="fluent:camera-20-regular" />
                </div>}
        </div>
        <p className="email">{profile?.email}</p>
        <div className="section">
        <Icon className="icn" icon="iconoir:profile-circle" />
        <div className="main">
            <label>Username</label>
            <input 
            className="body" 
            type="text" 
            ref={usernameRef}
            disabled={disableFields}
            placeholder={profile?.username?"":props.editable?"*enter a name":""}
            />
        </div>
        </div>
       {(props.editable || profile?.about) && <div className="section">
        <Icon className="icn" icon="mdi:about-circle-outline" />
        <div className="main">
            <label>About</label>
            <input className="body" 
            type="text" 
            disabled={disableFields}
            ref={aboutRef}
            placeholder={profile?.about?"":props.editable?"*describe yourself":""} />
        </div>
        </div>}
        {/* <div className="section">
        <Icon className="icn" icon="solar:phone-outline" />
        <div className="main">
            <label>Telephone</label>
            <input 
            className="body" 
            type="text" 
            disabled={disableFields}
            value={profile?.username?profile.username: ""} 
            placeholder={profile?.username?"":props.editable?"*enter your telephone no.":""}
            />

        </div>
        </div> */}
        
    </div>
}

export default Profile;

