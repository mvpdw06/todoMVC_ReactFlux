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
      title,
      completed,
      onToggle,
      onDelete
    } = this.props;
    
    return (
      <div>
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle && onToggle(!completed)}
        />
        <label onDoubleClick={this.toggleEditMode}>{title}</label>
        <button className="destroy" onClick={() => onDelete && onDelete()}></button>
      </div>
    );
  }

  renderEditMode() {
    const { title, onUpdate } = this.props;
    return (
      <InputField
        autoFocus
        placeholder="edit this todo"
        value={title}

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
  onDelete: React.PropTypes.func
};

window.App.TodoItem = TodoItem;
