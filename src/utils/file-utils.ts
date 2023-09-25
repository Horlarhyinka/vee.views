import {fromImage, fromVideo} from "imtool"

import {} from "react-thumbnail-generator"

export const toBase64 = (file: File):Promise<string> =>{
    return new Promise((resolve)=>{
    const reader = new FileReader()

    file && reader.readAsDataURL(file)
    reader.onloadend = () =>{
        if(reader.error){
            console.log({err:reader.error})
            return;
        }
        resolve(reader.result as string)
    }
    })
}

export const generateThumbnail = async(opt:{url: string, type: string}) =>{
    const tool = await fromImage(opt.url)
    if(opt.type.startsWith("image"))return await tool.thumbnail(200,true).toDataURL()
    if(opt.type.startsWith("video"))return await tool.thumbnail(200, true).toDataURL()
}