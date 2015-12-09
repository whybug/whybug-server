import React from 'react';

import {
    Column,
    Header,
    HeroSection,
    Section,
    Link,
    Row,
} from '../../common/UI';

import {SearchForm} from './SolutionSearchForm.js'
import {SolutionFilter} from './SolutionFilter.js'

export var SearchSolutionsPage = React.createClass({
    propTypes: {
        searchCallback: React.PropTypes.func
    },

    render() {
        //console.log('render', this.props, this.state, this.getQuery().query);
        var searchResult = this.props.search || {};

        let solutions = searchResult.solutions || [];
        let filters = searchResult.aggregations || {};

        return (
            <div>
                <Header user={this.props.user}/>

                <HeroSection>
                    <SearchForm query={this.props.query}
                                searchCallback={this.props.searchCallback}/>
                </HeroSection>

                <Section className="grey">
                    <Row>
                        <Column span={10}>
                            {this.renderSolutions(solutions)}
                        </Column>

                        <Column span={3}>
                            <SolutionFilter title="Language"
                                            filters={filters['programminglanguage']}/>
                            <SolutionFilter title="Level"
                                            filters={filters['level']}/>
                            <SolutionFilter title="Operating system"
                                            filters={filters['os']}/>
                        </Column>
                    </Row>
                </Section>
            </div>
        );
        //{this.props.user && this.renderUnsolvedErrors()}
    },

    renderSolutions(solutions) {
        //if (this.state.loading) {
        //  //return Spinner({
        //  //  spinnerName: 'three-bounce', fadeIn: true
        //  //});
        //  return <div>loading</div>
        //}

        if (solutions.length) {
            return solutions.map(solution => {
                solution.key = solution.uuid;
                return <SearchResult {...solution} />;
            })
        }

        return <div>No solutions found</div>;
    },

    renderUnsolvedErrors() {
        return (
            <div>
                <h3>Unresolved Errors</h3>
                <UnsolvedErrorList />
            </div>
        )
    }
});

