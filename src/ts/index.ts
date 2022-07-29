import { postSpecialty, getAllCompleteSpecialties } from "./actions/actions.js";


//GLOBAL ELEMENTS SELECTION
const specialtyCreationform: HTMLFormElement | null = document.querySelector('.specialty-creation-form');
const createSpecialtyBtn: HTMLButtonElement | null = document.querySelector('#create-specialty-btn');
const mainMenu: HTMLDivElement | null = document.querySelector('.main-menu');
const cancelBtn: HTMLButtonElement | null = document.querySelector('#cancel-btn');
const showAllDataBtn: HTMLButtonElement | null = document.querySelector('#show-all-data');


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
            patientId: number,
            patientName: string,
            age: number,
            appointmentDates: string,
            numberOfAppointments: number,
            fkSpecialtyId: number
        }]
}



//EVENT LISTENERS
specialtyCreationform?.addEventListener('submit', (e) => createSpecialty(e));
createSpecialtyBtn?.addEventListener('click', () => displaySpecialtyCreation());
cancelBtn?.addEventListener('click', () => cancelAllDisplay());
showAllDataBtn?.addEventListener('click', () => displayShowAllData());





//DISPLAY MENU FUNCTIONS
function displayShowAllData(){
    mainMenu?.classList.add('display-none');
    cancelBtn?.classList.remove('display-none');
    getAllCompleteSpecialties().then(specialties => {
        const displayContentDiv = document.querySelector('.display-content') as HTMLDivElement;
        const div:HTMLDivElement = document.createElement('div');
        div.className = "specialties-container";
        specialties.forEach(specialty => {
           div.append(createSpecialtyListing(specialty));
        });
        displayContentDiv.append(div);
    })
}


function cancelAllDisplay(){
    cancelBtn?.classList.add('display-none');
    mainMenu?.classList.remove('display-none');
    //AGREGAR TODOS LOS COMPONENTES
    specialtyCreationform?.classList.add('display-none');
    const divAllData:HTMLDivElement | null = document.querySelector('.specialties-container');
    if(divAllData !== null){
        divAllData.remove();
    }

}

function displaySpecialtyCreation(){
        const specialtyNameInput = document.querySelector('#SpecialtyName') as HTMLInputElement;
        const physicianNameInput = document.querySelector('#PhysicianName') as HTMLInputElement;
        specialtyNameInput.value = '';
        physicianNameInput.value = '';
        mainMenu?.classList.add('display-none');
        specialtyCreationform?.classList.remove('display-none');
        cancelBtn?.classList.remove('display-none');
}


//FUNCTIONS

function createSpecialtyListing(specialty:completeOutboundI): HTMLDivElement{
    
    const div:HTMLDivElement = document.createElement('div');
    div.className = 'specialty-register-container';
    div.classList.add(`specialty-${specialty.specialtyId}`);

    const h2:HTMLElement = document.createElement('h2');
    h2.innerText = 'Specialty ID: ' + specialty.specialtyId;

    const h3:HTMLElement = document.createElement('h3');
    h3.innerText = 'Specialty Name: ' + specialty.specialtyName;

    const h4:HTMLElement = document.createElement('h4');
    h4.innerText = 'Physician in Charge: ' + specialty.physicianInCharge

    div.append(h2, h3, h4);

    specialty.patientList.forEach(patient => {
        const singlePatientDiv:HTMLElement = document.createElement('div');
        singlePatientDiv.className = 'patient-register-container';

        const patientIdh4:HTMLElement = document.createElement('h4');
        patientIdh4.innerText = 'Patient ID: ' + patient.patientId;
        const patientNameh4:HTMLElement = document.createElement('h4');
        patientNameh4.innerText = 'Patient Name: ' + patient.patientName;
        const ageh4:HTMLElement = document.createElement('h4');
        ageh4.innerText = 'Age: ' + patient.age;
        const appointmentDatesh4:HTMLElement = document.createElement('h4');
        appointmentDatesh4.innerText = 'Appointment Dates: ' + patient.appointmentDates;
        const numberOfAppointmentsh4:HTMLElement = document.createElement('h4');
        numberOfAppointmentsh4.innerText = 'Number of Appointments: ' +  patient.numberOfAppointments;
        const fkSpecialtyIdh4:HTMLElement = document.createElement('h4');
        fkSpecialtyIdh4.innerText = 'Specialty ID: ' + patient.fkSpecialtyId;

        singlePatientDiv.append(patientIdh4, patientNameh4, ageh4, appointmentDatesh4, numberOfAppointmentsh4, fkSpecialtyIdh4);

        div.append(singlePatientDiv);

    
    })

    return div;

}




function createSpecialty(e:SubmitEvent){
    e.preventDefault();
    const specialtyNameInput = document.querySelector('#SpecialtyName') as HTMLInputElement;
    const physicianNameInput = document.querySelector('#PhysicianName') as HTMLInputElement;

    if(specialtyNameInput.value && physicianNameInput.value){
        const newSpecialty: specialtyInboundI = {
            specialtyName: specialtyNameInput.value,
            physicianInCharge: physicianNameInput.value
        }

        postSpecialty(newSpecialty).then(
            response => {
                if(response.status === 200){
                    console.log("Post Ok");
                } else {
                    console.log("The request failed");
                }
            }
        )

    }

    specialtyCreationform?.classList.add('display-none');
    mainMenu?.classList.remove('display-none');
    cancelBtn?.classList.add('display-none');

}