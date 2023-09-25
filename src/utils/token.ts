const tokenName = "VEE"


export const setToken = (token: string)=>{
    const str = JSON.stringify(token)
    localStorage.setItem(tokenName, str)
}

export const deleteToken = () =>{
    localStorage.removeItem(tokenName)
}

export const setAuthCredentials = (data:{token: string, user: {email: string, _id: string}})=>{
    const stringified = JSON.stringify(data)
    localStorage.setItem(tokenName, stringified)
}

export const getAuthCredntials = ()=>{
    const item = localStorage.getItem(tokenName)
    if(!item)return false
    const res = JSON.parse(item)
    return res
}
export const getToken = () =>{
    const {token} = getAuthCredntials()
    return token
}