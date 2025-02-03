import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Balance } from '../../../Model/Balance';
import { BalanceService } from '../../../services/balance.service';
import { IncomesService } from '../../../services/incomes.service';
import { ExpensesService } from '../../../services/expenses.service';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ConfigChartService } from '../../../services/config-chart.service';
import { DesignerService } from '../../../services/designer.service';
import { HttpHeaders } from '@angular/common/http';
import { totalmem } from 'os';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  totalBalance:number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  balance = new Balance();
  
  constructor(private balanceService: BalanceService,
    private incomeService: IncomesService,
    private expenseService: ExpensesService,
    private cd: ChangeDetectorRef
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

  //Codigo relacionado a gráficos

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  configService = inject(ConfigChartService);
  designerService = inject(DesignerService);

  updateBalance(){
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    this.balanceService.updateBalance(year, month).subscribe(
      () => {
        alert("Balance Updated");   
      },
      (error) => {
        console.error("Erro ao atualizar balance", error);
        alert("Erro ao atualizar balance!");
      }
    );
  }


  themeEffect = effect(() => {
    if (this.configService.transitionComplete()) {
      if (this.designerService.preset()) {
        this.initChart();
      }
    }
  });

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
  
      this.data = {
        labels: ['Expenses', 'Incomes'],
        datasets: [
          {
            data: [this.totalExpenses, this.totalIncomes],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-red-500'),
              documentStyle.getPropertyValue('--p-green-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-red-400'),
              documentStyle.getPropertyValue('--p-green-400'),
            ],
          },
        ],
      };
  
      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
  
      this.cd.markForCheck(); 
    }
  }
}