import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service';
import { Balance } from '../../Model/Balance';
import { ExpensesService } from '../../services/expenses.service';
import { IncomesService } from '../../services/incomes.service';


@Component({
  selector: 'app-balance-card',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.scss'
})
export class BalanceCardComponent implements OnInit{

  totalBalance:number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  balance = new Balance();
  
  constructor(private balanceService: BalanceService,
    private incomeService: IncomesService,
    private expenseService: ExpensesService
  ){}
  
  getTotals(){
    this.balanceService.getTotalInBalance().subscribe(
      (data:number) => {
        this.totalBalance = data;
      }
    )

    this.incomeService.getTotalIncomes().subscribe(
      (data:number) => {
        this.totalIncomes = data;
      }
    )

    this.expenseService.getTotalExpenses().subscribe(
    (data:number) => {
      this.totalExpenses = data;
    }
    )
  }
  
  getBalanceByMonth(){
    this.balanceService.getBalanceByMonth().subscribe(
      (retorno) => {
        this.balance = retorno;
      }
    )
  }
  
  ngOnInit(): void {
    this.getBalanceByMonth();
    this.getTotals();
  }

}
