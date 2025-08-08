export class TaskManager {
    private tasks: { id: number; title: string; completed: boolean }[] = [];
    private nextId: number = 1;

    addTask(title: string): void {
        this.tasks.push({ id: this.nextId++, title, completed: false });
    }

    updateTask(id: number, title: string): boolean {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.title = title;
            return true;
        }
        return false;
    }

    deleteTask(id: number): boolean {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    getTasks(): { id: number; title: string; completed: boolean }[] {
        return this.tasks;
    }

    completeTask(id: number): boolean {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            return true;
        }
        return false;
    }
}