import axios from "axios"

export const emailPatch = async (url:any, email:string, antes:string) => {
   await axios.patch(url, {email: email, antes: antes})
}

export const taskBody = async (data: any) => {
   console.log(data);
   
   const list:any = []
   data.map((res:any) => {
      if(res.call.callType === "hotfix"){
         list.push({
            Id: res.call.id,
            Status: res.call.callStatus,
            Title: res.call.callTitle, 
            Priority: res.call.callPriority, 
            Summary: res.call.callDescription, 
            type: res.call.callType,
            color: "#9e1208" 
         })
      }else{
         list.push({
            Id: res.call.id, 
            Status: res.call.callStatus, 
            Title: res.call.callTitle, 
            Priority: res.call.callPriority, 
            Summary: res.call.callDescription, 
            type: res.call.callType,
            color: "#148eba" 
         });
      }
   })
   return list;
}