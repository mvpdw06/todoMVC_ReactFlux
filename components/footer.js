class Footer extends React.Component {
  render() {
    const {
      todoCount,
      onShowAll,
      onShowActive,
      onShowCompleted,
      onClearCompleted
    } = this.props;
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
			<button className="clear-completed" onClick={() => onClearCompleted && onClearCompleted()} >
				Clear completed
			</button>
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



