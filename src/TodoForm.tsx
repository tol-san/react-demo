import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import type { Todo } from "./hooks/useTodos";

const TodoForm = () => {
    const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo).then(res => res.data),
    onSuccess: (saveTodo) => {
        queryClient.setQueryData<Todo[]>(['todos'], todos => [saveTodo, ...(todos || [])])
    }
  }); 
 
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current && ref.current.value)
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
          });
      }}
      className="d-flex w-50 mb-3"
    >
      <input ref={ref} className="form-control me-1" type="text" />
      <button className="btn btn-primary">Add</button>
    </form>
  );
};

export default TodoForm;
