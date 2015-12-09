var React = require('react');

import {Header, HeroSection} from '../common/UI';

export default React.createClass({
    render() {
        return (
            <div>
                <Header user={this.props.user}/>

                <HeroSection>
                    <h1>Solutions to errors, right where they happen.</h1>
                </HeroSection>
            </div>
        );
    }
});

