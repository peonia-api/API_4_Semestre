import axios from "axios"

export const emailPatch = async (url:any, email:string, antes:string) => {
   await axios.patch(url, {email: email, antes: antes})
}