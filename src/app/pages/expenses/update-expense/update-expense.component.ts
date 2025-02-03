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
  selector: 'app-update-expense',
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
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.scss'
})
export class UpdateExpenseComponent {

  expense = new Expense();
  expenses:Expense[] = [];

  constructor(private service:ExpensesService, private router: Router){
    const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as { expense: Expense };
        if (state?.expense) {
          this.expense = state.expense;
        }
  }

  update() {
      this.service.updateExpense(this.expense).subscribe(
        updatedExpense => {
          const index = this.expenses.findIndex(expense => expense.id === updatedExpense.id);
          if (index !== -1) {
            this.expenses[index] = updatedExpense;
          }
          this.expense = new Expense();
          alert("Expense successfully updated!");
          this.router.navigate(["/expenses"])
        },
        error => {
          console.error("Failed to update expense:", error);
          alert("Failed to update expense. Please try again.");
        }
      );
    }
}
