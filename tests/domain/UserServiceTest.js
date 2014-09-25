import {UserService} from '../../src/domain/UserService';

var sinon = require("sinon");

describe('UserService', () => {
  var userRepository = sinon.stub();
  var userProfileRepository = sinon.stub();
  var userService = new UserService(userRepository, userProfileRepository);

  var githubUser = {

  };

  describe('#loginWithProvider()', () => {

    it('should validate provider', async () => {
      try {
        var user = await userService.loginWithProvider('wrong-provider', {});
      } catch(exception) {
        exception.message.should.have.string("Invalid provider");
      }
    });

    it('should login with github', async () => {
      //var user = await userService.loginWithProvider('github', {});
      //userRepository.findByProvider('');
    })

    /*
     should validate profile
     should login with twitter
     should login with google
     */


  });
});
