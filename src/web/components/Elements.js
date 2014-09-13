var React = require('react'),
    Router = require('react-router-component');


var {section, div} = React.DOM;

/**
 * Section with container.
 */
export var Section = React.createClass({
  render() {
    return this.transferPropsTo(
      section({className: 'section'},
        div({className: 'w-container'}, this.props.children)
      )
    );
  }
});


/**
 * Link which automatically sets an .active class
 * when path matches.
 */
export var NavLink = React.createClass({

  get mixins() { return [Router.NavigatableMixin]; },

  getDefaultProps() {
    return {
      activeClassName: 'active'
    };
  },

  isActive() {
    return this.getPath().slice(0, this.props.href.length) == this.props.href;
  },

  render() {
    var className = 'w-nav-link nav-link ';

    if (this.isActive()) {
     className += this.props.activeClassName;
    }

    return this.transferPropsTo(Router.Link({className: className}, this.props.children));
  }
});

