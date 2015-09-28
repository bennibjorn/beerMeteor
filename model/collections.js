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
