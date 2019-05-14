import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../Servicios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logeado: boolean;

  constructor(private router: Router,
              private usuarioservicio: UsuarioService) { }

  ngOnInit() {
    this.Visible();
  }

  Salir() {
    this.usuarioservicio.logout();
    this.logeado = false;
    this.router.navigate(['login']);
  }

  private Visible() {
    const val = this.usuarioservicio.getUsuarioLogeadoen();
    if (val != null && val !== '') {
      this.logeado = true;
      this.router.navigate(['escrituras']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
