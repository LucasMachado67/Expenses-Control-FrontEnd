import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ExpensesService } from '../../../services/expenses.service';
import { Expense } from '../../../Model/Expense';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-expense',
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
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.scss'
})
export class CreateExpenseComponent {

  expense = new Expense();
  constructor(private service: ExpensesService, private router: Router){}
  
  
    create(): void{
      if(this.expense.expenseName == "" ||
         this.expense.amount < 0 ||
         this.expense.description == "" ||
         this.expense.quantity < 0 ||
         this.expense.year < 2025 ||
         this.expense.month < 0 || 
         this.expense.category == ""
        ){
          return alert("Data Missing, Please Fill all Fields");
        }
      this.service.createExpense(this.expense)
      .subscribe(retorno => {
  
          this.expense = retorno
  
          this.expense = new Expense();
          
          alert("Expense Succesfully Created!")
          this.router.navigate(["/expenses"])
      })
    }
}
