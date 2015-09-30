Beers = new Mongo.Collection("beers");
/*
{
    "beerNum": 0,
    "beerName": "Kaldi Dökkur",
    "eventName: "bjorsmokkun benna"
}
*/
Events = new Mongo.Collection("events");
/*
{
    "name": "bjorsmokkun benna",
    "owner": "bennibjorn@hotmail.com",
    "public": false
}
*/
BeerRating = new Mongo.Collection("beerRating");
/*
{
    "user": "bennibjorn@hotmail.com",
    "beerNum": 0,
    "taste": 10,
    "smell": 10,
    "finish": 10,
    "rating": 10
}
*/

Events.allow({
  insert: function (userId, event) {
    return userId && event.owner === userId;
  },
  update: function (userId, event, fields, modifier) {
    return userId && event.owner === userId;
  },
  remove: function (userId, event) {
    return userId && event.owner === userId;
  }
});
