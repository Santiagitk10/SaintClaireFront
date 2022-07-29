import { postSpecialty, getAllCompleteSpecialties } from "./actions/actions.js";


//GLOBAL ELEMENTS SELECTION
const specialtyCreationform: HTMLFormElement | null = document.querySelector('.specialty-creation-form');
const createSpecialtyBtn: HTMLButtonElement | null = document.querySelector('#create-specialty-btn');
const mainMenu: HTMLDivElement | null = document.querySelector('.main-menu');
const cancelBtn: HTMLButtonElement | null = document.querySelector('#cancel-btn');
const showAllDataBtn: HTMLButtonElement | null = document.querySelector('#show-all-data');
const registerAppointmentBtn: HTMLButtonElement | null = document.querySelector('#register-appointment-btn');
const initialPatientValidationForm: HTMLFormElement | null = document.querySelector('.initial-patient-validation-form');


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



//EVENT LISTENERS
specialtyCreationform?.addEventListener('submit', (e) => createSpecialty(e));
createSpecialtyBtn?.addEventListener('click', () => displaySpecialtyCreation());
cancelBtn?.addEventListener('click', () => cancelAllDisplay());
showAllDataBtn?.addEventListener('click', () => displayShowAllData());
registerAppointmentBtn?.addEventListener('click', () => displayAppointmentRegistration());
initialPatientValidationForm?.addEventListener('submit', (e) => validateUserInSatate(e));





//DISPLAY MENU FUNCTIONS
function displayAppointmentRegistration(){
    const patientIdInput = document.querySelector('#patientDNI') as HTMLInputElement;
    patientIdInput.value = '';
    mainMenu?.classList.add('display-none');
    initialPatientValidationForm?.classList.remove('display-none');
    cancelBtn?.classList.remove('display-none');
}


function displayShowAllData(){
    mainMenu?.classList.add('display-none');
    cancelBtn?.classList.remove('display-none');
    getAllCompleteSpecialties().then(specialties => {
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
    initialPatientValidationForm?.classList.add('display-none');
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
function validateUserInSatate(e:SubmitEvent){
    e.preventDefault();
    const isNaNMessage = document.querySelector('.p-message') as HTMLParagraphElement;
    isNaNMessage?.remove();
    const patientDNIInput = document.querySelector('#patientDNI') as HTMLInputElement;
    let inputValue: any = patientDNIInput.value;
    // if(isNaN(inputValue)){
    //     const pMessage = document.createElement('p');
    //     pMessage.className = 'p-message';
    //     pMessage.innerText = 'The DNI must be a number';
    //     const displayContentDiv = document.querySelector('.display-content') as HTMLDivElement;
    //     displayContentDiv.append(pMessage);
    // } else {
        // let found:boolean = false;


        // let patient = fullState.map((nestedObject.nestedObject) => {
        //     if(typeof nestedObject.nestedObject !=)
        // })



        // let patient = fullState.map(specialty => specialty.patientList)
        //                         .map(patientListing => patientListing.value);

        // console.log(patient);

        // for(let val in fullState){
        //     if(isObject(fullState[val])){
        //         for(let val2 in fullState[val]){
        //             console.log(val2);
        //         }
        //     }
        // }

        // puedo combinar map para extraer y filter
        // revisar find que no estaba en el video





        // if(patient !== null){
        //     console.log('found');
            // si lo encontró mostrar para que seleccione specialty
            // habrá que validar que no esté en el specialty el paciente
            //si está aumentar todo pero no agregar paciente
        // } else {
        //     console.log('Not found');
        //     patientIdInput.value = "";
        //     initialPatientValidationForm?.classList.add('display-none');
        //     const patientRegistrationForm: HTMLFormElement | null = document.querySelector('.patient-registration-form');
        //     patientRegistrationForm?.classList.remove('display-none');

        // }
        


        // si no lo encontró mostrar para que se registe también con el specialty
    // }
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


function isObject(val:any){
    if(val === null){
        return false;
    }
    return (typeof val === 'object');
}