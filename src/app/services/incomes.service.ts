import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Income } from '../Model/Income';
import { environment } from '../../evironment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  readonly url = environment.url;
  constructor(private Http:HttpClient) { }

  select():Observable<Income[]>{
    return this.Http.get<Income[]>(this.url + "/Incomes/all");
  }

  selectById():Observable<Income>{
    return this.Http.get<Income>(this.url + "/Incomes/" + Income)
  }

  getTotalIncomes():Observable<number>{
    return this.Http.get<number>(this.url + "/Incomes/number")
  }

  createIncome(income: Income):Observable<Income>{
    return this.Http.post<Income>(this.url + "/Incomes/new", income)
  }

  updateIncome(income: Income):Observable<Income>{
    return this.Http.put<Income>(this.url + "/Incomes/update", income)
  }

  deleteIncome(id: number):Observable<void>{
    console.log(`Deleting income with ID: ${id}`);
    return this.Http.delete<void>(`${this.url}/Incomes/${id}`)
  }
}
