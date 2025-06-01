import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateDialogComponent } from './user-update-dialog.component';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['image','fname','lname', 'username', 'actions'];
  dataSource = new MatTableDataSource<any>();
  search:string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  pagination:any;
  currentPage = 0;
  pageSize = 5;
  totalItems = 0; 
  
  constructor(private userService: UserService, private dialog: MatDialog,private toastr:ToastrService) { }

  ngOnInit() {
    this.loadUsers();
  }


  loadUsers() {
    let pagination = { page: this.currentPage+1, pageSize :this.pageSize}

    this.userService.getUsers(pagination, this.search , this.sort?.direction,this.sort?.active).subscribe((users:any) => {
      this.dataSource.data = users.data;
      this.totalItems = users.total;
      if(this.totalItems>0){
        this.toastr.success('Users loaded successfully')
      }
    });
  }

  applyFilter() {
    this.loadUsers();
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.userService.deleteUser(id).subscribe((result:any) => {
          if(result.status =='error'){
            this.toastr.error(result.message);
          }else{
            this.toastr.success('User Deleted successfully');
            this.loadUsers()
          }
        });
      } else {
        console.log('Dialog was cancelled or closed without saving.');
      }
    });
  }

  updateUser(user:any){
    this.userService.updateUser(user).subscribe((result:any)=> {
      if(result.status !='error'){
        this.toastr.error(result.message)
        this.loadUsers()
      }else{
        this.toastr.success('User Updated successfully');
      }

    }
    );
  }
  createUser(user:any){
    this.userService.createUser(user).subscribe((result:any)=>{
      this.toastr.success('User created successfully')
      this.loadUsers()
    })
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
  openUpdateDialog(user: any): void {
    let data ={
      user:user,
      isUpdate:true
    }
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '500px', 
      data: data 
    });

    dialogRef.afterClosed().subscribe((result: any | undefined) => {
    
      if (result) {
        this.updateUser(result);
      } else {
        console.log('Dialog was cancelled or closed without saving.');
      }
    });
  }

  openCreateDialog(): void {
    let data = {
      user: {id:'' , fname:'', lname:'',username:'', email:''},
      isUpdate: false
    }
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: any | undefined) => {

      if (result) {
        this.createUser(result);
      } else {
        console.log('Dialog was cancelled or closed without saving.');
      }
    });
  }
  onSortChange(event: any): void {
    this.loadUsers();
  }
}
