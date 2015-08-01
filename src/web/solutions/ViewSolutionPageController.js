/**
 * @flow
 */
import React from 'react';
import {WhybugApi} from '../WhybugApi';
import {NotFoundPage} from '../common/NotFoundPage';

export var SolutionViewPageController = React.createClass({

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

    return <ViewSolutionPage solution={solution} />;
  }
});
