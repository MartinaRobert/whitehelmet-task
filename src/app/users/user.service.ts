import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://melivecode.com/api/users';
  constructor(private http: HttpClient) { }
  getUsers(pagination:any,search?:any, sort?:any ,column?:any) {
    let url = `${this.baseUrl}?page=${pagination.page}&per_page=${pagination.pageSize}`
    if(search){
      url += `&search=${search}`
    }
    if(column){
      url += `&sort_column=${column}`
    }
    if(sort){
      url +=`&sort_order=${sort}`
    }
    return this.http.get(url);
  }

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/create`, user);
  }

  updateUser(user: any) {
    return this.http.put(`${this.baseUrl}/update`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/delete`, { body: { id } });
  }

}
