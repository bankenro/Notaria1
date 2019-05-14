import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {ConexionService} from '../../Servicios/conexion.service';
import {Escrituras} from '../../Data/Escrituras';
import {Estadosc} from '../../Data/Estadosc';
import {Ciudades} from '../../Data/Ciudades';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Tiposa} from '../../Data/Tiposa';
import {DialogEscrituraPruebaComponent} from '../dialog-escritura-prueba/dialog-escritura-prueba.component';
import {Actores} from '../../Data/Actores';


@Component({
  selector: 'app-dialogo-add-escritura',
  templateUrl: './dialogo-add-escritura.component.html',
  styleUrls: ['./dialogo-add-escritura.component.css']
})
export class DialogoAddEscrituraComponent implements OnInit {

  form1: FormGroup;
  form2: FormGroup;
  columnas = ['dni', 'nombre', 'tipoactor', 'estadocivil', 'ciudad', 'eliminar'];
  formSubmitAttempt: boolean;
  formSubmitAttempt2: boolean;
  documentos: Escrituras [];
  tiposa: Tiposa [];
  estadosc: Estadosc [];
  ciudades: Ciudades [];
  actores: Actores[] = [];
  dataSource = new MatTableDataSource<Actores>();
  ciudad: string;
  idciudad = '';
  tipoa: string;
  idtipoa = '';
  estadoc: string;
  idestadoc = '';
  ciudadesfilter: Observable<any[]>;
  private _success = new Subject<string>();
  mensaje: string;
  formv: boolean;

  constructor(private fb: FormBuilder,
              private fb2: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private conexion: ConexionService,
              public dialogRef: MatDialogRef<DialogoAddEscrituraComponent>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.formv = true;
    this.form1 = this.fb.group(
      {
        iddocumento: ['', Validators.required],
        precio: ['', Validators.required],
        ubicacion: ['', Validators.required],
        descripcion: ['', Validators.required]
      }
    );
    this.form2 = this.fb2.group(
      {
        idtipoa: ['', Validators.required],
        dni: ['', Validators.required],
        nombre: ['', Validators.required],
        telefono: ['', Validators.required],
        idestadoc: ['', Validators.required],
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required]
      }
    );
    this._success.subscribe((message) => this.mensaje = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.mensaje = null);
    this.LlenarEscrituras();
    this.LlenarTiposa();
    this.LlenarCiudades();
    this.LlenarEstadosc();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form1.get(field).valid && this.form1.get(field).touched) ||
      (this.form1.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isFieldInvalid2(field: string) {
    return (
      (!this.form2.get(field).valid && this.form2.get(field).touched) ||
      (this.form2.get(field).untouched && this.formSubmitAttempt2)
    );
  }

  AgregarActores() {
    if (!('' !== this.form2.get('dni').value && '' !== this.form2.get('nombre').value
      && '' !== this.form2.get('telefono').value && '' !== this.form2.get('direccion').value
      && this.idciudad !== '' && this.idtipoa !== '' && this.idestadoc !== '')) {
      this._success.next('Complete el formulario');
    } else {
      const dni = this.form2.get('dni').value;
      const nombre = this.form2.get('nombre').value;
      const telefono = this.form2.get('telefono').value;
      const direccion = this.form2.get('direccion').value;
      if (!(this.actores.some(x => x.dni === dni))) {
        this.actores.push(new Actores(this.tipoa, this.idtipoa, dni, nombre, telefono,
          this.estadoc, this.idestadoc, this.ciudad, this.idciudad, direccion));
        this.dataSource.data = this.actores as Actores[];
        this.form2.patchValue({
          idtipoa: '',
          dni: '',
          nombre: '',
          telefono: '',
          idestadoc: '',
          ciudad: '',
          direccion: ''
        });
      } else {
        this._success.next('Este actor ya esta agregado');
      }
    }
  }

  CiudadSeleccionada(id: number, nombre: string) {
    this.idciudad = id.toString();
    this.ciudad = nombre;
  }

  TipoaSeleccionado(id: number, nombre: string) {
    this.idtipoa = id.toString();
    this.tipoa = nombre;
  }

  Estadocselecionado(id: number, nombre: string) {
    this.idestadoc = id.toString();
    this.estadoc = nombre;
  }

  Mostrar() {
    if (!('' !== this.form1.get('precio').value && '' !== this.form1.get('ubicacion').value
      && '' !== this.form1.get('descripcion').value && '' !== this.form1.get('iddocumento').value
      && Object.keys(this.dataSource.data).length !== 0)) {
      this._success.next('Complete los formularios');
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        data: this.dataSource.data, precio: this.form1.get('precio').value,
        ubicacion: this.form1.get('ubicacion').value, descr: this.form1.get('descripcion').value,
        iddoc: this.form1.get('iddocumento').value
      };
      dialogConfig.width = '1000px';
      dialogConfig.height = '800px';
      dialogConfig.hasBackdrop = true;
      const dialogRef = this.dialog.open(DialogEscrituraPruebaComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Escritura registrada correctamente') {
          this.dialogRef.close(result);
        }
      });
    }
  }

  private LlenarEscrituras() {
    const formData = new FormData;
    formData.append('accion', 'escrituras');
    this.conexion.servicio(formData).subscribe(
      escrituras => {
        Object.keys(escrituras).map((key) => {
          if (key === 'escrituras') {
            this.documentos = escrituras[key];
          }
        });
      }
    );
  }

  private LlenarTiposa() {
    const formData = new FormData;
    formData.append('accion', 'tiposa');
    this.conexion.servicio(formData).subscribe(
      tiposa => {
        Object.keys(tiposa).map((key) => {
          if (key === 'tiposa') {
            this.tiposa = tiposa[key];
          }
        });
      }
    );
  }

  private LlenarCiudades() {
    const formData = new FormData;
    formData.append('accion', 'ciudades');
    this.conexion.servicio(formData).subscribe(
      ciudades => {
        Object.keys(ciudades).map((key) => {
          if (key === 'ciudades') {
            this.ciudades = ciudades[key];
            this.ciudadesfilter = this.form2.get('ciudad').valueChanges
              .pipe(
                startWith(''),
                map(value => this._filter(value))
              );
          }
        });
      }
    );
  }

  private _filter(value: string): any[] {
    return this.ciudades.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  private LlenarEstadosc() {
    const formData = new FormData;
    formData.append('accion', 'estadosc');
    this.conexion.servicio(formData).subscribe(
      estadosc => {
        Object.keys(estadosc).map((key) => {
          if (key === 'estadosc') {
            this.estadosc = estadosc[key];
          }
        });
      }
    );
  }

  GuardarDoc() {
    if (!('' !== this.form1.get('iddocumento').value && '' !== this.form1.get('precio').value
      && '' !== this.form1.get('ubicacion').value && '' !== this.form1.get('descripcion').value)) {
      this._success.next('Complete el formulario');
    } else {
      this.formv = false;
    }
  }

  Eliminar(row: any) {
    this.actores.splice(row, 1);
    // console.log(this.compras);
    this.dataSource.data = this.actores as Actores[];
  }

  Cancelar() {
    this.dialogRef.close('Cancelado');
  }
}
