import {Component, Inject, OnInit} from '@angular/core';
import {Tiposu} from '../../Data/Tiposu';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-edit-usu',
  templateUrl: './dialog-edit-usu.component.html',
  styleUrls: ['./dialog-edit-usu.component.css']
})
export class DialogEditUsuComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  tiposu: Tiposu[];
  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogEditUsuComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required],
      tipo: ['', Validators.required],
      nombre: ['', Validators.required]
    });
    this.form.get('dni').disable();
    this.LlenarDatos();
    this.LlenarTipos();
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  private LlenarTipos() {
    const formData = new FormData;
    formData.append('accion', 'tiposu');
    this.conexion.servicio(formData).subscribe(
      tiposu => {
        Object.keys(tiposu).map((key) => {
          if (key === 'tiposu') {
            this.tiposu = tiposu[key];
            // console.log(key);
            // console.log(usuario[key]);
          }
        });
      }
    );
  }

  ActualizarUsu() {
    const formData = new FormData;
    formData.append('accion', 'actusu');
    formData.append('dni', this.form.get('dni').value);
    formData.append('password', this.form.get('password').value);
    formData.append('tipo', this.form.get('tipo').value);
    formData.append('nombre', this.form.get('nombre').value);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map((key) => {
          // console.log(key);
          // console.log(respuesta[key]);
          if (key === 'mensaje') {
            if (respuesta[key] === 'Usuario actualizado correctamente') {
              this.dialogRef.close(respuesta[key]);
            }
          }
        });
      }
    );
  }

  private LlenarDatos() {
    const row = this.data['row'];
    // console.log(row);
    this.form.patchValue({
      dni: row['id'],
      password: row['password'],
      nombre: row['nombre']
    });
  }
}
