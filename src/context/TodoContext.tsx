/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type Todo, type TodoContextType } from '../types/Todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const editTodo = (id: string, newText: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, text: newText.trim(), updatedAt: new Date() }
                    : todo
            )
        );
    };

    const toggleComplete = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
                    : todo
            )
        );
    };

    const searchTodos = (query: string): Todo[] => {
        if (!query.trim()) return todos;
        return todos.filter(todo =>
            todo.text.toLowerCase().includes(query.toLowerCase())
        );
    };

    const value: TodoContextType = {
        todos,
        addTodo,
        deleteTodo,
        editTodo,
        toggleComplete,
        searchTodos,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
