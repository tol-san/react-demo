import PostList from "./PostList";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function App() {
  return (
    <div className=" container mt-5">
      <TodoForm />{" "}
      <Todo/>
    </div>
  );
}

export default App;
