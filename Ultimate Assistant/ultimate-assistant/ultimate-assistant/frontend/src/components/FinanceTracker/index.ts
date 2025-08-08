export class FinanceTracker {
    private income: number;
    private expenses: number;

    constructor() {
        this.income = 0;
        this.expenses = 0;
    }

    public addIncome(amount: number): void {
        this.income += amount;
    }

    public addExpense(amount: number): void {
        this.expenses += amount;
    }

    public getBalance(): number {
        return this.income - this.expenses;
    }

    public getIncome(): number {
        return this.income;
    }

    public getExpenses(): number {
        return this.expenses;
    }
}