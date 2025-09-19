import { TodoProvider } from './context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="app">
        <header className="app-header">
          <h1>📝 Todo App</h1>
          <p>Stay organized and productive</p>
        </header>

        <main className="app-main">
          <TodoForm />
          <TodoList />
        </main>

        <footer className="app-footer">
          <p>Built with React + TypeScript + Vite</p>
        </footer>
      </div>
    </TodoProvider>
  );
}

export default App;
