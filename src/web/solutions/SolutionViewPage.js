/**
 * @flow
 */

import React from 'react';
import {WhybugApi} from '../WhybugApi';
import {NotFoundPage} from '../common/NotFoundPage';
import {Markdown} from '../common/ui/Markdown';
import {
  Header,
  HeroSection,
  Section,
  Row,
  Column,
} from '../common/UI';


export var SolutionViewPage = React.createClass({

  statics: {
    fetchData(params, query) {
      return WhybugApi.findSolutionByUuid(params.slug);
    }
  },

  propTypes: {
    solution_view: React.PropTypes.object.isRequired
  },

  render() {
    var solution = this.props.solution_view;

    if (!solution) {
      return <NotFoundPage />;
    }

    return (
      <div>
        <Header user={this.props.user} />
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
              <Markdown text={solution.description} />
            </Column>
          </Row>
        </Section>
      </div>
    );
  }
});
