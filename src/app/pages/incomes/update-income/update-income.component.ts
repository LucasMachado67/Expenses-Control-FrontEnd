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
  selector: 'app-update-income',
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
  templateUrl: './update-income.component.html',
  styleUrl: './update-income.component.scss'
})
export class UpdateIncomeComponent {

  income = new  Income();
  incomes:Income[] = [];

  constructor(private service: IncomesService, private router: Router){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { income: Income };
    if (state?.income) {
      this.income = state.income;
    }
  }

  update() {
    this.service.updateIncome(this.income).subscribe(
      updatedIncome => {
        const index = this.incomes.findIndex(income => income.id === updatedIncome.id);
        if (index !== -1) {
          this.incomes[index] = updatedIncome;
        }
        this.income = new Income();
        alert("Income successfully updated!");
        this.router.navigate(["/incomes"])
      },
      error => {
        console.error("Failed to update income:", error);
        alert("Failed to update income. Please try again.");
      }
    );
  }
  
}
