import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

const adminURL="http://localhost:9001/admin"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  adminLogin(adminMail: string, adminPwd: string):Observable<Admin> {
    return this.http.get<Admin>(`${adminURL}/login/${adminMail}/${adminPwd}`);
  }

  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${adminURL}/${adminId}`);
  }

  deleteAdmin(adminId: number): Observable<Admin> {
    return this.http.delete(`${adminURL}/${adminId}`);
  }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${adminURL}`);
  }
}
