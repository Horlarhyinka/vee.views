import React from "react"
import ThumbnailGenerator from "react-thumbnail-generator"

export default (prop: {url: string}) =>{
    return <>
    <ThumbnailGenerator 
    buttonIcon={<img src={prop.url} style={{position: "relative", }} alt={"media"} />}
    iconSize="medium"
     />
    </>
}