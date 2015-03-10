// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'         : '787011884700826', // your App ID
        'clientSecret'     : 'f9f4749c177d9461fa81dec483ff48b6', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'         : 'UcIR2mziLxvUI8qdqavwtPuk3',
        'consum erSecret'     : 'Bo1qOGeVBnPI5Wj68blRqrXQpyaQngOLmInlj8n0d3UkVGtUs5',
        'callbackURL'         : 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '372714438281-sih6evjskmm8b6r172f52p8h08glddlj.apps.googleusercontent.com',
        'clientSecret'     : 'M3K0IGAkEMIq8I7XGh3mZs5Q',
        'callbackURL'     : 'http://localhost:8080/auth/google/callback'
    }

};