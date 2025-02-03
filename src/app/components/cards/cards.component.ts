import { Component, OnInit} from '@angular/core';
import { IncomesService } from '../../services/incomes.service';
import { ButtonModule } from 'primeng/button';
import { ExpensesService } from '../../services/expenses.service';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{

  totalIncomes: number = 0;
  totalExpenses: number = 0;
  totalBalance: number = 0;
  constructor(
    private incomeService:IncomesService,
    private expenseService: ExpensesService,
    private balanceService: BalanceService
  ){}

  getTotalIncomes(){
    this.incomeService.getTotalIncomes().subscribe(
      (data:number) => {
        this.totalIncomes = data
      }
    )
  }

  getTotalExpenses(){
    this.expenseService.getTotalExpenses().subscribe(
      (data: number) => {
        this.totalExpenses = data;
      }
    )
  }

  getTotalBalance(){
    this.balanceService.getTotalInBalance().subscribe(
      (data: number) => {
        this.totalBalance = data;
      }
    )
  }

  ngOnInit(): void {
    this.getTotalBalance();
    this.getTotalIncomes();
    this.getTotalExpenses();
  }


}
