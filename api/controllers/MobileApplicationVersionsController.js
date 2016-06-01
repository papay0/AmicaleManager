/**
 * MobileApplicationVersionsController
 *
 * @description :: Server-side logic for managing Mobileapplicationversions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'/':function(req, res){
		var obj = new Object();
		var objIOS = new Object();
		var objANDROID = new Object();
		obj.iOS = objIOS;
		objIOS.versionsNotAllowed = ["1.1.1", "1.1.2"];
		objIOS.message = "La version actuelle de l'application risque de ne pas fonctionner correctement, veuillez la mettre à jour.";
		obj.Android = objANDROID;
		var jsonToSend = {'json':obj}
		res.send(jsonToSend);
	}
};
