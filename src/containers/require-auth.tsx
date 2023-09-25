import React, { ReactNode, useEffect, useState } from "react";
import Login from "./login";
import { getToken } from "../utils/token";
 
const RequireAuth = (params: {NodeElement: ReactNode}) =>{
const initialToken = getToken()
const [token, setToken] = useState(initialToken)
useEffect(()=>{
setToken(initialToken)

},[initialToken])
    return <>{!token? <Login />: params.NodeElement}</>
}

export default RequireAuth;