const { TodoItem } = window.App;

class TodoList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      todos,
      onUpdateTodo,
      onToggleTodo,
      onDeleteTodo } = this.props;

    const todoElements = todos.map((todo) => (
      <li className={todo.completed?'todo completed' : 'todo'} key={todo.id}>
        <TodoItem
          title={todo.title}
          completed={todo.completed}
          onUpdate={(content) => onUpdateTodo && onUpdateTodo(todo.id, content)}
          onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed)}
          onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
        />
      </li>
    ));

    return <ul className="todo-list">{todoElements}</ul>;
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onUpdateTodo: React.PropTypes.func,
  onToggleTodo: React.PropTypes.func,
  onDeleteTodo: React.PropTypes.func
};

window.App.TodoList = TodoList;
