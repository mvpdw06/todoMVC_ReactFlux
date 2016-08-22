const {
  ActionTypes,
  ShowTypes,
  AppDispatcher
} = window.App;

const CHANGE_EVENT = 'CHANGE';

const _emitter = new EventEmitter();

let _todos = [];
let _showTodo = [];
let _clearCompletedVisible = false;
let _todoClass = 'todo';

const _createTodo = (todos, title) => {
  todos.push({
    id: todos[todos.length - 1].id + 1,
    title,
    completed: false
  });
  return todos;
};

const _updateTodo = (todos, id, title) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.title = title;
  return todos;
};

const _toggleTodo = (todos, id, completed) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.completed = completed;
  return todos;
};

const _deleteTodo = (todos, id) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx !== -1) todos.splice(idx, 1);
  return todos;
};

const _changeShowTodo = (todos, showType) => {
  let target = [];
  if (showType === ShowTypes.All) {
    target = todos.filter((x) => x);
  }
  else if (showType === ShowTypes.Active) {
    target = todos.filter((x) => x.completed === false);
  }
  else {
    target = todos.filter((x) => x.completed === true);
  }
  return target;
}

const _clearCompletedTodo = (todos) => {
  todos = todos.filter((x) => x.completed === false);
  return todos;
}

const _checkClearCompletedVisible = (todos) => {
  const target = todos.filter((x) => x.completed === true);
  let _result = false;
  if (target.length > 0) {
    _result = true;
  }
  return _result;
}

const _completedAllTodo = (todos) => {
  const target = todos.filter((x) => x.completed === false);

  if (target.length > 0) {
    for (let i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = true;
    }
  }
  else {
    for (let i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = !(todos[i].completed);
    }
  }

  return todos;
}

window.App.TodoStore = {
  getAll() {
    return _showTodo;
  },
  GetClearCompletedVisible() {
    _clearCompletedVisible = _checkClearCompletedVisible(_todos);
    return _clearCompletedVisible;
  },
  addChangeListener(callback) {
    _emitter.on(CHANGE_EVENT, callback);
    return () => _emitter.removeListener(CHANGE_EVENT, callback);
  },
  dispatchToken: AppDispatcher.register((action) => {
    switch (action.type) {
      case ActionTypes.LOAD_TODOS_SUCCESS:
        _todos = action.todos;
        _showTodo = _todos;
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.CREATE_TODO:
        _todos = _createTodo(_todos, action.title);
        _showTodo = _todos;
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.UPDATE_TODO:
        _todos = _updateTodo(_todos, action.id, action.title);
        _showTodo = _todos;
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.TOGGLE_TODO:
        _todos = _toggleTodo(_todos, action.id, action.completed);
        _showTodo = _todos;
        _clearCompletedVisible = _checkClearCompletedVisible(_todos);
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.DELETE_TODO:
        _todos = _deleteTodo(_todos, action.id);
        _showTodo = _todos;
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.SWITCH_SHOW_TODO:
        _showTodo = _changeShowTodo(_todos, action.showType);
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.CLEAR_COMPLETED_TODO:
        _todos = _clearCompletedTodo(_todos);
        _showTodo = _todos;
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.COMPLETED_ALL_TODO:
        _todos = _completedAllTodo(_todos);
        _showTodo = _todos;
        _emitter.emit(CHANGE_EVENT);
        break;
    }
  })
};
