import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatCardModule, MatCheckboxModule, 
    MatTabsModule, MatButtonModule, MatSnackBar, 
    MatSnackBarModule, MatToolbarModule
    , MatMenuModule, MatSortModule, 
    MatExpansionModule, MatPaginatorModule, 
    MatTableModule, MatSidenavModule, MatListModule,
    MatIconModule, MatDialogModule } from '@angular/material'

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatSortModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatTableModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        MatCheckboxModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatSortModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatTableModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [],
    providers:[MatSnackBar]
})
export class MaterialModule { }
