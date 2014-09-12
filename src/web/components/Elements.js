var React = require('react'),
    Router = require('react-router-component');

class _NavLink {

  get mixins() { return [Router.NavigatableMixin]; }

  getDefaultProps() {
    return {
      activeClassName: 'active'
    };
  }

  isActive() {
    return this.getPath() === this.props.href;
  }

  render() {
    var className = 'w-nav-link nav-link ';

    if (this.isActive()) {
     className += this.props.activeClassName;
    }

    return this.transferPropsTo(Router.Link({className: className}, this.props.children));
  }
}

export var NavLink = React.createClass(_NavLink.prototype);
