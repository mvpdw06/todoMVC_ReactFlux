const {
  TodoActions,
  TodoStore,
  InputField,
  TodoHeader,
  TodoList,
  Footer,
  FooterInfo
} = window.App;

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: TodoStore.getAll()
    };
  }

  componentDidMount() {
    TodoActions.loadTodos();
    this._removeChangeListener = TodoStore.addChangeListener(
      () => this.setState({ todos: TodoStore.getAll() })
    );
  }

  componentWillUnmount() {
    this._removeChangeListener();
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <div className="todoapp">
          <div className="header">
            <TodoHeader
              title="todos"
              username="Ryan"
            />
            <InputField
              placeholder="enter your todo here."
              className="new-todo"
              onSubmitEditing={TodoActions.createTodo}
            />
          </div>
          <div className="main">
            <TodoList
              todos={todos}
              onUpdateTodo={TodoActions.updateTodo}
              onToggleTodo={TodoActions.toggleTodo}
              onDeleteTodo={TodoActions.deleteTodo}
              onCompletedAllTodo={TodoActions.completedAllTodo}
            />
          </div>
          <Footer todoCount={todos.filter((todo) => !todo.completed).length} 
                  onShowAll={TodoActions.showAllTodo}
                  onShowActive={TodoActions.showActiveTodo}
                  onShowCompleted={TodoActions.showCompletedTodo}
                  onClearCompleted={TodoActions.clearCompletedTodo}
          />
        </div>
        <FooterInfo />
      </div>
    );
  }
}

window.App.TodoApp = TodoApp;
