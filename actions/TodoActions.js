const {
  ActionTypes,
  AppDispatcher
} = window.App;

window.App.TodoActions = {
  loadTodos() {
    fetch('./todos.json')
      .then((response) => response.json())
      .then((todos) => AppDispatcher.dispatch({
        type: ActionTypes.LOAD_TODOS_SUCCESS,
        todos
      }));
  },
  createTodo(title) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_TODO,
      title
    });
  },
  updateTodo(id, title) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TODO,
      id,
      title
    });
  },
  toggleTodo(id, completed) {
    AppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_TODO,
      id,
      completed
    });
  },
  deleteTodo(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_TODO,
      id
    });
  },
  showAllTodo(){
    AppDispatcher.dispatch({
      type: ActionTypes.SHOW_ALL_TODO
    });
  },
  showActiveTodo(){
    AppDispatcher.dispatch({
      type: ActionTypes.SHOW_ACTIVE_TODO
    });
  },
  showCompletedTodo(){
    AppDispatcher.dispatch({
      type: ActionTypes.SHOW_COMPLETED_TODO
    });
  },
  clearCompletedTodo(){
    AppDispatcher.dispatch({
      type: ActionTypes.CLEAR_COMPLETED_TODO
    });
  },
  completedAllTodo(){
    AppDispatcher.dispatch({
      type: ActionTypes.COMPLETED_ALL_TODO
    })
  }
};
