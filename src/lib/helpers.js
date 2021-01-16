const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10); /* esto genera un patrón */
   const hash = await bcrypt.hash(password,salt); /* esto cifra la contraseña */
   
   return hash;

};

helpers.matchPassword = async (password,savedPassword) => {
	try{
 		return await bcrypt.compare(password,savedPassword);
	}catch(error){
		console.log(error);
	}

};

module.exports = helpers;
