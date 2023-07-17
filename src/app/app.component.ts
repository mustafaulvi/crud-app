import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { PersonService } from './services/person.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud-app';
  displayedColumns: string[] = ['id', 'firstName', 'lastName','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( 
    private _dialog: MatDialog, 
    private _personServices: PersonService,
    private _coreService: CoreService){}

  ngOnInit(): void {
      this.getPersonList();
  }
  openAddEditPersonForm(){
    const dialogRef = this._dialog.open(PersonAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getPersonList();
        }
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPersonList(){
    this._personServices.getPersonList().subscribe({
      next: (res) => {
        console.log(res); 
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
          console.log(err);
      },
    });
  }
  deletePerson(id: number){
    this._personServices.deletePersonList(id).subscribe({
      next: (res) => {
          //alert('Person Deleted');
          this._coreService.openSnackBar('Person Deleted','done');
          this.getPersonList();
      },
      error: console.log,
    })
  }

  openEditPersonForm(data:any){
    const dialogRef =  this._dialog.open(PersonAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getPersonList();
        }
      }
    })
  }
} 
 