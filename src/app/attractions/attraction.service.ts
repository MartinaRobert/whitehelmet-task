import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {
  //https://www.melivecode.com/api/auth/attractions/create
  constructor(private http: HttpClient) { }
  private baseUrl = 'https://melivecode.com/api/attractions';
  private authBaseUrl ='https://www.melivecode.com/api/auth/attractions'
   token = sessionStorage.getItem('token');
 headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${this.token} `,
});
  getAttractions(pagination:any,search?:any, sort?:any ,column?:any) {
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

  createAttraction(attraction: any) {
    
    return this.http.post(`${this.authBaseUrl}/create`, attraction, { headers: this.headers });
  }

  updateAttraction(attraction: any) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token} `, 
        });
    return this.http.put(`${this.authBaseUrl}/update`, attraction, { headers: headers });
  }

  deleteAttraction(id: number) {
       return this.http.delete(`${this.authBaseUrl}/delete`, { body: { id },  headers: this.headers  }, );
  }
}
