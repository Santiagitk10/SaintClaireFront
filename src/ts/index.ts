import { postSpecialty } from "./actions/actions.js";

const specialtyCreationform: HTMLFormElement | null = 
document.querySelector('.specialty-creation-form');

export interface specialtyReqI {
    specialtyName:string,
    physicianInCharge:string
}

specialtyCreationform?.addEventListener('submit', (e) => createSpecialty(e));

function createSpecialty(e:SubmitEvent){
    e.preventDefault();
    const specialtyNameInput = document.querySelector('#SpecialtyName') as HTMLInputElement;
    const physicianNameInput = document.querySelector('#PhysicianName') as HTMLInputElement;

    if(specialtyNameInput.value && physicianNameInput.value){
        const newSpecialty: specialtyReqI = {
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

}