var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAllCompleteSpecialties() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/saintclaire/get/all/specialties');
        const data = yield response.json();
        return data;
    });
}
export function getToValidatePatient(patientDNI) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:8080/api/saintclaire/validate/patient/${patientDNI}`);
        const data = yield response.json();
        return data;
    });
}
export function postSpecialty(specialty) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/saintclaire/create/specialty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        });
        return response;
    });
}
export function postPatient(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/saintclaire/create/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        return response;
    });
}
