const { InputField } = window.App;

class TodoItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { editable: false };
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode() {
    this.setState({ editable: !this.state.editable });
  }

  renderViewMode() {
    const {
      id,
      title,
      completed,
      onToggle,
      onDelete
    } = this.props;

    return (
      <li key={id} className={completed? 'todo completed' : 'todo'}>
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle && onToggle(!completed)}
        />
        <label onDoubleClick={this.toggleEditMode}>{title}</label>
        <button className="destroy" onClick={() => onDelete && onDelete()}></button>
      </li>
    );
  }

  renderEditMode() {
    const { id, title, onUpdate } = this.props;
    return (
      <li key={id} className="todo editing">
        <InputField
          autoFocus
          placeholder="edit this todo"
          value={title}
          className="edit"

          onBlur={this.toggleEditMode}
          onKeyDown={(e) => {
            if (e.keyCode === 27) {
              e.preventDefault();
              this.toggleEditMode();
            }
          }}
          onSubmitEditing={(content) => {
            onUpdate && onUpdate(content);
            this.toggleEditMode();
          }}
        />
      </li>
    );
  }

  render() {
    return this.state.editable ?
      this.renderEditMode() :
      this.renderViewMode();
  }
}

TodoItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  onUpdate: React.PropTypes.func,
  onToggle: React.PropTypes.func,
  onDelete: React.PropTypes.func,
};

window.App.TodoItem = TodoItem;
