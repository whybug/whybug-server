import React from 'react';
import cx from 'classnames';
import {Container} from '../UI';

/**
 * Section with container.
 */
export default React.createClass({
    propTypes: {
        type: React.PropTypes.string
    },

    render() {
        return (
            <section className={cx('section', this.props.type)}>
                <Container>{this.props.children}</Container>
            </section>
        );
    }
});
