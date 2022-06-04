import styles from './Input.module.css';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';
import { toast, ToastContainer } from 'react-toastify';

interface Todo {
	id: string;
	content: string;
	isDone: boolean;
}

interface InputProps {
	todos: Todo[];
	onAddTodo: (todos: Todo[]) => void;
}

const createTodoSchema = yup
	.string()
	.required('Não se pode adicionar todo vazio');

export function Input({ todos, onAddTodo: setTodo }: InputProps) {
	const [newTodo, setNewTodo] = useState('');

	const handleAddTodo = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await createTodoSchema.validate(newTodo);
			const newTodosArray = [...todos];

			newTodosArray.push({
				content: newTodo,
				isDone: false,
				id: uuidv4(),
			});

			setTodo(newTodosArray);
			setNewTodo('');
		} catch (err: any) {
			toast.error(err.errors[0]);
			console.log(err.errors);
		}
	};

	return (
		<>
			<form onSubmit={handleAddTodo} className={styles.container}>
				<input
					value={newTodo}
					onChange={e => setNewTodo(e.target.value)}
					type="text"
					placeholder="Adicione uma nova tarefa"
				/>
				<button type="submit">
					Criar <PlusCircle size={19} />
				</button>
			</form>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
}
