import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import type { Todo } from "./hooks/useTodos";


interface TodoContext {
  previousTodos: Todo[] | undefined;
}

const TodoForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useMutation<Todo, Error, Todo, TodoContext>({
    mutationFn: (newTodo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", newTodo)
        .then((res) => res.data),
    onMutate: async (newTodo) => {
        await queryClient.cancelQueries({queryKey: ['todos']});
        const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
        queryClient.setQueryData<Todo[]>(['todos'], (old) => [{...newTodo, id: Date.now()}, ...(old || [])])

        return {previousTodos}
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({queryKey: ['todos']});
    // }
  });

  return (
    <>
      {addTodo.error && (
        <div className=" alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
            });
          if (ref.current) ref.current.value = "";
          ref.current?.focus();
        }}
        className="d-flex w-50 mb-3"
      >
        <input ref={ref} className="form-control me-1" type="text" />
        <button disabled={addTodo.isPending} className="btn btn-primary">
          {addTodo.isPending ? "Adding..." : "Add"}
        </button>
      </form>
    </>
  );
};

export default TodoForm;
