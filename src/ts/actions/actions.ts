import {specialtyInboundI, completeOutboundI, patientInboundI, patientOutboundI} from "../index.js"


export async function getAllCompleteSpecialties(){
  const response:Response = await fetch('http://localhost:8080/api/saintclaire/get/all/specialties');
  const data:completeOutboundI[] = await response.json();
  return data;
}


export async function getAllPatients(){
  const response:Response = await fetch('http://localhost:8080/api/saintclaire/get/all/patients');
  const data:patientOutboundI[] = await response.json();
  return data;
}


export async function getToValidatePatient(patientDNI: number){
    const response:Response = await fetch(`http://localhost:8080/api/saintclaire/validate/patient/${patientDNI}`)
    const data:Boolean  = await response.json();
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

export async function postPatient(patient:patientInboundI){
    const response:Response = await fetch('http://localhost:8080/api/saintclaire/create/patient',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    })
    return response;
}

export async function putOnlyAppintmentInfo(patientDNI:number){
    const response:Response = await fetch(`http://localhost:8080/api/saintclaire/update/patient/no/specialty/${patientDNI}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      },
    })

    return response;
}

export async function deletePatient(patientId:number){
  const response:Response = await fetch(`http://localhost:8080/api/saintclaire/delete/patient/${patientId}`, 
  {
    method: 'DELETE'
  })

  return response;
}