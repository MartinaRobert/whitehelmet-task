import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog.component';
import { AttractionService } from '../attraction.service';
import { UserUpdateDialogComponent } from '../../users/users/user-update-dialog.component';
import { CreateUpdateAttractionDialogComponent } from '../create-update-attraction-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attractions-list',
  templateUrl: './attractions-list.component.html',
  styleUrl: './attractions-list.component.scss'
})
export class AttractionsListComponent {
  displayedColumns: string[] = ['coverimage','name', 'detail',"location", 'actions'];
  dataSource = new MatTableDataSource<any>();
  search:string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  pagination:any;
  currentPage = 0;
  pageSize = 5;
  totalItems = 0; 
  
  constructor(private attractionService: AttractionService, private dialog: MatDialog,private toastr:ToastrService) { }

  ngOnInit() {
    this.loadAttractions();
  }


  loadAttractions() {
    let pagination = { page: this.currentPage+1, pageSize :this.pageSize}

    this.attractionService.getAttractions(pagination, this.search , this.sort?.direction,this.sort?.active).subscribe((attractions:any) => {
      this.dataSource.data = attractions.data;
      this.totalItems = attractions.total;
      this.toastr.success('Attraction loadded successfully')
    });
  }

  applyFilter() {
    this.loadAttractions();
  }

  deleteAttractions(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.attractionService.deleteAttraction(id).subscribe((result:any) =>{
          if(result.status =='error'){
            this.toastr.error(result.message)
          }else{
            this.toastr.success('Attraction deleted successfully')
          }
           this.loadAttractions()});
      } else {
        console.log('Dialog was cancelled or closed without saving.');
      }
    });
  }

  updateAttraction(attraction:any){
    this.attractionService.updateAttraction(attraction).subscribe((result:any)=> {
      if(result.status !='error'){
        this.toastr.success('attraction updated successfully')
        this.loadAttractions()
      }else{
        this.toastr.error(result.message)
      }

    }
    );
  }
  createAttraction(attraction:any){
    this.attractionService.createAttraction(attraction).subscribe((result:any)=>{
      this.toastr.success('Attraction created successfully')
      this.loadAttractions()
    })
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAttractions();
  }
  openUpdateDialog(attraction: any): void {
    let data ={
      attraction:attraction,
      isUpdate:true
    }
    const dialogRef = this.dialog.open(CreateUpdateAttractionDialogComponent, {
      width: '500px', 
      data: data 
    });

    dialogRef.afterClosed().subscribe((result: any | undefined) => {
    
      if (result) {
        this.updateAttraction(result);
      } else {
        console.log('Dialog was cancelled or closed without saving.');
      }
    });
  }

  openCreateDialog(): void {
    let data = {
      attraction: { id: '', name: '', detail: '', latitude: '', longitude:''},
      isUpdate: false
    }
    const dialogRef = this.dialog.open(CreateUpdateAttractionDialogComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: any | undefined) => {

      if (result) {
        this.createAttraction(result);
      } else {
        console.log('Dialog was cancelled or closed without saving.');
      }
    });
  }
  onSortChange(event: any): void {
    this.loadAttractions();
   
  }

}
