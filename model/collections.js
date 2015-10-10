Events = new Mongo.Collection("events");
/*
{
    "name": "bjorsmokkun benna",
    "owner": "bennibjorn@hotmail.com",
    "started": false,
    "beerList": {
            "beerName": "Kaldi Dokkur",
            "beerNum": 0
            "beerRating": {
                "user": "bennibjorn@hotmail.com",
                "taste": 10,
                "smell": 10,
                "finish": 10,
                "rating": 10
            }
        }
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
