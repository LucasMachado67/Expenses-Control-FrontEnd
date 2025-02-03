import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IncomesComponent } from './pages/incomes/income-main-page/incomes.component';
import { CreateIncomeComponent } from './pages/incomes/create-income/create-income.component';
import { UpdateIncomeComponent } from './pages/incomes/update-income/update-income.component';
import { ExpensesComponent } from './pages/expenses/expense-main-page/expenses.component';
import { CreateExpenseComponent } from './pages/expenses/create-expense/create-expense.component';
import { UpdateExpenseComponent } from './pages/expenses/update-expense/update-expense.component';
import { BalanceMainPageComponent } from './pages/balance/balance-main-page/balance-main-page.component';
import { DetailsComponent } from './pages/balance/details/details.component';

export const routes: Routes = [

    {
        path: '', redirectTo: 'home', pathMatch:'prefix' 
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'incomes', component: IncomesComponent
    },
    {
        path: 'incomes/new', component: CreateIncomeComponent
    },
    {
        path: 'incomes/update', component: UpdateIncomeComponent
    },
    {
        path: 'expenses', component: ExpensesComponent
    },
    {
        path: 'expenses/new', component: CreateExpenseComponent
    },
    {
        path: 'expenses/update', component: UpdateExpenseComponent
    },
    {
        path: 'balance', component: BalanceMainPageComponent
    },
    {
        path: 'balance/details', component: DetailsComponent
    }
];
