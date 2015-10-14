 Meteor.startup(function () {
     /*
     if (Events.find().count() === 0) {
         var event =
            {
                "name": "bjorsmokkun benna",
                "owner": "bennibjorn@hotmail.com",
                "started": false,
                "beerList": {
                    "beerNum": 1,
                    "beerName": "Kaldi",
                    "beerRating": [
                        {
                            "user": "vHAHH98TjHPt2jCeT",
                            "taste": 10,
                            "smell": 10,
                            "finish": 10,
                            "rating": 10
                        }
                    ]
                }
            };
         Events.insert(event);
         */
          /*
        for (var u = 0; u < events.length; u++)
             Events.insert(events[u]);
         }
        */
        Meteor.publish("events", function(){
            return Events.find();
        });
        Meteor.publish("event-ratings", function(eventID){
            return Events.find({"_id": eventID});
        });
});
