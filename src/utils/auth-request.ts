import { deleteToken } from "./token"

export default async(fn: ()=>Promise<any>) =>{
    // try {
    //     const prom = fn().catch(ex=>throw)
    //     return prom;
    // } catch (ex: any) {
    //     console.log("i am working...")
    //     if(ex.status === 401){
    //         console.log("this nigga ain =t auth")
    //         deleteToken()
    //         window.location.reload()
    //     }
    // }
    return fn()
    .then(r=>r)
    .catch(ex=>{
        if(ex.response.status === 401){
            deleteToken()
            window.location.reload()
        }
        return ex
    })

}