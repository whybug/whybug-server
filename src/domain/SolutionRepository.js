
/**
 * @param {es.Client} esClient
 * @constructor
 */
var SolutionRepository = function(esClient) {
  this.es = esClient;
  this.index = 'wtf';
  this.type = 'solution';
};


/**
 * Stores a ErrorLog.
 *
 * @param {ErrorLog} solution
 * @param {callback} callback
 */
SolutionRepository.prototype.store = function(solution, callback) {
  this.es.index({
    index: this.index,
    type: this.type,
    id: solution.uuid,
    body: solution.data
  }, function(error) {
    callback(error);
  });
};


/**
 * Finds suitable solutions for an ErrorLog.
 *
 * @param {ErrorLog} errorLog
 * @param {callback} callback
 */
SolutionRepository.prototype.findByErrorLog = function(errorLog, callback) {
  this.es.search({
    index: this.index,
    type: this.type,
    body: {
      query: {
        bool: {
          must: {
            term: {
              language: errorLog.data.language,
              errorLevel: errorLog.data.errorLevel
            },
            match: {
              errorMessage: errorLog.data.errorMessage
            }
          },
          should: {
            term: {
              languageVersion: errorLog.data.languageVersion,
              framework: errorLog.data.framework
            }
          }
        }
      }

    }
  }, function(error, response) {
    if (error) {
      return callback([]);
    }

    callback(response.hits);
  });
};


/**
 * @type {Function}
 */
module.exports = SolutionRepository;

