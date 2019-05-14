import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../../Servicios/usuario.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConexionService} from '../../Servicios/conexion.service';
import {Usuario} from '../../Data/Usuario';
import {DialogAddUsuComponent} from '../../Dialogos/dialog-add-usu/dialog-add-usu.component';
import {DialogComprobacionComponent} from '../../Dialogos/dialog-comprobacion/dialog-comprobacion.component';
import {DialogEditUsuComponent} from 'src/app/Dialogos/dialog-edit-usu/dialog-edit-usu.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  habilitaradd: boolean;
  columnas = ['id', 'nombre', 'tipo', 'fecha', 'actualizar', 'eliminar'];
  habilitaredit: boolean;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Usuario>();
  usuarios: Usuario[];

  constructor(private usuario: UsuarioService,
              private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarUsuarios();
    const objusu = this.usuario.getUsuarioLogeadoen();
    const objusu1 = objusu[0];
    if (objusu1['tipo'] === '2') {
      this.habilitaredit = true;
      this.habilitaradd = true;
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogAddUsuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarUsuarios();
      // console.log(result);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  Eliminar(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    // dialogConfig.width = '600px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogComprobacionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const formData = new FormData;
        formData.append('accion', 'del_usu');
        formData.append('id', id.toString());
        this.conexion.servicio(formData).subscribe(
          ventas => {
            Object.keys(ventas).map((key) => {
              if (key === 'mensaje') {
                alert(ventas[key]);
                this.LlenarUsuarios();
              }
            });
          }
        );
      }
    });
  }

  Modificar(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {row};
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogEditUsuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarUsuarios();
      // console.log(result);
    });
  }

  private LlenarUsuarios() {
    const formData = new FormData;
    formData.append('accion', 'usuarios');
    this.usuarios = null;
    this.conexion.servicio(formData).subscribe(
      usuarios => {
        Object.keys(usuarios).map((key) => {
          if (key === 'usuarios') {
            this.usuarios = usuarios[key];
            // this.dataSource = new Datasource(this.paginacion, this.ordenar, this.ventas);
            this.dataSource.data = usuarios[key] as Usuario[];
            // console.log(key);
            // console.log(ventas[key]);
          } else {
            this.usuarios = null;
          }
        });
      }
    );
  }
}
