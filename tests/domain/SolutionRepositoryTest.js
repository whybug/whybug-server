import {es, bookshelf} from '../dependencies.js';
import {Solution} from '../../src/domain/Solution';
import {SolutionRepository} from '../../src/domain/SolutionRepository';

describe('SolutionRepository', () => {
  var repository, dummy;

  beforeEach(async () => {
    repository = new SolutionRepository(es, bookshelf);
    dummy = new Solution({
      "uuid":"68c01692-7f74-47ce-990d-519e010f0bc8",
      "slug_long":"cannot-access-empty-property",
      "slug_short":"68c01692-7f74-47ce-990d-519e010f0bc8",
      "description":"Happens when using variables to access object properties like for example:  `$this->$name`. Mind the `$` in front of `name`. Try to check if the property exists or (better) don't use a variable at all.",
      "level":"exception",
      "code":"",
      "message":"Cannot access empty property",
      "programminglanguage":"php",
      "programminglanguage_version":"5.4.24",
      "os":"Darwin",
      "os_version":"13.3.0",
      "is_active":1,
      "created_at":"2014-09-28T15:29:18",
      "updated_at":"2014-09-28T15:29:18"
    });

    await repository.table().truncate().then();
    await repository.reindex();
  });

  describe('#store', () => {

    it('should throw an error with invalid solution', async () => {
      try {
        var solution = await repository.store({});
      } catch(exception) {
        exception.message.should.have.string('value must be an instance of Solution');
      }
    });

    it('should return stored solution', () => {
      return repository.store(dummy).should.eventually.deep.equal(dummy);
    });

  });

  describe('#findByUuid', () => {

    it('should return null when not found', () => {
      return repository.findByUuid('some id').should.eventually.deep.equal(null);
    });

    it('should find stored solution', () => {
      return repository.store(dummy).should.be.fulfilled.then(() => {
        return repository.findByUuid(dummy.uuid).should.eventually.deep.equal(dummy);
      });
    });

  });

  describe('#search', () => {

    it('should return no results when no data is added', () => {
      return repository.search().should.eventually.deep.equal({
        total: 0,
        solutions: [],
        aggregations: {
          os: {buckets: []},
          level: {buckets: []},
          programminglanguage: {buckets: []}
        }
      })
    });

    it('should find single dummy solution', () => {
      return repository.store(dummy).should.be.fulfilled.then(() => {
        return es.indices.refresh({}).then(()=> {
          return repository.search('cannot').should.eventually.deep.equal({
            total: 1,
            solutions: [dummy],
            aggregations: {
              os: {buckets: [{doc_count: 1, key: "Darwin"}]},
              level: {buckets: [{doc_count: 1, key: 'exception'}]},
              programminglanguage: {buckets: [{doc_count: 1, key: 'php'}]}
            }
          });
        })
      });
    });



  });


});
