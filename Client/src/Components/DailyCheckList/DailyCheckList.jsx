import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function DailyChecklist() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addHandler = () => {
    if (text.trim() === "") return;

    const newTodo = {
      id: uuidv4(),
      text: text,
      checked: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setText(""); // Clear the input field after adding
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("Todos", JSON.stringify(filteredTodos));
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    const data = localStorage.getItem("Todos");
    if (data) {
      try {
        setTodos(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing todos from localStorage", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">Daily Checklist</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto flex flex-col gap-4 p-4">
          <div className="flex gap-4">
            <div className="relative flex items-center w-full">
              <SquareCheckIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Add a new todo..."
                className="pl-8 py-2 border rounded w-full"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              className="h-[39px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={addHandler}
            >
              Add
            </button>
          </div>
          <div className="border rounded-lg">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-4 p-3 border-t last:border-b"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label
                  className={`flex-1 text-sm font-medium ${todo.checked ? "line-through" : ""
                    }`}
                >
                  {todo.text}
                </label>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete todo</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function SquareCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default DailyChecklist;
