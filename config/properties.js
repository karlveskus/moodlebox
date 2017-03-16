const env = require('./env_variables.json')[process.env.NODE_ENV || 'development'];
const secrets = require('./secrets.json');

module.exports = {
    port: env.port,
    database: {
        host_name: 'MongoDb Atlas',
        src: 'mongodb://moodleBox:' + secrets.db_password + '@moodlebox-shard-00-00-rxgsj.mongodb.net:27017,moodlebox-shard-00-01-rxgsj.mongodb.net:27017,moodlebox-shard-00-02-rxgsj.mongodb.net:27017/MoodleBox?ssl=true&replicaSet=MoodleBox-shard-0&authSource=admin',
        secret: 'secretkey'
    }
}