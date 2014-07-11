import {ErrorLog} from '../../src/domain/ErrorLog.js';

describe('ErrorLog', () => {

  describe('#constructor', () => {

    it('should generate uuid', () => {
      new ErrorLog(null).uuid.should.be.a('string');
    });

    it('should assign existing uuid', () => {
      var uuid = '4d7bbc0c-fb49-4cf8-a19b-5ae9e0825450';
      new ErrorLog(uuid).uuid.should.equal(uuid);
    });

    it('should assign passed data', () => {
      var data = {errorMessage: "test message"};
      new ErrorLog(null, data).should.contain(data);
    });

    it('should not assign invalid data', () => {
      var data = {hans: "löwenzahn"};
      new ErrorLog(null, data).should.not.contain(data);
    });

  });

  describe('#properties', () => {

    it('should return properties', () => {
      ErrorLog.properties().should.include.keys('version', 'errorLevel', 'errorMessage', 'programmingLanguage');
    });

  });
});
