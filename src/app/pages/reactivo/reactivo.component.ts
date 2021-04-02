import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.css']
})
export class ReactivoComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {

    this.crearFormulario();
    /* this.cargarDataFormulario(); */
    this.crearListeners();
   }

  ngOnInit(): void {
  }


  get nombreNoValido(): boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(): boolean {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido(): boolean {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido(): boolean {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get distritoNoValido(): boolean {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido(): boolean {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pasatiempos(): FormArray {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido(): boolean {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido(): boolean {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }


  crearFormulario(): void {

    /* [valor por defecto, validadores síncronos, validadores asíncronos] */
    this.forma = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(5), this.validadores.primeraLetraMayuscula]],
      apellido : ['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera]],
      correo   : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario  : ['', , this.validadores.existeUsuario],
      pass1    : ['', Validators.required],
      pass2    : ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad  : ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales
    });
  }


  crearListeners(): void {
    /* ValueChanges te avisa de cualquier cambio que sufra el formulario */
    this.forma.valueChanges.subscribe(valor => console.log(valor));

    /* StatusChanges te avisas del estado del formulario*/
    this.forma.statusChanges.subscribe(status => console.log(status));

    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }


  cargarDataFormulario(): void {

    /* Con la propiedad SETVALUE tienes que setear todos los atributos del form aunque sean string vacíos, en caso de no tener valor.

       Con la propiedad RESET no tienes obligación de setear todos los atributos, sólo los que tienen valor.

       El reset se ocupa también para resetear el formulario al hacer el post cuando presiones el boton guardar.
    */

    /* this.forma.setValue({ */
    this.forma.reset({
      nombre: 'Esteban',
      apellido: 'Oyanadel',
      correo: 'eoyanadel@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Las Lilas #487',
        ciudad: 'Coquimbo'
      }
    });

    /* cargar pasatiempos */
    ['Música', 'Trekking', 'Gym'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }


  guardar(): void {
    console.log(this.forma);

    if (this.forma.invalid) {

      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlHijo => controlHijo.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }

      });
    }

    /* Posteo de informacion */
    /* this.forma.reset({
      nombre: 'Sin nombre'
    }); */
  }


  agregarPasatiempo(): void {

    this.pasatiempos.push(this.fb.control(''));
  }


  borrarPasatiempo(i: number): void {

    this.pasatiempos.removeAt(i);
  }

}
