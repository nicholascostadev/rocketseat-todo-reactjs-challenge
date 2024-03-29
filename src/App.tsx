import "./global.css";
import styles from "./App.module.css";

import { Header } from "./Header";
import { Input } from "./Input";
import { TasksHeader } from "./TasksHeader";
import { useEffect, useRef, useState } from "react";
import { Todo } from "./Todo";
import clipboardImage from "./assets/Clipboard.svg";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface TodoType {
  id: string;
  isDone: boolean;
  content: string;
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [parent] = useAutoAnimate<HTMLUListElement>()

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      return setTodos(JSON.parse(localTodos));
    }
  }, []);

  const handleAddTodo = (todos: TodoType[]) => {
    setTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleCompleteTodo = (id: string) => {
    const todoIndexToUpdate = todos.findIndex((todo) => todo.id === id);

    const newTodosArray = [...todos];

    newTodosArray[todoIndexToUpdate].isDone =
      !newTodosArray[todoIndexToUpdate].isDone;

    setTodos(newTodosArray);
    localStorage.setItem("todos", JSON.stringify(newTodosArray));
  };

  const handleDeleteTodo = (id: string) => {
    const newTodosArray = todos.filter((todo) => todo.id !== id);

    setTodos(newTodosArray);
    localStorage.setItem("todos", JSON.stringify(newTodosArray));
  };
  console.log(todos);



  return (
    <div className="App">
      <Header />
      <main className={styles.tasksContainer}>
        <Input onAddTodo={handleAddTodo} todos={todos} />
        <TasksHeader todosList={todos} />
        <ul className={styles.tasks} ref={parent}>
          {todos &&
            todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                content={todo.content}
                isDone={todo.isDone}
                onTodoDone={handleCompleteTodo}
                onTodoDelete={handleDeleteTodo}
              />
            ))}
          {todos.length === 0 ? (
            <div className={styles.noTodos}>
              <img src={clipboardImage} alt="Clipboard image" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : null}
        </ul>
      </main>
    </div>
  );
}

export default App;
