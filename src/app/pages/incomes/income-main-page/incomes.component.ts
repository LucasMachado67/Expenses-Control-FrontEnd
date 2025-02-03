import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { IncomesService } from '../../../services/incomes.service';
import { Income } from '../../../Model/Income';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    HttpClientModule
  ],
  providers:[IncomesService],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss'
})
export class IncomesComponent {

  incomes1!: Income[];
  income = new Income();
  incomes:Income[] = [];
  allIncomes: any[] = [];
  totalIncomes: number = 0;
  first = 0;
  code:number = 0;
  rows = 0;

  constructor(private incomeService:IncomesService, private router: Router){}

  selectFromDataBase(): void{
    this.incomeService.select().subscribe(
      (retorno) => {
        this.allIncomes = retorno;
        this.incomes = this.allIncomes;
      }
    )
  }

  getTotalIncomes():void {
    this.incomeService.getTotalIncomes().subscribe(
      (data: number) => {
        this.totalIncomes = data;
      }
    )
  }

  navigateToUpdate(income: Income) {
  
    this.router.navigate(['/incomes/update'], { state: { income } });
  }

  selectIncome(income: Income): void {
    this.income = { ...income }; 
  }

  deleteIncomeById():void{
    this.code = Number(this.income.id);
    
    this.incomeService.deleteIncome(this.code).subscribe(
      (retorno) => {
        
        let position = this.incomes.findIndex(obj => obj.id === this.code);
        this.incomes.splice(position, 1);
        this.income = new Income();
        alert("Income removed!");
      }
    );
  }

  ngOnInit(){
    this.selectFromDataBase();
    this.getTotalIncomes();
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
    return this.incomes1 ? this.first + this.rows >= this.incomes1.length : true;
  }

  isFirstPage(): boolean {
    return this.incomes1 ? this.first === 0 : true;
  }



}
