import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {LoginComponent} from './Componentes/login/login.component';
import {HeaderComponent} from './UI/header/header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {EscriturasComponent} from './Componentes/escrituras/escrituras.component';
import {RouterModule} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {UsuariosComponent} from './Componentes/usuarios/usuarios.component';
import {DialogoAddEscrituraComponent} from './Dialogos/dialogo-add-escritura/dialogo-add-escritura.component';
import { DialogEscrituraPruebaComponent } from './Dialogos/dialog-escritura-prueba/dialog-escritura-prueba.component';
import { ProgressSpinnerComponent } from './Dialogos/progress-spinner/progress-spinner.component';
import { DialogAddUsuComponent } from './Dialogos/dialog-add-usu/dialog-add-usu.component';
import { DialogComprobacionComponent } from './Dialogos/dialog-comprobacion/dialog-comprobacion.component';
import { DialogEditUsuComponent } from './Dialogos/dialog-edit-usu/dialog-edit-usu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    EscriturasComponent,
    UsuariosComponent,
    DialogoAddEscrituraComponent,
    DialogEscrituraPruebaComponent,
    ProgressSpinnerComponent,
    DialogAddUsuComponent,
    DialogComprobacionComponent,
    DialogEditUsuComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbAlertModule,
    RouterModule.forRoot(
      [
        {path: 'login', component: LoginComponent},
        {path: 'escrituras', component: EscriturasComponent},
        {path: 'usuarios', component: UsuariosComponent}
      ]
    )
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoAddEscrituraComponent, DialogEscrituraPruebaComponent, ProgressSpinnerComponent,
    DialogAddUsuComponent, DialogEditUsuComponent, DialogComprobacionComponent]
})
export class AppModule {
}
