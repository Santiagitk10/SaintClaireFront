import { postSpecialty, getAllCompleteSpecialties, getToValidatePatient, postPatient } from "./actions/actions.js";
//GLOBAL ELEMENTS SELECTION
const specialtyCreationform = document.querySelector('.specialty-creation-form');
const createSpecialtyBtn = document.querySelector('#create-specialty-btn');
const mainMenu = document.querySelector('.main-menu');
const cancelBtn = document.querySelector('#cancel-btn');
const showAllDataBtn = document.querySelector('#show-all-data');
const registerAppointmentBtn = document.querySelector('#register-appointment-btn');
const initialPatientValidationForm = document.querySelector('.initial-patient-validation-form');
//STATE
let fullState = [];
//EVENT LISTENERS
specialtyCreationform === null || specialtyCreationform === void 0 ? void 0 : specialtyCreationform.addEventListener('submit', (e) => createSpecialty(e));
createSpecialtyBtn === null || createSpecialtyBtn === void 0 ? void 0 : createSpecialtyBtn.addEventListener('click', () => displaySpecialtyCreation());
cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener('click', () => cancelAllDisplay());
showAllDataBtn === null || showAllDataBtn === void 0 ? void 0 : showAllDataBtn.addEventListener('click', () => displayShowAllData());
registerAppointmentBtn === null || registerAppointmentBtn === void 0 ? void 0 : registerAppointmentBtn.addEventListener('click', () => displayAppointmentRegistration());
initialPatientValidationForm === null || initialPatientValidationForm === void 0 ? void 0 : initialPatientValidationForm.addEventListener('submit', (e) => validateUserInDB(e));
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
            initialPatientValidationForm === null || initialPatientValidationForm === void 0 ? void 0 : initialPatientValidationForm.classList.remove('display-none');
            const patientIdInput = document.querySelector('#patientDNI');
            patientIdInput.value = '';
            cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.remove('display-none');
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
    initialPatientValidationForm === null || initialPatientValidationForm === void 0 ? void 0 : initialPatientValidationForm.classList.add('display-none');
    const patientRegistrationForm = document.querySelector('.patient-registration-form');
    patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.classList.add('display-none');
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
function validateUserInDB(e) {
    e.preventDefault();
    const isNaNMessage = document.querySelector('.p-message');
    isNaNMessage === null || isNaNMessage === void 0 ? void 0 : isNaNMessage.remove();
    const patientDNIInput = document.querySelector('#patientDNI');
    let inputValue = parseInt(patientDNIInput.value);
    if (isNaN(inputValue)) {
        const pMessage = document.createElement('p');
        pMessage.className = 'p-message';
        pMessage.innerText = 'The DNI must be a number';
        const displayContentDiv = document.querySelector('.display-content');
        displayContentDiv.append(pMessage);
    }
    else {
        getToValidatePatient(inputValue).then(isDNIPresent => {
            if (isDNIPresent) {
                //     si lo encontró mostrar para que seleccione specialty
                //     habrá que validar que no esté en el specialty el paciente
                //     si está aumentar todo pero no agregar paciente
            }
            else {
                patientDNIInput.value = ""; //OJO CON ESTE
                initialPatientValidationForm === null || initialPatientValidationForm === void 0 ? void 0 : initialPatientValidationForm.classList.add('display-none');
                cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.classList.remove('display-none');
                const patientRegistrationForm = document.querySelector('.patient-registration-form');
                patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.classList.remove('display-none');
                const specialtySelectionSelect = document.querySelector('#specialtySelection');
                setSpecialtySelectMenu(specialtySelectionSelect);
                patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const patientNameInput = document.querySelector('#patientName');
                    const patientAgeInput = document.querySelector('#patientAge');
                    const newPatient = {
                        patientDNI: inputValue,
                        patientName: patientNameInput.value,
                        age: parseInt(patientAgeInput.value),
                        fkSpecialtyId: parseInt(specialtySelectionSelect.value)
                    };
                    console.log(newPatient);
                    postPatient(newPatient).then(response => {
                        if (response.status === 200) {
                            console.log("Post Ok");
                        }
                        else {
                            console.log("The request failed");
                        }
                    });
                    patientDNIInput.value = ""; //Revisar
                    patientNameInput.value = "";
                    patientAgeInput.value = "";
                    patientRegistrationForm === null || patientRegistrationForm === void 0 ? void 0 : patientRegistrationForm.classList.add('display-none');
                });
            }
        });
    }
}
function setSpecialtySelectMenu(select) {
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
