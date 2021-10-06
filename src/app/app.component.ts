import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { Company } from './data/schemas/company';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit{

  companies:Company[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Company>;

  dataSource:MatTableDataSource<Company>
  displayedColumns: string[] = ['id', 'name', 'addres', 'foundation_date', 'nit', 'action'];
  
  constructor(
    public dialog:MatDialog
  ){}

  openDialogCreateCompany(): void{

    const dialogRef =  this.dialog.open(CreateCompanyComponent, {
      width: '300px',
      disableClose: true
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          result["id"] = Math.random().toString(36).substr(2, 9);
          this.companies.push(result)
          this.updateLocalStorageAndCompanies()
        }
      })

  }

  openDialogEditCompany(companyToUpdate:Company){

    const dialogRef =  this.dialog.open(EditCompanyComponent, {
      width: '300px',
      disableClose: true,
      data: companyToUpdate
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.companies = this.companies.map(company => {
            if(company.id === result.id){
              return result
            }else{
              return company
            }
          })
          

          
          this.updateLocalStorageAndCompanies()

        }
      })
  }


  deleteCompany(id:string){

    if(confirm("Are you sure you remove the company?")){

      this.companies =  this.companies.filter(company => company.id !== id)

      this.dataSource  = new MatTableDataSource(this.companies)

      this.updateLocalStorageAndCompanies()
    }
  }

  ngOnInit(): void{
    this.companies = JSON.parse(localStorage.getItem("companies")) || [];    

    this.dataSource =  new MatTableDataSource(this.companies)
  }

  //Paginación
  ngAfterViewInit(): void{ 
    this.dataSource.paginator = this.paginator
  }

  // Actualizar el localStorage y la lista de compañias(companies)
  updateLocalStorageAndCompanies(): void{
    this.dataSource = new MatTableDataSource(this.companies)
    localStorage.setItem("companies", JSON.stringify(this.companies))
  }

}