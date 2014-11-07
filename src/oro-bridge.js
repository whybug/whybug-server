
import { UserProfile } from './domain/UserProfile';

var UserProfileMapper = (userProfile) => {
  return {
    "id":1,
    "namePrefix":null,
    "firstName":"Ramona",
    "middleName":null,
    "lastName":"Venters",
    "nameSuffix":null,
    "gender":null,
    "birthday":null,
    "description":"Sure Save",
    "jobTitle":null,
    "fax":null,
    "skype":null,
    "twitter":null,
    "facebook":null,
    "googlePlus":null,
    "linkedIn":null,
    "createdAt":"2014-03-01T17:56:01+00:00",
    "updatedAt":"2014-03-01T17:56:01+00:00",
    "email":null,
    "source":null,
    "method":null,
    "owner":15,
    "assignedTo":null,
    "reportsTo":null,
    "emails":{},
    "phones":{},
    "addresses":[{"primary":true,"id":1,"label":"Primary Address","street":"873 John Avenue","street2":null,"city":"Jackson","postalCode":"49201","organization":null,"regionText":null,"namePrefix":null,"firstName":"Ramona","middleName":null,"lastName":"Venters","nameSuffix":null,"types":[],"country":"United States","region":"Michigan"}],
    "groups":[],
    "accounts":[],
    "createdBy":15,
    "updatedBy":15
  }
};


bookshelf.model('UserProfile', UserProfile.bookshelf())
  .on('created', (userProfile) => OroCrm.postContact(UserProfileMapper(userProfile)))
  .on('updated', (userProfile) => OroCrm.putContact(UserProfileMapper(userProfile)))
  .on('destroyed', (userProfile) => OroCrm.deleteContact(userProfile.userId));
