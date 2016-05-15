Parse.Cloud.define("sendPush", function(request, response){
  var title = request.params.title;
  console.log('title  = '+title);
  var queryPush = new Parse.Query(Parse.Installation);
  Parse.Push.send({
    where: queryPush,
    data: {
      alert: title,
      sound: "cheering.caf",
      badge: "Increment"
    }
  }, {
    useMasterKey: true,
    success: function() {
      response.success("Ceci est un succès !!");
    },
    error: function(error) {
      // There was a problem :(
      response.error("ERROR !!");
    }
  });
});

Parse.Cloud.define("sendSimplePush", function(request, response){
  var title = request.params.title;
  console.log('title  = '+title);
  var queryPush = new Parse.Query(Parse.Installation);
  Parse.Push.send({
    where: queryPush,
    data: {
      alert: title,
      sound: "cheering.caf"
    }
  }, {
    useMasterKey: true,
    success: function() {
      response.success("Ceci est un succès !!");
    },
    error: function(error) {
      // There was a problem :(
      response.error("ERROR !!");
    }
  });
});

Parse.Cloud.define("sendPushTroll", function(request, response){
  var queryPush = new Parse.Query(Parse.Installation);
  Parse.Push.send({
    where: queryPush,
    data: {
      alert: "",
      sound: "cheering.caf",
    }
  }, {
    useMasterKey: true,
    success: function() {
      response.success("Ceci est un succès TROLL!!");
    },
    error: function(error) {
      response.error("ERROR TROLL!!");
    }
  });
});
