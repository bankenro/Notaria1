import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ConexionService} from '../../Servicios/conexion.service';
import {Escrituras} from '../../Data/Escrituras';
import {Documentos} from '../../Data/Documentos';
import {Allescrituras} from '../../Data/allescrituras';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DialogoAddEscrituraComponent} from '../../Dialogos/dialogo-add-escritura/dialogo-add-escritura.component';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-escrituras',
  templateUrl: './escrituras.component.html',
  styleUrls: ['./escrituras.component.css']
})
export class EscriturasComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Allescrituras>();
  escrituras: Escrituras [];
  documentos: Documentos [];
  allescrituras: Allescrituras [];
  columnas = ['id', 'documento', 'actores', 'usuario', 'estado', 'ubicacionf', 'ubicacionv'];
  form: FormGroup;

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      iddocumento: [''],
      idescritura: ['']
    });
    this.Documentos();
    this.Escrituras();
    this.MostrarEscrituras();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  private Documentos() {
    const formData = new FormData;
    formData.append('accion', 'docs');
    this.conexion.servicio(formData).subscribe(
      docs => {
        Object.keys(docs).map((key) => {
          if (key === 'docs') {
            this.documentos = docs[key];
          }
        });
      }
    );
  }

  private Escrituras() {
    const formData = new FormData;
    formData.append('accion', 'escrituras');
    this.conexion.servicio(formData).subscribe(
      escrituras => {
        Object.keys(escrituras).map((key) => {
          if (key === 'escrituras') {
            this.escrituras = escrituras[key];
          }
        });
      }
    );
  }

  private MostrarEscrituras() {
    const formData = new FormData;
    formData.append('accion', 'allescr');
    formData.append('iddoc', this.form.get('iddocumento').value);
    formData.append('ides', this.form.get('idescritura').value);
    this.allescrituras = [];
    this.conexion.servicio(formData).subscribe(
      escrituras => {
        Object.keys(escrituras).map((key) => {
          if (key === 'escrituras') {
            this.allescrituras = escrituras[key];
            this.dataSource.data = escrituras[key] as Allescrituras[];
          } else {
            this.allescrituras = [];
          }
        });
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.width = '800px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogoAddEscrituraComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.MostrarEscrituras();
      // console.log(result);
    });
  }

  AbrirPDF(ubicacionv: string) {
    this.document.location.href = ubicacionv;
  }
}
