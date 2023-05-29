import axios from "axios"
import { useEffect } from "react"

export const emailPatch = async (url:any, email:string, antes:string) => {
   await axios.patch(url, {email: email, antes: antes})
}

export const taskBody = async (data: any) => {
   console.log(data);
   const list:any = []

   data.map((res:any) => {
      if(res.call.callType === "hotfix"){
         list.push({
            id: res.id,status: res.call.callStatus, 
            title: res.call.callTitle, 
            Priority: res.call.callPriority, 
            Summary: res.call.callDescription, 
            type: res.call.callType,
            color: "#9e1208" 
         })
      }else{
         list.push({
            id: res.id, 
            status: res.call.callStatus, 
            title: res.call.callTitle, 
            Priority: res.call.callPriority, 
            Summary: res.call.callDescription, 
            type: res.call.callType,
            color: "#148eba" 
         });
      }
   })
   return list;
}