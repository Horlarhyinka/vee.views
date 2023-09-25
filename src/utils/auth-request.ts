import { deleteToken } from "./token"

export default async(fn: Function) =>{
    try {
        const prom = fn()
        return prom;
    } catch (ex: any) {
        if(ex.status === 401){
            deleteToken()
            window.location.reload()
        }
    }
}