//import {knex} from '../dependencies.js';
//import {UserProfile} from '../../src/domain/UserProfile';
//import {UserProfileRepository} from '../../src/domain/UserProfileRepository';
//
//describe('UserProfileRepository', () => {
//  var repository, dummy;
//
//  beforeEach(async () => {
//    repository = new UserProfileRepository(knex);
//    dummy = new UserProfile({
//      "uuid": "772741ed-57c0-418e-a75f-ebedf98262f6",
//      "user_uuid": "d0558924-65a6-45c2-8487-d34dcfdd01e4",
//      "provider": "github",
//      "external_id": "133832",
//      "username": "adri",
//      "email": "mail@adrian-philipp.com",
//      "display_name": "Adrian Philipp",
//      "avatar_url": "https://avatars.githubusercontent.com/u/133832?v=2",
//      "profile_url": "https://github.com/adri",
//      "login_count": 7,
//      "last_login_at": "2014-11-08 12:39:33",
//      "created_at": "2014-11-08 12:39:33",
//      "updated_at": "2014-11-08 12:39:33"
//    });
//
//    await repository.table().truncate().then();
//  });
//
//  describe('#store', () => {
//
//    it('should throw an error with invalid user profile', () =>
//      repository.store({}).should.be.rejectedWith('value must be an instance of UserProfile')
//    );
//
//    it('should insert user profile', () =>
//      repository.store(dummy).should.eventually.be.fulfilled
//    );
//
//    it('should update user profile', () =>
//        repository.store(dummy).should.eventually.be.fulfilled
//          .then(() => {
//            dummy.username = 'Peter';
//            return repository.store(dummy, true).should.eventually.be.fulfilled;
//          })
//          .then(() =>
//            repository.findByProvider(dummy.provider, dummy.external_id).should.eventually.contain({
//              username: 'Peter'
//            })
//          )
//    );
//  });
//
//  describe('#findByProvider', () => {
//
//    it('should return null when not found', () =>
//      repository.findByProvider(dummy.provider, dummy.external_id).should.eventually.deep.equal(null)
//    );
//
//    it('should find stored user profile', () =>
//      repository.store(dummy).should.be.fulfilled
//        .then(() => repository.findByProvider(dummy.provider, dummy.external_id).should.eventually.deep.equal(dummy)
//      )
//    );
//
//  });
//
//
//});
