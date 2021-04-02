import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

/* Interface para definir el tipo de retorno del validador asíncrono, también puede ser utilizado para el validador síncrono
   Esto es más que nada para simplificar código y no se vea tan enrredado
*/
interface ErrorValidate {
  [s: string]: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  /* Validador síncrono */
  noHerrera(control: FormControl): { [s: string]: boolean } {

    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      };
    }

    return null;
  }


  /* Validador asíncrono */
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    /* si no se ha ingresado usuario, devuelve directamente el resultado de la promesa null*/
    if ( !control.value) {
      return Promise.resolve(null);
    }

    /* solo entra si se escribe en el campo de usuario, gracias al IF de arriba */
    return new Promise( (resolve, reject) => {

      setTimeout(() => {

        if (control.value === 'strider') {
          resolve( { existe: true } );
        } else {
          resolve(null);
        }

      }, 3500);
    });
  }

  /* síncrono */
  primeraLetraMayuscula(control: FormControl): { [s: string]: boolean } {

    if (control.value[0] !== control.value[0]?.toUpperCase()) {
      return {
        noLetraMayuscula: true
      };
    }

    return null;
  }


  passwordsIguales(control: AbstractControl): ValidationErrors | null {

    const pass1 = control.get('pass1')?.value;
    const pass2 = control.get('pass2')?.value;

    /* console.log(pass1, pass2); */

    if ( pass1 !== pass2 ) {
      control.get('pass2')?.setErrors({ noIguales: true });
      return { noIguales: true };
    }

    return null;
  }


}
