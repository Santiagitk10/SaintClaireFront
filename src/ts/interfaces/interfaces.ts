//INTERFACES
export interface specialtyInboundI {
    specialtyName:string,
    physicianInCharge:string
}

export interface completeOutboundI {
    specialtyId: number,
    specialtyName: string,
    physicianInCharge: string,
        patientList: [{
            patientDNI: number,
            patientName: string,
            age: number,
            appointmentDates: string,
            numberOfAppointments: number,
            fkSpecialtyId: number
        }]
}

export interface patientInboundI {
    patientDNI: number,
    patientName: string,
    age: number,
    fkSpecialtyId: number
}


export interface patientOutboundI {
    patientId: number,
    patientDNI: number,
    patientName: string,
    age: number,
    appointmentDates: string,
    numberOfAppointments: number
}