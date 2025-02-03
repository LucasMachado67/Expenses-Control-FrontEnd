import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { IncomesService } from '../../../services/incomes.service';
import { Income } from '../../../Model/Income';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-income',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    IftaLabelModule ,
    InputNumberModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './create-income.component.html',
  styleUrl: './create-income.component.scss'
})
export class CreateIncomeComponent {
  
  income = new Income();
  constructor(private service: IncomesService, private router: Router){}

  create(): void{
    if(this.income.incomeName == "" ||
       this.income.amount < 0 ||
       this.income.description == "" ||
       this.income.quantity < 0 ||
       this.income.year < 2025 ||
       this.income.month < 0 || 
       this.income.category == ""
      ){
        return alert("Data Missing, Please Fill all Fields");
      }
    this.service.createIncome(this.income)
    .subscribe(retorno => {

        this.income = retorno

        this.income = new Income();
        
        alert("Income Succesfully Created!")
        this.router.navigate(["/incomes"])
    })
  }
}
