import {specialtyReqI} from "../index.js"

export async function postSpecialty(specialty:specialtyReqI){
    const response:Response = await fetch('http://localhost:8080/api/saintclaire/create/specialty', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(specialty)
    })
  
    return response;
  }