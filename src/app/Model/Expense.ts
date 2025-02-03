export class Expense {

    id: number | null = null;
    expenseName: String = "";
    description: String = "";
    quantity: number = 0;
    amount: number = 0.0;
    year: number = new Date().getFullYear();
    month: number =  new Date().getMonth();
    category: String = "";
}