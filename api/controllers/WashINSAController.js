/**
* WashINSAController
*
* @description :: Server-side logic for managing Washinsas
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

	addEntryFirebase: function() {
		var moment = require('moment');
		var date = moment().format("DD-MM-YYYY, h:mm:ss a");
		sails.log("coucou, I add an entry in Firebase database");
		var firebase = require ('firebase');
		var db = firebase.database();
		var ref = db.ref("washing/");
		var logRef = ref.child("log/");
		var newLogRef = logRef.push();
		newLogRef.set({
				date: date,
		});
		var upNumberUsersRef = db.ref("washing/numberUsers");
		upNumberUsersRef.transaction(function (current_value) {
		  return (current_value || 0) + 1;
		});
	},

	'/':function(req, res){
		this.addEntryFirebase();
		var request = require('request');
		var cheerio = require('cheerio');
		url = "http://www.proxiwash.com/weblaverie/ma-laverie-2?s=cf4f39&16d33a57b3fb9a05d4da88969c71de74=1";
		request(url, function(error, response, html){
			if(!error) {
				console.log("loading success");
				var $ = cheerio.load(html);
				var json = [];
				var array = [[]];
				for (i = 0; i < 12 ; i++){
					array[i] = [];
				}
				var available = ""
				var startDate = ""
				var endDate = ""
				var remaningTime = ""
				var i = 0;
				var state = 0;
				var type = "";
				var startDateFound = false;
				var regexTime = /[0-9][0-9]?:[0-9][0-9]/;
				var data = $('td[style=\"height:10;vertical-align:middle\"]').map(function(index, element){
					var text = $(element).text();
					//console.log("element.text(): "+text);
					//console.log("element: "+$(element));
					//if ($(element).attr('font') != "undefined" && $(element).attr('font').text() != "")  {
					if (text.indexOf("SECHE") > -1 || text.indexOf("LAVE") > -1) {
						type = text;
						//sails.log("type = "+type);
					}
					if ($(element).children('font') != "")  {
						i += 1;
						//console.log("font: "+$(element).children('font'));
						if (text.indexOf("DISPONIBLE") > -1) {
							available = "Disponible";
						} else if (text.indexOf("TERMINE") > -1) {
							available = "Terminé";
						} else if (text.indexOf("HORS SERVICE") > -1) {
							available = "Hors service";
						} else {
							available = "ERROR";
						}
						//console.log("["+i+"] Available: "+available);
					}
					var remaning = $(element).children('table').attr('title');
					if (remaning) {
						i += 1;
						available = "En cours d'utilisation";
						//console.log("["+i+"] Available: "+available);
						var arr = remaning.split(" ");
						//console.log("time: "+ arr[3]);
						remaningTime = arr[3];
					}
					//console.log("regex: "+regexTime.test(text));
					if (regexTime.test(text)) {
						if (state == 0) {
							startDate = text;
							state = 1;
							//console.log("start: "+startDate);
							startDateFound = true;
						} else {
							endDate = text;
							state = 0;
							//console.log("end: "+endDate);
						}
					}
					if (available !== "") {
						//json[i] = {'machine': i, 'available': available, 'start':startDate, 'end': endDate};
						array[i-1]['available'] = available;
					}
					if (startDate !== "") {
						array[i-1]['start'] = startDate;
					}
					if (endDate !== "") {
						array[i-1]['end'] = endDate;
					}
					if (remaningTime !== "") {
						array[i-1]['remaningTime'] = remaningTime;
					}
					if (type !== "") {
						//sails.log("i = "+i);
						array[i]['type'] = type;
					}
					//console.log("--------> available: "+available);
					startDate = "";
					endDate = "";
					available = "";
					remaningTime = "";
					type = "";
					startDateFound = false;
				})
				for (i = 0; i < 12 ; i++){
					var available = -1;
					var start = -1;
					var end = -1;
					var remainingTime = -1;
					var type = -1;
					if (array[i]['available'] !== undefined) {
						available = array[i]['available'];
					}
					if (array[i]['start'] !== undefined) {
						start = array[i]['start'];
					}
					if (array[i]['end'] !== undefined) {
						end = array[i]['end'];
					}
					if (array[i]['remaningTime'] !== undefined) {
						remainingTime = array[i]['remaningTime'];
					}
					if (array[i]['type'] !== undefined) {
						type = array[i]['type'];
					}
					json[i] = {'machine': i+1, 'available': available, 'start':start, 'end': end, 'remainingTime': remainingTime, 'type': type};
				}
				var jsonToSend = {'json':json, 'message':"Tout va bien", 'errorCode': 0, 'messageMachineTermine': "Quelqu'un vous attend ..."}
				res.send(jsonToSend);
			} else {
				res.send("Error loading page");
				console.log("error loading page");
			}
		})
	},

};
