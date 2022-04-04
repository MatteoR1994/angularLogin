import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class PasswordValidator {

    static mustMatch(firstControlName: string, secondControlName: string): any{
        return (formGroup: FormGroup) => {
            const pswControl = formGroup.controls[firstControlName];
            const confirmControl = formGroup.controls[secondControlName];
            if (confirmControl.errors && !confirmControl.errors['mustMatch']) {
                return;
            }
            if (pswControl.value !== confirmControl.value) {
                confirmControl.setErrors({'mustMatch': true});
            } else {
                confirmControl.setErrors(null);
            }
            return null;
        }
    }

    static hasCapitalChar(control: AbstractControl): ValidationErrors | null {
        return /[A-Z]/.test(control.value) ? null : { 'hasCapitalChar': true };
    }

    static hasLowerChar(control: AbstractControl): ValidationErrors | null {
        return /[a-z]/.test(control.value) ? null : { 'hasLowerChar': true };
    }

    static hasNumber(control: AbstractControl): ValidationErrors | null {
        return /[0-9]/.test(control.value) ? null : { 'hasNumberChar': true };
    }

    static hasSpecialChars(control: AbstractControl): ValidationErrors | null {
        return /[!@#\$%\^&\*]/.test(control.value) ? null : { 'hasSpecialChars': true };
    }

}