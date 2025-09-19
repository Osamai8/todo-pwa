export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, newText: string) => void;
    toggleComplete: (id: string) => void;
    searchTodos: (query: string) => Todo[];
}
