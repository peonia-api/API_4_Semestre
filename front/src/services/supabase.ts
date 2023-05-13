
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://undvejpptbowpgysnwiw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZHZlanBwdGJvd3BneXNud2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxNDQ1OTEsImV4cCI6MTk5NDcyMDU5MX0.LQYO99TBVgPT6gFmI1GyPcxD3tp62fwqiA2JfvRBkPA'
export const supabase = createClient(supabaseUrl, supabaseKey as string)

const arquivosUploads = 'https://undvejpptbowpgysnwiw.supabase.co/storage/v1/object/public/uploads/'

export async function uploadFile(e: any) {
  //const filesS = e.target.files
  const filesS = e
  console.log(filesS.length);

  const list: any = []

  for (let index = 0; index < filesS.length; index++) {
    //const file = e.target.files[index]
    const file = filesS[index].file
    const nameFile = Date.now() + '-' + filesS[index].file.name.replace(/[^a-zA-Z0-9]/g, "").split(' ').join('')
    console.log(filesS[index].file.name);

    const { data, error } = await supabase.storage.from('uploads').upload(nameFile, file)
    list.push({
      id: filesS[index].id,
      name: nameFile
    })
    if (error) {
      // Handle error
      console.log(error);

    } else {
      // Handle success

    }
  }
  return list
}

export async function removeFile(path: any) {

  for (let i = 0; i < path.length; i++) {
    console.log(path[i].src);
    let fileSrc = path[i].src
    let file = fileSrc.split('uploads')[1]
    console.log(file.split('/')[1]);
    const { data, error } = await supabase
      .storage
      .from('uploads')
      .remove(file.split('/')[1])
  }
}

export async function removeFileOne(path: any) {

  console.log(path.src);
  let fileSrc = path.src
  let file = fileSrc.split('uploads')[1]
  console.log(file.split('/')[1]);
  const { data, error } = await supabase
    .storage
    .from('uploads')
    .remove(file.split('/')[1])

}


export async function removeFileOneIcone(path: any) {

  //console.log(path);
  let fileSrc = path
 
  //console.log(fileSrc.split('icones')[1].split("/")[1]);
  const { data, error } = await supabase
    .storage
    .from('icones')
    .remove(fileSrc.split('icones')[1].split("/")[1])
  if(error){
    console.log(error);
    
  }

}

export async function uploadIcone(e: any) {
  //const filesS = e.target.files
  const filesS = e
  let nameFile
  if(filesS[0] != undefined){
    nameFile = Date.now() + '-' + filesS[0].name.replace(/[^a-zA-Z0-9]/g, "").split(' ').join('')
    console.log(nameFile);
      
      const { data, error } = await supabase.storage.from('icones').upload(nameFile, filesS[0])
      
      if (error) {
        // Handle error
        console.log(error);

      } else {
        // Handle success
        
      }
  }
  
  return "https://undvejpptbowpgysnwiw.supabase.co/storage/v1/object/public/icones/" + nameFile
}