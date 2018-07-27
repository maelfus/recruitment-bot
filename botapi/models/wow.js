import monk from 'monk';

const db = monk('localhost:27017/botweb');
const collection = db.get('listingcollection');

export default collection;
