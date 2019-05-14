import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule, MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    MatExpansionModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule {
}
