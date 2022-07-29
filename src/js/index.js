import { postSpecialty, getAllCompleteSpecialties } from "./actions/actions.js";
//GLOBAL ELEMENTS SELECTION
const specialtyCreationform = document.querySelector('.specialty-creation-form');
const createSpecialtyBtn = document.querySelector('#create-specialty-btn');
const mainMenu = document.querySelector('.main-menu');
const cancelBtn = document.querySelector('#cancel-btn');
const showAllDataBtn = document.querySelector('#show-all-data');
//EVENT LISTENERS
specialtyCreationform === null || specialtyCreationform === void 0 ? void 0 : specialtyCreationform.addEventListener('submit', (e) => createSpecialty(e));
createSpecialtyBtn === null || createSpecialtyBtn === void 0 ? void 0 : createSpecialtyBtn.addEventListener('click', () => displaySpecialtyCreation());
cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener('click', () => cancelAllDisplay());
showAllDataBtn === null || showAllDataBtn === void 0 ? void 0 : showAllDataBtn.addEventListener('click', () => displayShowAllData());
//DISPLAY MENU FUNCTIONS
function displayShowAllData() {
    mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.add('display-none');
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.remove('display-none');
    getAllCompleteSpecialties().then(specialties => {
        const displayContentDiv = document.querySelector('.display-content');
        const div = document.createElement('div');
        div.className = "specialties-container";
        specialties.forEach(specialty => {
            div.append(createSpecialtyListing(specialty));
        });
        displayContentDiv.append(div);
    });
}
function cancelAllDisplay() {
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.add('display-none');
    mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.remove('display-none');
    //AGREGAR TODOS LOS COMPONENTES
    specialtyCreationform === null || specialtyCreationform === void 0 ? void 0 : specialtyCreationform.classList.add('display-none');
    const divAllData = document.querySelector('.specialties-container');
    if (divAllData !== null) {
        divAllData.remove();
    }
}
function displaySpecialtyCreation() {
    const specialtyNameInput = document.querySelector('#SpecialtyName');
    const physicianNameInput = document.querySelector('#PhysicianName');
    specialtyNameInput.value = '';
    physicianNameInput.value = '';
    mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.add('display-none');
    specialtyCreationform === null || specialtyCreationform === void 0 ? void 0 : specialtyCreationform.classList.remove('display-none');
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.remove('display-none');
}
//FUNCTIONS
function createSpecialtyListing(specialty) {
    const div = document.createElement('div');
    div.className = 'specialty-register-container';
    div.classList.add(`specialty-${specialty.specialtyId}`);
    const h2 = document.createElement('h2');
    h2.innerText = 'Specialty ID: ' + specialty.specialtyId;
    const h3 = document.createElement('h3');
    h3.innerText = 'Specialty Name: ' + specialty.specialtyName;
    const h4 = document.createElement('h4');
    h4.innerText = 'Physician in Charge: ' + specialty.physicianInCharge;
    div.append(h2, h3, h4);
    specialty.patientList.forEach(patient => {
        const singlePatientDiv = document.createElement('div');
        singlePatientDiv.className = 'patient-register-container';
        const patientIdh4 = document.createElement('h4');
        patientIdh4.innerText = 'Patient ID: ' + patient.patientId;
        const patientNameh4 = document.createElement('h4');
        patientNameh4.innerText = 'Patient Name: ' + patient.patientName;
        const ageh4 = document.createElement('h4');
        ageh4.innerText = 'Age: ' + patient.age;
        const appointmentDatesh4 = document.createElement('h4');
        appointmentDatesh4.innerText = 'Appointment Dates: ' + patient.appointmentDates;
        const numberOfAppointmentsh4 = document.createElement('h4');
        numberOfAppointmentsh4.innerText = 'Number of Appointments: ' + patient.numberOfAppointments;
        const fkSpecialtyIdh4 = document.createElement('h4');
        fkSpecialtyIdh4.innerText = 'Specialty ID: ' + patient.fkSpecialtyId;
        singlePatientDiv.append(patientIdh4, patientNameh4, ageh4, appointmentDatesh4, numberOfAppointmentsh4, fkSpecialtyIdh4);
        div.append(singlePatientDiv);
    });
    return div;
}
function createSpecialty(e) {
    e.preventDefault();
    const specialtyNameInput = document.querySelector('#SpecialtyName');
    const physicianNameInput = document.querySelector('#PhysicianName');
    if (specialtyNameInput.value && physicianNameInput.value) {
        const newSpecialty = {
            specialtyName: specialtyNameInput.value,
            physicianInCharge: physicianNameInput.value
        };
        postSpecialty(newSpecialty).then(response => {
            if (response.status === 200) {
                console.log("Post Ok");
            }
            else {
                console.log("The request failed");
            }
        });
    }
    specialtyCreationform === null || specialtyCreationform === void 0 ? void 0 : specialtyCreationform.classList.add('display-none');
    mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.remove('display-none');
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.add('display-none');
}
