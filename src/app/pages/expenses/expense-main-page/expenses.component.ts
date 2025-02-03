import { Component } from '@angular/core';
import { ExpensesService } from '../../../services/expenses.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { Expense } from '../../../Model/Expense';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    HttpClientModule
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {

  
    expense1!: Expense[];
    expense = new Expense();
    expenses:Expense[] = [];
    allExpenses: any[] = [];
    totalExpenses: number = 0;
    first = 0;
    code:number = 0;
    rows = 0;
  
    constructor(private expenseService:ExpensesService, private router: Router){}
  
    selectFromDataBase(): void{
      this.expenseService.select().subscribe(
        (retorno) => {
          this.allExpenses = retorno;
          this.expenses = this.allExpenses;
        }
      )
    }
  
    getTotalExpenses():void {
      this.expenseService.getTotalExpenses().subscribe(
        (data: number) => {
          this.totalExpenses = data;
        }
      )
    }
  
    navigateToUpdate(expense: Expense) {
    
      this.router.navigate(['/expenses/update'], { state: { expense } });
    }
  
    selectExpense(expense: Expense): void {
      this.expense = { ...expense }; 
    }
  
    deleteExpenseById():void{
      this.code = Number(this.expense.id);
      
      this.expenseService.deleteExpense(this.code).subscribe(
        (retorno) => {
          
          let position = this.expenses.findIndex(obj => obj.id === this.code);
          this.expenses.splice(position, 1);
          this.expense = new Expense();
          alert("Expense removed!");
        }
      );
    }
  
    ngOnInit(){
      this.selectFromDataBase();
      this.getTotalExpenses();
    }
  
    next() {
      this.first = this.first + this.rows;
    }
  
    prev() {
      this.first = this.first - this.rows;
    }
  
    reset() {
      this.first = 0;
    }
  
    pageChange(event: { first: number; rows: number; }) {
      this.first = event.first;
      this.rows = event.rows;
    }
  
    isLastPage(): boolean {
      return this.expense1 ? this.first + this.rows >= this.expense1.length : true;
    }
  
    isFirstPage(): boolean {
      return this.expense1 ? this.first === 0 : true;
    }
  
  
}
