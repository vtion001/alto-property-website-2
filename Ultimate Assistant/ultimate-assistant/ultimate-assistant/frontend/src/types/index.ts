export interface Email {
    id: string;
    subject: string;
    body: string;
    sender: string;
    recipient: string;
    timestamp: Date;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: Date;
}

export interface FinancialRecord {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    date: Date;
}