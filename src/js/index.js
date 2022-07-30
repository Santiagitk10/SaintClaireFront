import { postSpecialty, getAllCompleteSpecialties, getToValidatePatient, postPatient, getAllPatients } from "./actions/actions.js";
//GLOBAL ELEMENTS SELECTION
const specialtyCreationform = document.querySelector('.specialty-creation-form');
const createSpecialtyBtn = document.querySelector('#create-specialty-btn');
const mainMenu = document.querySelector('.main-menu');
const cancelBtn = document.querySelector('#cancel-btn');
const showAllDataBtn = document.querySelector('#show-all-data');
const registerAppointmentBtn = document.querySelector('#register-appointment-btn');
const patientRegistrationForm = document.querySelector('.patient-registration-form');
const specialtySelectionSelect = document.querySelector('#specialtySelection');
const showPatientsBtn = document.querySelector('#show-patients');
//STATE
let fullState = [];
//EVENT LISTENERS
specialtyCreationform === null || specialtyCreationform === void 0 ? void 0 : specialtyCreationform.addEventListener('submit', (e) => createSpecialty(e));
createSpecialtyBtn === null || createSpecialtyBtn === void 0 ? void 0 : createSpecialtyBtn.addEventListener('click', () => displaySpecialtyCreation());
cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener('click', () => cancelAllDisplay());
showAllDataBtn === null || showAllDataBtn === void 0 ? void 0 : showAllDataBtn.addEventListener('click', () => displayShowAllData());
registerAppointmentBtn === null || registerAppointmentBtn === void 0 ? void 0 : registerAppointmentBtn.addEventListener('click', () => displayAppointmentRegistration());
patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.addEventListener('submit', (e) => validateUserInDB(e));
showPatientsBtn === null || showPatientsBtn === void 0 ? void 0 : showPatientsBtn.addEventListener('click', () => renderPatients());
//DISPLAY MENU FUNCTIONS
function displayAppointmentRegistration() {
    getAllCompleteSpecialties().then(specialties => {
        if (specialties.length === 0) {
            const displayContentDiv = document.querySelector('.display-content');
            const noSpecialtiesMessageP = document.createElement('p');
            noSpecialtiesMessageP.innerText = "At least 1 Specialty must be created before Registering an Appointment";
            displayContentDiv.append(noSpecialtiesMessageP);
            setInterval(function () {
                noSpecialtiesMessageP.remove();
            }, 3000);
            return;
        }
        else {
            mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.add('display-none');
            cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.remove('display-none');
            patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.classList.remove('display-none');
            const patientDNIInput = document.querySelector('#patientDNI');
            const patientNameInput = document.querySelector('#patientName');
            const patientAgeInput = document.querySelector('#patientAge');
            patientDNIInput.value = "";
            patientNameInput.value = "";
            patientAgeInput.value = "";
            setSpecialtySelectMenu(specialtySelectionSelect);
        }
    });
}
function displayShowAllData() {
    mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.add('display-none');
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.remove('display-none');
    getAllCompleteSpecialties().then(specialties => {
        //TODO Revisar si si necesito el state porque creo que mejor estoy leyento todo dela base datos
        fullState = specialties;
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
    patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.classList.add('display-none');
    const divPatientData = document.querySelector('.patients-container');
    if (divPatientData !== null) {
        divPatientData.remove();
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
function renderPatients() {
    mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.add('display-none');
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.remove('display-none');
    getAllPatients().then(patients => {
        const displayContentDiv = document.querySelector('.display-content');
        const div = document.createElement('div');
        div.className = "patients-container";
        patients.forEach(patient => {
            div.append(renderSinglePatient(patient));
        });
        displayContentDiv.append(div);
    });
}
function renderSinglePatient(patient) {
    const div = document.createElement('div');
    div.className = 'single-patient-container';
    div.classList.add(`patient-${patient.patientId}`);
    const patientIdh3 = document.createElement('h3');
    patientIdh3.innerText = 'Patient ID: ' + patient.patientId.toString();
    const patientDNIh3 = document.createElement('h3');
    patientDNIh3.innerText = 'Patient DNI: ' + patient.patientDNI.toString();
    const patientNameh3 = document.createElement('h3');
    patientNameh3.innerText = 'Patient Name: ' + patient.patientName;
    const patientAgeh3 = document.createElement('h3');
    patientAgeh3.innerText = 'Patient Age: ' + patient.age.toString();
    const appointmentDatesh3 = document.createElement('h3');
    appointmentDatesh3.innerText = 'Appointment Dates: ' + patient.appointmentDates;
    const nummberOfAppointmentsh3 = document.createElement('h3');
    nummberOfAppointmentsh3.innerText = 'Number of Appointments: ' + patient.numberOfAppointments.toString();
    const addSpecialtyBtn = document.createElement('button');
    addSpecialtyBtn.className = 'single-patient-appointment-button';
    addSpecialtyBtn.innerText = 'Add Appointment';
    addSpecialtyBtn.addEventListener('click', () => handleAppointmentAddition());
    const editPatientBtn = document.createElement('button');
    editPatientBtn.className = 'single-patient-edit-button';
    editPatientBtn.innerText = 'Edit';
    editPatientBtn.addEventListener('click', () => handlePatientEdition());
    const deletePatientBtn = document.createElement('button');
    deletePatientBtn.className = 'single-patient-delete-button';
    deletePatientBtn.innerText = 'Delete';
    deletePatientBtn.addEventListener('click', () => handlePatienteDeletion());
    div.append(patientIdh3, patientDNIh3, patientNameh3, patientAgeh3, appointmentDatesh3, nummberOfAppointmentsh3, addSpecialtyBtn, editPatientBtn, deletePatientBtn);
    return div;
}
function handleAppointmentAddition() {
}
function handlePatientEdition() {
}
function handlePatienteDeletion() {
}
function validateUserInDB(e) {
    e.preventDefault();
    const patientDNIInput = document.querySelector('#patientDNI');
    const patientNameInput = document.querySelector('#patientName');
    const patientAgeInput = document.querySelector('#patientAge');
    getToValidatePatient(parseInt(patientDNIInput.value)).then(isDNIPresent => {
        if (isDNIPresent) {
            alert('The patient already exist. Show patient Data to register an appointment');
        }
        else {
            const newPatient = {
                patientDNI: parseInt(patientDNIInput.value),
                patientName: patientNameInput.value,
                age: parseInt(patientAgeInput.value),
                fkSpecialtyId: parseInt(specialtySelectionSelect.value)
            };
            postPatient(newPatient).then(response => {
                if (response.status === 200) {
                    console.log("Post Ok");
                }
                else {
                    console.log("The request failed");
                }
            });
        }
    });
    patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.classList.add('display-none');
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.add('display-none');
    mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.classList.remove('display-none');
}
function setSpecialtySelectMenu(select) {
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    getAllCompleteSpecialties().then(specialties => {
        let specialtiesDisplay = specialties.map(specialty => specialty.specialtyId + ". " + specialty.specialtyName);
        specialtiesDisplay.forEach(specialtyToDisplay => {
            const optionElement = document.createElement('option');
            optionElement.innerText = specialtyToDisplay;
            optionElement.value = specialtyToDisplay.split(".")[0];
            select.append(optionElement);
        });
    });
}
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
        const patientDNIh4 = document.createElement('h4');
        patientDNIh4.innerText = 'Patient DNI: ' + patient.patientDNI;
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
        singlePatientDiv.append(patientDNIh4, patientNameh4, ageh4, appointmentDatesh4, numberOfAppointmentsh4, fkSpecialtyIdh4);
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
