import { IStatus } from './status';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private readonly API = `${environment.API}status`;

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<IStatus[]>(this.API);
  }
}
