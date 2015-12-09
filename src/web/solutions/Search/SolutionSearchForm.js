import React from 'react';
import {
    Column,
    Header,
    HeroSection,
    Section,
    Link,
    Row,
} from '../../common/UI';

export var SearchForm = React.createClass({
    propTypes: {
        query: React.PropTypes.string,
        searchCallback: React.PropTypes.func
    },

    onChange(event) {
        this.setState({query: event.target.value});

        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.onSubmit, 500);
    },

    onSubmit(event) {
        clearTimeout(this.timeout);

        this.props.searchCallback(this.state.query);
    },

    render() {
        return (
            <div>
                <h1>Find solutions.</h1>
                <form onSubmit={this.onSubmit} name='search-form' method='get'>
                    <Row>
                        <Column span={9}>
                            <input
                                placeholder='Enter error messsage...'
                                onChange={this.onChange}
                                defaultValue={this.props.query}
                                className='w-input field'
                                name='query'
                                id='query'
                                type='text'/>
                            <div className='hint-text'>
                                Hint: You can use language:php or language:javascript, type:warning and platform:windows to narrow down your search.
                            </div>
                        </Column>
                        <Column span={3}>
                            <input className='w-button button submit-button'
                                   type='submit' value='Search'
                                   dataWait='Searching...'/>
                        </Column>
                    </Row>
                </form>
            </div>
        );
    }
});
