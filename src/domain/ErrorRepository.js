var ejs = require('elastic.js');

import {Error} from './Error';

export class ErrorRepository {

  constructor(es, bookshelf) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'errors';
    this.model = bookshelf.model('Error', Error.bookshelf());
  }

  async findByUuid(uuid) {
    var error = await new (this.model)({uuid: uuid}).fetch();

    return error ? new Error(error.attributes) : {};
  }

  async findByQuery(query = '*') {
    var result = await this.es.search({
      index: this.index,
      type: this.type,
      body: {
        size: 10,
        sort: {created_at: 'desc'},
        query: {
          filtered: {
            query: {
              match: {
                errorMessage: {
                  query: query,
                  operator: 'and',
                  minimum_should_match: '10%',
                  zero_terms_query: 'all'
                }
              }
            },
            filter: {
              exists: { field: 'created_at' }
            }
          }
        }
      }
    });

    return result.hits.hits.map((hit) => new Error(hit._source));
  }

  /**
   * Returns the most similar Error for the specified ErrorLog
   * or undefined if none found.
   *
   * An Errorlog is similar to an Error if the ErrorLog shares at least the
   * same programmingLanguage, errorLevel and a 'similar' errorMessage
   * (x% similarity) with a Error variation.
   *
   * If a ErrorLog shares the same programmingLanguageVersion, framework
   * and/or frameworkVersion the similarity increases.
   *
   * In case more than one Error is found, the one with the
   * most similarity is returned.
   *
   * @param error
   * @param callback
   */
  findSimilarError(error, callback) {
    this.es.search({
      index: this.index,
      type: this.type,
      body: ejs.Request().query(
        ejs.FilteredQuery(
          ejs.BoolQuery()
            .must([
              ejs.MatchQuery('errorMessage', errorLog.errorMessage).minimumShouldMatch('75%')
            ])
            .should([
              ejs.TermQuery('programmingLanguageVersion', errorLog.programmingLanguageVersion),
              ejs.TermQuery('framework', errorLog.framework),
            ]),
          ejs.BoolFilter()
            .must([
              ejs.TermFilter('programmingLanguage', errorLog.programmingLanguage),
              ejs.TermFilter('errorLevel', errorLog.errorLevel)
            ])
        ))
    }, (error, response) => {
      var data, entity;
      if (response && response.hits.total > 0) {
        data = response.hits.hits[0];
        entity = new Error(data._id, data._source);
      }
      callback(error, entity);
    });
  }

  findSimilarError2() {
    return this.search(Error, ejs.Request()
      .size(1)
      .query(
        ejs.FilteredQuery(
          ejs.BoolQuery()
            .must([
              ejs.MatchQuery('errorMessage', errorLog.errorMessage).minimumShouldMatch('75%')
            ])
            .should([
              ejs.TermQuery('programmingLanguageVersion', errorLog.programmingLanguageVersion),
              ejs.TermQuery('framework', errorLog.framework)
            ]),
          ejs.BoolFilter()
            .must([
              ejs.TermFilter('programmingLanguage', errorLog.programmingLanguage),
              ejs.TermFilter('errorLevel', errorLog.errorLevel)
            ])
        )
      )
    );
  }

  /**
   * Stores an error.
   *
   * @param {Error} error
   */
  store(error) {
    return Promise.all([
      this.storeMysql(error),
      this.storeEs(error)
    ]);
  }

  storeMysql(error) {
    return new (this.model)(error).save({}, {method: 'insert'});
  }

  storeEs(error) {
    return this.es.index({
      index: this.index,
      type: this.type,
      id: error.uuid,
      body: error
    });
  }
}
