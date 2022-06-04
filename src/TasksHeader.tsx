import { useEffect, useState } from 'react';
import styles from './TasksHeader.module.css';

type Todo = {
	id: string;
	content: string;
	isDone: boolean;
};

interface TasksHeaderProps {
	todosList: Todo[];
}

export function TasksHeader({ todosList }: TasksHeaderProps) {
	const [doneTodosCount, setDoneTodosCount] = useState(0);

	useEffect(() => {
		setDoneTodosCount(0);
		todosList?.forEach(todo => {
			if (todo.isDone) {
				setDoneTodosCount(prev => prev + 1);
			}
		});
	}, [todosList]);

	return (
		<header className={styles.tasksHeader}>
			<div className={styles.createdTasks}>
				<strong>
					Tarefas criadas <span>{todosList?.length}</span>
				</strong>
			</div>
			<div className={styles.concludedTasks}>
				<strong>
					Concluídas{' '}
					<span>
						{doneTodosCount} de {todosList?.length}
					</span>
				</strong>
			</div>
		</header>
	);
}
