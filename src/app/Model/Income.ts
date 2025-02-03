export class Income {

    id:number | null = null;
    incomeName: String = "";
    description: String = "";
    quantity: number = 0;
    amount: number = 0.0;
    year: number = new Date().getFullYear();
    month: number = 0;
    category: String = "";
}