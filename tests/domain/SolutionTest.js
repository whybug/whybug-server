import {Solution} from '../../src/domain/Solution';

describe('Solution', () => {
  var dummy;

  beforeEach(() => {
    dummy = {
      "message": "Undefined variable: name",
      "level": "E_NOTICE",
      "programminglanguage": "php",
      "programminglanguage_version": "5.4.24",
      "os": "Darwin",
      "os_version": "13.3.0",
      "description": "asd",
      "uuid": "1baf1aed-0f1c-4254-b06e-77e5ad937f28",
      "created_at": new Date("2014-09-27T15:19:57.527Z")
    };
  });

  describe('#constructor', () => {

    it('should generate uuid', () => {
      new Solution(dummy).uuid.should.be.a('string');
    });

    it('should assign existing uuid', () => {
      dummy.uuid = "1eb138f8-850e-4555-970b-93470604de87";
      new Solution(dummy).uuid.should.equal(dummy.uuid);
    });

    it('should assign passed data', () => {
      new Solution(dummy).should.contain(dummy);
    });

    it('should not assign invalid data', () => {
      dummy.invalid = 'data';
      (() => new Solution(dummy)).should.throw('invalid is not allowed');
    });

  });

  describe('#properties', () => {

    it('should return properties', () => {
      Solution.properties().should.include.keys('uuid', 'message', 'description', 'level', 'os');
    });

  });


  describe('#slug_long', () => {

    it('should generate slug', () => {
      new Solution(dummy).slug_long.should.equal('undefined-variable-name');
    });

    it('should not overwrite existing slug', () => {
      dummy.slug_long = 'test';
      new Solution(dummy).slug_long.should.equal('test');
    });

    it('should not change when the message changes', () => {
      dummy.slug_long = 'test';
      var solution = new Solution(dummy);
      solution.message = 'some other message';
      solution.slug_long.should.equal('test');
    });

  });

});
