const express = require('express')
const app = express()
const port =  process.env.EXPRESS_PORT

var mongo_express = require('mongo-express/lib/middleware')
var mongo_express_config = require('./mongo_express_config')

const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// initialize mongo express
var mge = mongo_express(mongo_express_config);
mge.then((result)=>
{
    app.use('/mongo_express',result );
},(reason)=>
{
    console.error("MONGO EXPRESS FAILED ",reason)
})

//serve browser app
app.use('/',express.static('app'))

//run express on port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
    mongoApi();
  })


function mongoApi()
{
    const CONNECTION_URL = mongo_express_config.mongodb.connectionString;
    const DATABASE_NAME = "checklist";
    var database, collection;
    
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("templates");
        console.log("Connected to `" + DATABASE_NAME + "`!");

        //endpoint
        app.get("/templates", (request, response) => {
            collection.find({}).toArray((error, result) => {
                if(error) {
                    return response.status(500).send(error);
                }
                response.send(result);
            });
        });
    });
}