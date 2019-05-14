import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-comprobacion',
  templateUrl: './dialog-comprobacion.component.html',
  styleUrls: ['./dialog-comprobacion.component.css']
})
export class DialogComprobacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComprobacionComponent>) { }

  ngOnInit() {
  }

  Cancelar() {
    this.dialogRef.close('Cancelado');
  }

  Eliminar() {
    this.dialogRef.close(true);
  }
}
