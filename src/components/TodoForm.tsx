import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const TodoForm: React.FC = () => {
    const [text, setText] = useState('');
    const { addTodo } = useTodo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new todo..."
                    className="todo-input"
                    maxLength={200}
                />
                <button type="submit" className="add-btn" disabled={!text.trim()}>
                    Add Todo
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
