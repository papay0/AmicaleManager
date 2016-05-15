/**
* MenuRUController
*
* @description :: Server-side logic for managing Menurus
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

	'/':function(req, res){
		var request = require('request');
		var cheerio = require('cheerio');

		var entreeRegex = "Entrées";
		var platDuJourRegex = "Plat du jour";

		url = "http://m.insa-toulouse.fr/wsResto.php";
		request(url, function(error, response, html){
			if(!error) {
				console.log("loading success");
				var $ = cheerio.load(html);
				var json = [];
				var array = [[]];
				for (i = 0; i < 12 ; i++){
					array[i] = [];
				}

				var data = $('ul').map(function(index, element){
					var text = $(element).text();
					//sails.log(date);
					if ($(element).children('li') != "") {
						var date = $(element).children('li').text();
						sails.log(date);
					}
					if ($(element).children('div') != "") {
						var description = String($(element).children('div'));
						description = description.replace(/(?:&nbsp;|<br>)/g,' ');
						//description = description.replace(/[\n]/g, '');
						//description = description.trim();
						sails.log("description: "+description);
						//var regExString = "(?="+entreeRegex+").*?(?="+platDuJourRegex+")";
						//var testRE = description.match(regExString);
						//sails.log(testRE);
					}
				})
			}
		})
	},


};
