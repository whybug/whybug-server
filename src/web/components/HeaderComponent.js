var React = require('react'),
    Router = require('react-router-component'),
    ReactTopcoat = require('react-topcoat');

var {Link} = Router;

var {NavigationBar, NavigationBarItem} = ReactTopcoat;

export var HeaderComponent = React.createClass({
  render() {
    return NavigationBar({onTop: true},
      NavigationBarItem({position: 'left', width: 'quarter' }, Link({href: '/'}, 'whybug')),
      NavigationBarItem({position: 'right', width: 'quarter' }, Link({href: '/faq'}, 'FAQ')),
      NavigationBarItem({position: 'right', width: 'quarter' }, Link({href: '/about'}, 'About'))
    );
  }
});
