EmpLogin.service('EncDecService', function() {
	this.encryption = function(randNo, upldkey, upldiv){
		/* var key = CryptoJS.enc.Base64.parse("'"+upldkey+"'");
		var iv  = CryptoJS.enc.Base64.parse("'"+upldiv+"'"); */
		var key = CryptoJS.enc.Base64.parse("as#mpk");
		var iv  = CryptoJS.enc.Base64.parse("pf#uio");
		encrypted="";
		encrypted = CryptoJS.AES.encrypt(randNo, key, {iv: iv});
		return encrypted.toString();
	}
	
	this.decryption = function(encString, upldkey, upldiv){
		/* var key = CryptoJS.enc.Base64.parse("'"+upldkey+"'");
		var iv  = CryptoJS.enc.Base64.parse("'"+upldiv+"'");*/		
		var key = CryptoJS.enc.Base64.parse("as#mpk");
		var iv  = CryptoJS.enc.Base64.parse("pf#uio");
		var decrypted = CryptoJS.AES.decrypt(encString, key, {iv: iv});		
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
});