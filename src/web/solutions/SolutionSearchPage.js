var React = require('react'),
    Router  = require('react-router');
    //Spinner = require('react-spinkit');

import {WhybugApi} from '../WhybugApi';
import {
  Column,
  Header,
  HeroSection,
  Section,
  Link,
  Row,
} from '../common/UI';


var UnsolvedError = React.createClass({
  render() {
    var error = this.props.error;
    var params = {
      error_uuid: this.props.error.uuid
    };
    return (
      <Link to="solution_create" params={params} className='content-block'>
        <h3 className='latest-errors'>{error.level +  ': ' + error.message}</h3>
        <span className='button' onClick={this.handleHide}>hide</span>
      </Link>
    );
  },

  handleHide(event) {
    event.preventDefault();
    this.props.onHide(this.props.error);
  }
});

/**
 * Displays a list of unresolved errors.
 */
var UnsolvedErrorList = React.createClass({
  getInitialStateAsync(callback) {
    WhybugApi.findUnsolvedErrors((error, result) => callback(error, {
      unsolved_errors: result
    }));
  },

  render() {
    if (this.state.unsolved_errors) {
      return (
        <div>
          {this.state.unsolved_errors.map(error =>
            <UnsolvedError
              key={error.uuid}
              error={error}
              onHide={this.handleHideError} />
          )}
        </div>
      );
    }

    return <div>No unsolved errors found</div>
  },

  handleHideError(error) {
    WhybugApi.hideError(error, () => {
      this.setState({
        unsolved_errors: this.state.unsolved_errors.filter(unresolved_error => unresolved_error.uuid !== error.uuid)
      })
    });
  }
});

export var SolutionSearchPage = React.createClass({

  mixins: [Router.State, Router.Navigation],

  statics: {
    fetchData(params, query) {
      console.log('search', query);
      return WhybugApi.searchSolutions(query.query);
    }
  },

  propTypes: {
    search: React.PropTypes.object
  },

  onSearch(query) {
    if (query) {
      this.transitionTo('search', {}, {query: query});
    } else {
      this.transitionTo('search');
    }
  },

  render() {
    console.log('render', this.props, this.state, this.getQuery().query);
    var searchResult = this.props.search || {};

    let solutions = searchResult.solutions || [];
    let filters = searchResult.aggregations || {};

    return (
      <div>
        <Header user={this.props.user} />

        <HeroSection>
            <SearchForm query={this.getQuery().query} searchCallback={this.onSearch} />
        </HeroSection>

        <Section className="grey">
          <Row>
            <Column span={9}>
              {this.renderSolutions(solutions)}
            </Column>

            <Column span={3}>
              <SolutionFilter title="Language" filters={filters['programminglanguage']} />
              <SolutionFilter title="Level" filters={filters['level']} />
              <SolutionFilter title="Operating system" filters={filters['os']} />
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

export var SolutionFilter = React.createClass({
  propTypes: {
    filters: React.PropTypes.object,
    title: React.PropTypes.string
  },

  render() {
    if (!this.props.filters) {
      return null;
    }

    return (
      <label>
        {this.props.title}
        <ul>{
          this.props.filters.buckets.map(agg =>
            <li key={agg.key}>{agg.key} ({agg.doc_count})</li>
          )
        }</ul>
      </label>
    );
  }
});


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
              <div className='hint-text'>Hint: You can use language:php or language:javascript, type:warning and platform:windows to narrow down your search.</div>
            </Column>
            <Column span={3}>
              <input className='w-button button submit-button' type='submit' value='Search' dataWait='Searching...' />
            </Column>
          </Row>
        </form>
      </div>
    );
  }
});

export var SearchResult = React.createClass({
  propTypes: {
    uuid: React.PropTypes.string,
    level: React.PropTypes.string,
    message: React.PropTypes.string,
    programminglangauge: React.PropTypes.string
  },

  render() {
    const params = {
      language: this.props.programminglanguage,
      slug: this.props.uuid
    };

    return (
      <Link to="solution_view" params={params} className='content-block'>
        <h3 className='latest-errors'>{this.props.level +  ': ' + this.props.message}</h3>
      </Link>
    );
  }
});
