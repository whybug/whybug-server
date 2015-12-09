import React from 'react';
import {NotFoundPage} from '../common/NotFoundPage';
import {Markdown} from '../common/ui/Markdown';
import {
    Header,
    HeroSection,
    Section,
    Row,
    Column,
} from '../common/UI';

export var ViewSolutionPage = React.createClass({

    propTypes: {
        solution: React.PropTypes.object.isRequired
    },

    render() {
        var solution = this.props.solution;

        if (!solution) {
            return <NotFoundPage />;
        }

        return (
            <div>
                <Header user={this.props.user}/>
                {!solution || this.renderSolution(solution) }
            </div>
        );
    },

    renderSolution(solution) {
        return (
            <div>
                <HeroSection>
                    <h1>{solution.message}</h1>
                </HeroSection>

                <Section className="grey">
                    <Row>
                        <Column span={12}>
                            <Markdown text={solution.description}/>
                        </Column>
                    </Row>
                </Section>
            </div>
        );
    }
});
