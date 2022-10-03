import { Trash } from 'phosphor-react';
import styles from './Todo.module.css';

interface TodoProps {
	isDone?: boolean;
	id: string;
	content: string;
	onTodoDone: (id: string) => void;
	onTodoDelete: (id: string) => void;
}

export function Todo({
	isDone = false,
	id,
	content,
	onTodoDone,
	onTodoDelete,
}: TodoProps) {
	return (
		<li
			id={id}
			className={
				isDone
					? `${styles.container} ${styles.activeCheckbox}`
					: `${styles.container}`
			}
		>
			<input type="checkbox" onClick={() => onTodoDone(id)} />
			<p>{content}</p>
			<Trash size={18} onClick={() => onTodoDelete(id)} />
		</li>
	);
}
