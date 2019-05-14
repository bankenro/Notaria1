import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../Servicios/usuario.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private servicio: ConexionService,
              private usuarioservicio: UsuarioService,
              private router: Router) { }
  private _success = new Subject<string>();
  form: FormGroup;
  private formSubmitAttempt: boolean;
  mensaje: string;
  ngOnInit() {
    this.form = this.fb.group({
      usuario: ['73639888', Validators.required],
      password: ['73639888', Validators.required]
    });
    this._success.subscribe((message) => this.mensaje = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.mensaje = null);
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  LoginUser() {
    if (this.form.valid) {
      let formData;
      formData = new FormData();
      formData.append('accion', 'login');
      formData.append('usuario', this.form.get('usuario').value);
      formData.append('password', this.form.get('password').value);

      this.servicio.servicio(formData).subscribe(
        usuario => {
          Object.keys(usuario).map((key) => {
            if (key === 'usu') {
              this.usuarioservicio.setUsuarioLogeadoen(usuario[key]);
              this.router.navigate(['escrituras']);
              location.reload();
            } else {
              this._success.next('Usuario o contraseña incorrectas');
            }
          });
        }
      );
    }
    this.formSubmitAttempt = true;
  }
}
