Events = new Mongo.Collection("events");
/*
{
    "name": "bjorsmokkun benna",
    "owner": "bennibjorn@hotmail.com",
    "started": false,
    "beerList": {
            "beerNum": 0,
            "beerName": "Kaldi Dokkur",
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

Meteor.methods({
    rateBeer: function (objId, beerGradeObj) {
      //var modifier = {$inc: {}};
      //modifier.$inc['beerList[' + beerNum + '].beerRating'] = beerGradeObj;
      //Meteor.users.update({'_id': Meteor.userId()}, modifier);
    Events.update({ _id:objId },
        { $push: { beerRatings: beerGradeObj}}
    );
    Meteor.call("updateTVcharts", function(error, result){
        if(error){
            console.log("error", error);
        }
        if(result){
             console.log("result", result);
        }
    });
    return "beerRatings updated";
      //$scope.beerList[$scope.beerNum-1].beerRating.push(beerGrade);
  }

});
