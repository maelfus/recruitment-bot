import monk from 'monk';

const db = monk('localhost:27017/botweb');
export const listings = db.get('listingcollection');
export const bnet = db.get('bnetcollection');
