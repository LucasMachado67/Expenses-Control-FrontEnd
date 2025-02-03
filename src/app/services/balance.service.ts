import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../evironment';
import { Observable } from 'rxjs';
import { Balance } from '../Model/Balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  readonly url = environment.url;

  constructor(private Http:HttpClient) { }

  
  createBalance(balance: Balance):Observable<Balance>{
    return this.Http.post<Balance>(this.url + "/balance/new", balance);
  }

  updateBalance(year:number, month:number){
    return this.Http.post(this.url + "/balance/update", {year , month})
  }
  
  getBalanceByMonth():Observable<Balance>{
    return this.Http.get<Balance>(this.url + "/balance/month");
  }

  getTotalInBalance():Observable<number>{
   return this.Http.get<number>(this.url + "/balance/total")
  }
  
}
