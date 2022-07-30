import { postSpecialty, getAllCompleteSpecialties, getToValidatePatient, postPatient, getAllPatients } from "./actions/actions.js";


//GLOBAL ELEMENTS SELECTION
const specialtyCreationform: HTMLFormElement | null = document.querySelector('.specialty-creation-form');
const createSpecialtyBtn: HTMLButtonElement | null = document.querySelector('#create-specialty-btn');
const mainMenu: HTMLDivElement | null = document.querySelector('.main-menu');
const cancelBtn: HTMLButtonElement | null = document.querySelector('#cancel-btn');
const showAllDataBtn: HTMLButtonElement | null = document.querySelector('#show-all-data');
const registerAppointmentBtn: HTMLButtonElement | null = document.querySelector('#register-appointment-btn');
const patientRegistrationForm: HTMLFormElement | null = document.querySelector('.patient-registration-form');
const specialtySelectionSelect = document.querySelector('#specialtySelection') as HTMLSelectElement;
const showPatientsBtn = document.querySelector('#show-patients');


//STATE
let fullState:completeOutboundI[] = [];


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




//EVENT LISTENERS
specialtyCreationform?.addEventListener('submit', (e) => createSpecialty(e));
createSpecialtyBtn?.addEventListener('click', () => displaySpecialtyCreation());
cancelBtn?.addEventListener('click', () => cancelAllDisplay());
showAllDataBtn?.addEventListener('click', () => displayShowAllData());
registerAppointmentBtn?.addEventListener('click', () => displayAppointmentRegistration());
patientRegistrationForm?.addEventListener('submit', (e) => validateUserInDB(e));
showPatientsBtn?.addEventListener('click', () => renderPatients());





//DISPLAY MENU FUNCTIONS
function displayAppointmentRegistration(){
    getAllCompleteSpecialties().then(specialties => {
        if(specialties.length === 0){
            const displayContentDiv = document.querySelector('.display-content') as HTMLDivElement;
            const noSpecialtiesMessageP = document.createElement('p') as HTMLParagraphElement;
            noSpecialtiesMessageP.innerText = "At least 1 Specialty must be created before Registering an Appointment";
            displayContentDiv.append(noSpecialtiesMessageP);
            setInterval(function(){
                noSpecialtiesMessageP.remove();
            },3000);
            return;
        } else {
            mainMenu?.classList.add('display-none');
            cancelBtn?.classList.remove('display-none');
            patientRegistrationForm?.classList.remove('display-none');
            const patientDNIInput = document.querySelector('#patientDNI') as HTMLInputElement;
            const patientNameInput = document.querySelector('#patientName') as HTMLInputElement;
            const patientAgeInput = document.querySelector('#patientAge') as HTMLInputElement;
            patientDNIInput.value = "";
            patientNameInput.value = "";
            patientAgeInput.value = "";
            setSpecialtySelectMenu(specialtySelectionSelect);
        }
    })
    
}







