import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Actores} from '../../Data/Actores';
import {ComponentPortal} from '@angular/cdk/portal';
import {ProgressSpinnerComponent} from '../progress-spinner/progress-spinner.component';
import {Overlay} from '@angular/cdk/overlay';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dialog-escritura-prueba',
  templateUrl: './dialog-escritura-prueba.component.html',
  styleUrls: ['./dialog-escritura-prueba.component.css']
})
export class DialogEscrituraPruebaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private overlay: Overlay,
              private conexion: ConexionService,
              private usuario: UsuarioService,
              public dialogRef: MatDialogRef<DialogEscrituraPruebaComponent>) {
  }

  actores: Actores [] = [];
  precio;
  ubicacion;
  descr;
  tipo;
  actores1 = '';
  actores2 = '';
  iddocumento;
  array: string[];
  ngOnInit() {
    this.actores = this.data['data'];
    this.precio = this.data['precio'];
    this.ubicacion = this.data['ubicacion'];
    this.descr = this.data['descr'];
    this.iddocumento = this.data['iddoc'];
    console.log(this.actores);
    for (const row of this.actores) {
      if (row.idtipoa === '1') {
        this.actores1 += row.nombre + ' && ';
        console.log(this.actores1);
      }
      if (row.idtipoa === '2') {
        this.actores2 += row.nombre + ' && ';
        console.log(this.actores2);
      }
    }
    this.tipo = this.actores1 + ' --- ' + this.actores2;
  }

  Guardar() {
    const data = document.getElementById('pdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      // const pdf = new jspdf('p', 'mm', [297, 210]);
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // pdf.save('voucher.pdf'); // Generated PDF

      /*const spinner = this.overlay.create({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true
      }).attach(new ComponentPortal(ProgressSpinnerComponent));*/

      this.array = [];
      for (const row of this.actores) {
        this.array.push(row.dni.toString());
        this.array.push(row.nombre);
        this.array.push(row.telefono.toString());
        this.array.push(row.idtipoa.toString());
        this.array.push(row.isestadoc.toString());
        this.array.push(row.idciudad.toString());
        this.array.push(row.direccion);
      }
      const guardado = this.usuario.getUsuarioLogeadoen();
      const usuario = guardado[0];
      const formData = new FormData();
      const blob = pdf.output('blob');
      formData.append('accion', 'addgen');
      formData.append('doc', this.iddocumento);
      formData.append('pago', this.precio);
      formData.append('ubi', this.ubicacion);
      formData.append('desc', this.descr);
      formData.append('usuario', usuario['id']);
      formData.append('array', this.array.toString());
      formData.append('pdf', blob);
      this.conexion.servicio(formData).subscribe(
        respuesta => {
          Object.keys(respuesta).map((key) => {
            if (key === 'mensaje') {
              if (respuesta[key] === 'Escritura registrada correctamente') {
                // spinner.destroy();
                this.dialogRef.close(respuesta[key]);
              }
            }
          });
        }
      );
    });
  }

  Retroceder() {
    this.dialogRef.close('Cancelado');
  }
}
