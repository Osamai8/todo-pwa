import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const { deleteTodo, editTodo, toggleComplete } = useTodo();

    const handleEdit = () => {
        if (isEditing) {
            if (editText.trim() && editText !== todo.text) {
                editTodo(todo.id, editText);
            } else {
                setEditText(todo.text);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            deleteTodo(todo.id);
        }
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="todo-checkbox"
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        onBlur={handleEdit}
                        className="edit-input"
                        autoFocus
                        maxLength={200}
                    />
                ) : (
                    <span className="todo-text">{todo.text}</span>
                )}
            </div>

            <div className="todo-meta">
                <span className="todo-date">
                    {todo.updatedAt.getTime() !== todo.createdAt.getTime()
                        ? `Updated ${formatDate(todo.updatedAt)}`
                        : `Created ${formatDate(todo.createdAt)}`
                    }
                </span>
            </div>

            <div className="todo-actions">
                <button
                    onClick={handleEdit}
                    className="edit-btn"
                    title={isEditing ? 'Save' : 'Edit'}
                >
                    {isEditing ? '✓' : '✏️'}
                </button>
                <button
                    onClick={handleDelete}
                    className="delete-btn"
                    title="Delete"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
