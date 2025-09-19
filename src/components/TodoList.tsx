import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import SearchBar from './SearchBar';

const TodoList: React.FC = () => {
    const { todos, searchTodos } = useTodo();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTodos = searchQuery
        ? searchTodos(searchQuery)
        : todos.filter(todo => {
            switch (filter) {
                case 'active':
                    return !todo.completed;
                case 'completed':
                    return todo.completed;
                default:
                    return true;
            }
        });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const todoCounts = {
        total: todos.length,
        active: todos.filter(todo => !todo.completed).length,
        completed: todos.filter(todo => todo.completed).length,
    };

    return (
        <div className="todo-list-container">
            <SearchBar onSearch={handleSearch} />

            <div className="filter-tabs">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All ({todoCounts.total})
                </button>
                <button
                    className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active ({todoCounts.active})
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed ({todoCounts.completed})
                </button>
            </div>

            <div className="todo-list">
                {filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        {searchQuery ? (
                            <p>No todos found matching "{searchQuery}"</p>
                        ) : filter === 'active' ? (
                            <p>No active todos! 🎉</p>
                        ) : filter === 'completed' ? (
                            <p>No completed todos yet</p>
                        ) : (
                            <p>No todos yet. Add one above! 📝</p>
                        )}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
