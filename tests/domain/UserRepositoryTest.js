import {knex} from '../dependencies.js';
import {User} from '../../src/domain/User';
import {UserRepository} from '../../src/domain/UserRepository';

describe('UserRepository', () => {
  var repository, dummy;

  beforeEach(async () => {
    repository = new UserRepository(knex);
    dummy = new User({
      "uuid": "cc441294-034b-46cf-84b4-982f3bab06f4",
      "email": "adrian.philipp@gmail.com",
      "display_name": "adrian",
      "avatar_url": "https://lh5.googleusercontent.com/-f-vJZN-0r1Q/AAAAAAAAAAI/AAAAAAAAAAA/CoEIZBEnDO4/photo.jpg",
      "created_at": "2014-09-14 19:45:35",
      "updated_at": "2014-09-14 19:45:35"
    });

    await repository.table().truncate().then();
  });

  describe('#store', () => {

    it('should throw an error with invalid user', () =>
      repository.store({}).should.be.rejectedWith('value must be an instance of User')
    );

    it('should insert user', () =>
      repository.store(dummy).should.eventually.be.fulfilled
    );

    it('should update user', () =>
        repository.store(dummy, true).should.eventually.be.fulfilled
          .then(() => repository.store(dummy).should.eventually.be.fulfilled)
    );

  });

  describe('#findByUuid', () => {

    it('should return null when not found', () => {
      return repository.findByUuid('some id').should.eventually.deep.equal(null);
    });

    it('should find stored user', () => {
      return repository.store(dummy).should.be.fulfilled.then(() => {
        return repository.findByUuid(dummy.uuid).should.eventually.deep.equal(dummy);
      });
    });

  });

});
