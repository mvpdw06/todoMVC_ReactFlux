const { TodoStore } = window.App;

class Footer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clearButtonVisible: TodoStore.GetClearCompletedVisible()
    };
  }

  componentDidMount() {
    this._removeChangeListener = TodoStore.addChangeListener(
      () => this.setState({ clearButtonVisible: TodoStore.GetClearCompletedVisible() })
    );
  }

  render() {
    const {
      todoCount,
      onShowAll,
      onShowActive,
      onShowCompleted,
      onClearCompleted
    } = this.props;

    const clearButton = this.state.clearButtonVisible ? <button className="clear-completed" onClick={() => onClearCompleted && onClearCompleted()} >Clear completed</button> : null;

    return (
		<div className="footer">
			<span className="todo-count">
				<strong>{todoCount} item left.</strong>
			</span>
			<ul className="filters">
				<li><a href="javascript: void(0)" onClick={() => onShowAll && onShowAll()} >All</a></li>
				<li><a href="javascript: void(0)" onClick={() => onShowActive && onShowActive()} >Active</a></li>
				<li><a href="javascript: void(0)" onClick={() => onShowCompleted && onShowCompleted()} >Completed</a></li>
			</ul>
			{clearButton}
		</div>
    );
  }
}

Footer.propTypes = {
  todoCount: React.PropTypes.number,
  onShowAll: React.PropTypes.func,
  onShowActive: React.PropTypes.func,
  onShowCompleted: React.PropTypes.func,
  onClearCompleted: React.PropTypes.func
};

Footer.defaultProps = {
  todoCount: 0
};

window.App.Footer = Footer;



