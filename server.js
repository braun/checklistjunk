const express = require('express')
const app = express()
const port =  process.env.EXPRESS_PORT; 
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;

const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

if(port == null)
    throw "Set EXPRESS_PORT";

if(DB_CONNECTION_STRING == null)
    throw "Set DB_CONNECTION_STRING"


if(DB_CONNECTION_STRING == null)
    throw "Set DATABASE_NAME"

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// // initialize mongo express
// var mge = mongo_express(mongo_express_config);
// mge.then((result)=>
// {
//     app.use('/mongo_express',result );
// },(reason)=>
// {
//     console.error("MONGO EXPRESS FAILED ",reason)
// })

//serve browser app
app.use('/',express.static('app'))

//run express on port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
    mongoApi();
  })


function mongoApi()
{
    
    
    var database, collection;
    
    MongoClient.connect(DB_CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
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