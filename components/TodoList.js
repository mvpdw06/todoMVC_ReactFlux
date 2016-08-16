const { TodoStore,
        TodoItem } = window.App;

class TodoList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      todos,
      onUpdateTodo,
      onToggleTodo,
      onDeleteTodo,
      onCompletedAllTodo } = this.props;

    const todoElements = todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          onUpdate={(content) => onUpdateTodo && onUpdateTodo(todo.id, content)}
          onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed)}
          onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
        />
    ));

    return (
      <div>
        <input className="toggle-all" type="checkbox" onClick={() => onCompletedAllTodo && onCompletedAllTodo() } />
        <ul className="todo-list">
          {todoElements}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onUpdateTodo: React.PropTypes.func,
  onToggleTodo: React.PropTypes.func,
  onDeleteTodo: React.PropTypes.func,
  onCompletedAllTodo: React.PropTypes.func
};

window.App.TodoList = TodoList;
