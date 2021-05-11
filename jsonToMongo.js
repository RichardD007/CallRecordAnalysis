//Initialize the Mongo Client , url and fs for the application. 
let MongoClient = require ("mongodb").MongoClient;
let url = "mongodb://localhost:27017/callRecord";

let CRdatabase = require('./call_data.json');
const fs = require ('fs');

//connect to the mongo database and collection that we want to read.
MongoClient.connect(url, {useUnifiedTopology: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db("callRecord")
    
    dbo.createCollection("Records", function(err, res){

        console.log("Collection Created");


    
    });
    // Create connection to JSON file then read the data, next parse the JSON file to and object then pass to the database. 
    
    fs.readFile('./call_data.json' , 'utf8' , (err,data) =>{
        if(err){
            console.log(`Error Reading File from JSON. ${err}`);
        }else{
            const databases = JSON.parse(data);
            console.log("Reading data OK");
            databases.forEach(db => {
                var obj = {_id:db._id ,source:db.source , destination:db.destination, destination: db.destination , destinationLocation:db.destinationLocation, callDuration:db.callDuration, roaming:db.roaming, callCharge:db.callCharge };
                dbo.collection("Records").insertOne(obj, function(err, res){
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                })
              
            });
        }
    } )
    
});

