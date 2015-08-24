var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/lib',express.static(__dirname+ 'public/lib/'));
app.use('/css',express.static(__dirname+ 'public/css/'));
app.use('/app',express.static(__dirname+ 'public/app'));

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  var collection = db.collection('test');
  var doc1 = {'hello':'doc1'};
  var doc2 = {'hello':'doc2'};
  var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

  collection.insert(doc1);

  collection.insert(doc2, {w:1}, function(err, result) {});

  collection.insert(lotsOfDocs, {w:1}, function(err, result) {});

  }
});


app.get('/', function(req, res){
  res.redirect('/index.html');
});


app.listen(8181);

