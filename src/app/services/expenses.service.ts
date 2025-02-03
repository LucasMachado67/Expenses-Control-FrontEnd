import { Injectable } from '@angular/core';
import { environment } from '../../evironment';
import { Observable } from 'rxjs';
import { Expense } from '../Model/Expense';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  readonly url = environment.url;
    constructor(private Http:HttpClient) { }
  
    select():Observable<Expense[]>{
      return this.Http.get<Expense[]>(this.url + "/Expenses/all");
    }
  
    selectById():Observable<Expense>{
      return this.Http.get<Expense>(this.url + "/Expenses/" + Expense)
    }
  
    getTotalExpenses():Observable<number>{
      return this.Http.get<number>(this.url + "/Expenses/number")
    }
  
    createExpense(expense: Expense):Observable<Expense>{
      return this.Http.post<Expense>(this.url + "/Expenses/new", expense)
    }
  
    updateExpense(expense: Expense):Observable<Expense>{
      return this.Http.put<Expense>(this.url + "/Expenses/update", expense)
    }
  
    deleteExpense(id: number):Observable<void>{
      console.log(`Deleting Expense with ID: ${id}`);
      return this.Http.delete<void>(`${this.url}/Expenses/${id}`)
    }
}
