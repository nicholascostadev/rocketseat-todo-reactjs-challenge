import './global.css';
import styles from './App.module.css';

import { Header } from './Header';
import { Input } from './Input';
import { TasksHeader } from './TasksHeader';
import { useEffect, useState } from 'react';
import { Todo } from './Todo';
import { ToastContainer } from 'react-toastify';

interface TodoType {
	id: string;
	isDone: boolean;
	content: string;
}

function App() {
	const [todos, setTodos] = useState<TodoType[]>([]);

	useEffect(() => {
		const localTodos = localStorage.getItem('todos');
		if (localTodos) {
			return setTodos(JSON.parse(localTodos));
		}
	}, []);

	const handleAddTodo = (todos: TodoType[]) => {
		setTodos(todos);
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const handleCompleteTodo = (id: string) => {
		const todoIndexToUpdate = todos.findIndex(todo => todo.id === id);

		const newTodosArray = [...todos];

		newTodosArray[todoIndexToUpdate].isDone =
			!newTodosArray[todoIndexToUpdate].isDone;

		setTodos(newTodosArray);
		localStorage.setItem('todos', JSON.stringify(newTodosArray));
	};

	const handleDeleteTodo = (id: string) => {
		const newTodosArray = todos.filter(todo => todo.id !== id);

		setTodos(newTodosArray);
		localStorage.setItem('todos', JSON.stringify(newTodosArray));
	};

	return (
		<div className="App">
			<Header />
			<main className={styles.tasksContainer}>
				<Input onAddTodo={handleAddTodo} todos={todos} />
				<TasksHeader todosList={todos} />
				<div className={styles.tasks}>
					{todos.map(todo => (
						<Todo
							key={todo.id}
							id={todo.id}
							content={todo.content}
							isDone={todo.isDone}
							onTodoDone={handleCompleteTodo}
							onTodoDelete={handleDeleteTodo}
						/>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;
