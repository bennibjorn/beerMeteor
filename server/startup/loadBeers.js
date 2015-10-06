 Meteor.startup(function () {
    if (Beers.find().count() === 0) {
      var beers = [
        {
              'beerNum': 1,
              'taste': 5,
              'smell': 3,
              'finish': 2,
              'rating': 3
        },
        {
              'beerNum': 2,
              'taste': 10,
              'smell': 10,
              'finish': 10,
              'rating': 10
        },
        {
              'beerNum': 3,
              'taste': 7,
              'smell': 7,
              'finish': 7,
              'rating': 7
        }
      ];
      for (var i = 0; i < beers.length; i++)
        Beers.insert(beers[i]);
    }
     if (Events.find().count() === 0) {
         var events = [
            {
                "name": "bjorsmokkun benna",
                "owner": "bennibjorn@hotmail.com",
                "public": true,
                "started": false,
                "beerList": {}
            }
         ];
         var e = {
             "beerNum": 1,
             "beerName": "Kaldi"
         };
         events[0].beerList.push(e);
        for (var u = 0; u < events.length; u++)
             Events.insert(events[u]);
    }
  });