function displayShowAllData(){
    mainMenu?.classList.add('display-none');
    cancelBtn?.classList.remove('display-none');
    getAllCompleteSpecialties().then(specialties => {
        //TODO Revisar si si necesito el state porque creo que mejor estoy leyento todo dela base datos
        fullState = specialties;
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
    patientRegistrationForm?.classList.add('display-none');
    const divPatientData: HTMLDivElement | null = document.querySelector('.patients-container');
    if(divPatientData !== null){
        divPatientData.remove();
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
function renderPatients(){
    mainMenu?.classList.add('display-none');
    cancelBtn?.classList.remove('display-none');
    getAllPatients().then(patients => {
        const displayContentDiv = document.querySelector('.display-content') as HTMLDivElement;
        const div:HTMLDivElement = document.createElement('div');
        div.className = "patients-container";
        patients.forEach(patient => {
           div.append(renderSinglePatient(patient));
        });
        displayContentDiv.append(div);
    })
}


function renderSinglePatient(patient:patientOutboundI): HTMLDivElement{
    const div:HTMLDivElement = document.createElement('div');
    div.className = 'single-patient-container';
    div.classList.add(`patient-${patient.patientId}`);

    const patientIdh3: HTMLElement = document.createElement('h3');
    patientIdh3.innerText = 'Patient ID: ' + patient.patientId.toString();
    const patientDNIh3: HTMLElement = document.createElement('h3');
    patientDNIh3.innerText = 'Patient DNI: ' + patient.patientDNI.toString();
    const patientNameh3: HTMLElement = document.createElement('h3');
    patientNameh3.innerText = 'Patient Name: ' + patient.patientName;
    const patientAgeh3: HTMLElement = document.createElement('h3');
    patientAgeh3.innerText = 'Patient Age: ' + patient.age.toString();
    const appointmentDatesh3: HTMLElement = document.createElement('h3');
    appointmentDatesh3.innerText = 'Appointment Dates: ' + patient.appointmentDates;
    const nummberOfAppointmentsh3: HTMLElement = document.createElement('h3');
    nummberOfAppointmentsh3.innerText = 'Number of Appointments: ' + patient.numberOfAppointments.toString();

    const addSpecialtyBtn: HTMLButtonElement = document.createElement('button');
    addSpecialtyBtn.className = 'single-patient-appointment-button';
    addSpecialtyBtn.innerText = 'Add Appointment';
    addSpecialtyBtn.addEventListener('click', ()=> handleAppointmentAddition());

    const editPatientBtn: HTMLButtonElement = document.createElement('button');
    editPatientBtn.className = 'single-patient-edit-button';
    editPatientBtn.innerText = 'Edit';
    editPatientBtn.addEventListener('click', ()=> handlePatientEdition());

    const deletePatientBtn: HTMLButtonElement = document.createElement('button');
    deletePatientBtn.className = 'single-patient-delete-button';
    deletePatientBtn.innerText = 'Delete';
    deletePatientBtn.addEventListener('click', ()=> handlePatienteDeletion());

    div.append(patientIdh3, patientDNIh3, patientNameh3, patientAgeh3,  appointmentDatesh3, nummberOfAppointmentsh3,
        addSpecialtyBtn, editPatientBtn, deletePatientBtn);

    return div;

}

function handleAppointmentAddition(){

}


function handlePatientEdition(){

}


function handlePatienteDeletion(){
    
}



function validateUserInDB(e:SubmitEvent){
    e.preventDefault();
    const patientDNIInput = document.querySelector('#patientDNI') as HTMLInputElement;
    const patientNameInput = document.querySelector('#patientName') as HTMLInputElement;
    const patientAgeInput = document.querySelector('#patientAge') as HTMLInputElement;


        getToValidatePatient(parseInt(patientDNIInput.value)).then(isDNIPresent => {
            if(isDNIPresent){
                    alert('The patient already exist. Show patient Data to register an appointment');
            } else {                
                    const newPatient: patientInboundI = {
                        patientDNI: parseInt(patientDNIInput.value),
                        patientName: patientNameInput.value,
                        age: parseInt(patientAgeInput.value),
                        fkSpecialtyId: parseInt(specialtySelectionSelect.value)
                    }

                    postPatient(newPatient).then(
                        response => {
                            if(response.status === 200){
                                console.log("Post Ok");
                            } else {
                                console.log("The request failed");
                            }
                        }
                    )
            }
        })

        patientRegistrationForm?.classList.add('display-none');
        cancelBtn?.classList.add('display-none');
        mainMenu?.classList.remove('display-none');
}





function setSpecialtySelectMenu(select:HTMLSelectElement){
    while(select.firstChild){
        select.removeChild(select.firstChild);
    }
    getAllCompleteSpecialties().then(specialties => {
        let specialtiesDisplay = specialties.map(specialty => specialty.specialtyId + ". " + specialty.specialtyName);
        specialtiesDisplay.forEach(specialtyToDisplay => {
            const optionElement = document.createElement('option') as HTMLOptionElement;
            optionElement.innerText = specialtyToDisplay;
            optionElement.value = specialtyToDisplay.split(".")[0];
            select.append(optionElement);
        });
    })
}


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

        const patientDNIh4:HTMLElement = document.createElement('h4');
        patientDNIh4.innerText = 'Patient DNI: ' + patient.patientDNI;
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

        singlePatientDiv.append(patientDNIh4, patientNameh4, ageh4, appointmentDatesh4, numberOfAppointmentsh4, fkSpecialtyIdh4);

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

