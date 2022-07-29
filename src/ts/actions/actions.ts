import {specialtyInboundI, completeOutboundI} from "../index.js"


export async function getAllCompleteSpecialties(){
  const response:Response = await fetch('http://localhost:8080/api/saintclaire/get/all/specialties');
  const data:completeOutboundI[] = await response.json();
  return data;
}


export async function postSpecialty(specialty:specialtyInboundI){
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