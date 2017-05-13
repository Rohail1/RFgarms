/**
 * Created by Rohail Najam on 2/5/2017.
 */

const path = require('path');
const rootPath = path.normalize(__dirname+"/../");


const configurations = {

  development : {
    port : 3000,
    rootPath : rootPath,
    jwtSecret : 'jwtSceretString',
    db: {
      name : "RFGrams",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/rfgrams",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
    },
    logStyle : 'dev',
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth',
      ADMIN : '/admin',
      PUBLIC : '/public'
    }
  },

  production : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    jwtSecret : 'jwtSceretString',
    logStyle : 'combined',
    db: {
      name : "RFGrams",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/rfgrams",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
    },
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth',
      ADMIN : '/admin',
      PUBLIC : '/public'
    }
  },

  testing : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    jwtSecret : 'jwtSceretString',
    logStyle : 'combined',
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth',
      ADMIN : '/admin',
      PUBLIC : '/public'
    },
    db: {
      name : "RFGrams",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/rfgrams",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
    },
  }
};


function returnConfiguration(env) {
  return configurations[env];
}

module.exports = returnConfiguration;