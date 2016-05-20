/**
 * LocalsController
 *
 * @description :: Server-side logic for managing Localscontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'/':function(req, res){
      var json = [];
      var array = [[]];
			var i = 0;
			var NUMBER_LOCALS = 6;
      for (i = 0; i < NUMBER_LOCALS ; i++) {
        array[i] = [];
      }
			for (i = 0; i < NUMBER_LOCALS; i++) {
				array[i]['available'] = "Ouvert";
				array[i]['name'] = "Amicale";
				array[i]['remainingTime'] = "15";
				array[i]['startTime'] = "18:30";
				array[i]['endTime'] = "19:30";
			}
      for (i = 0; i < NUMBER_LOCALS ; i++){
				var name = array[i]['name'];
				var available = array[i]['available'];
				var remainingTime = array[i]['remainingTime'];
				var startTime = array[i]['startTime'];
				var endTime = array[i]['endTime'];
        json[i] = {'name': name, 'available': available, 'start':startTime, 'end': endTime, 'remainingTime': remainingTime};
      }
			var jsonToSend = {'json':json, 'message':"Tout va bien", 'errorCode': 0, 'messageIfIWant': "C'est cool non ?"}
      res.send(jsonToSend);
    }
};
