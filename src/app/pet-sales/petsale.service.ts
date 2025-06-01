import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetsaleService {
  private baseUrl = ' https://www.melivecode.com/api/pets';

  constructor(private http: HttpClient) { }

  getSummary(date:string){
   return this.http.get(`${this.baseUrl}/7days/${date}`);
  }
  getDetails(date:string){
  return this.http.get(`${this.baseUrl}/${date}`)
  }
}
