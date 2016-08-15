class TodoHeader extends React.Component {
  render() {
    const {
      title,
      username,
    } = this.props;
    return (
      <div>
        <h1>{username}'s {title}</h1>
      </div>
    );
  }
}

TodoHeader.propTypes = {
  title: React.PropTypes.string,
  username: React.PropTypes.string,
};

TodoHeader.defaultProps = {
  title: 'todos',
  username: 'Guest',
};

window.App.TodoHeader = TodoHeader;
