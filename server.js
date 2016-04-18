var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var r = [];
var t, l, c;
app.use(bodyParser.json());
app.use(express.static('.'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});


MongoClient.connect("mongodb://localhost:27017/Assignment7", function(err, db) {
    assert.equal(null, err);
    if (!err) {
        app.post('/links', function(req, response) {
            t = decodeURI(req.body.title);
            l = req.body.links;
            c = 0;




            db.collection('user').insertOne({
                'title': t,
                'links': l,
                'clicks': c

            }, function(err, result) {

                console.log("Inserted a document into the user collection.");

            });

            console.log(t + l + c);


            response.send(JSON.stringify({
                "title": t,
                "links": l,
                "clicks": c

            }));

        });

        app.get('/links', function(req, res) {
            console.log("suu1");

            console.log("We are connected");




            finduser(db, function() {
                console.log(r);
                res.send(r);
            });




            r = [];
        });


        var finduser = function(db, callback) {
            var cursor = db.collection('user').find();
            console.log("cursor print" + cursor);
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    console.dir(doc);
                    r.push(doc);
                } else {
                    callback();
                }
            });
        };




        app.get('/click/:title', function(req, res) {
            var title = req.params.title;
            console.log(title);

            var link;
            var collection = db.collection('user');
            var cursor = collection.find();
            cursor.forEach(function(doc, error) {
                if (error) {
                    console.log("Error");
                }

                if (doc.title == title) {
                    console.log(doc.title);
                    console.log(doc.links);
                    console.log(doc.clicks);

                    var c = doc.clicks;
                    link = doc.links

                    c = c + 1;
                    console.log(c);
                    db.collection('user').updateOne({
                        "title": title
                    }, {
                        $set: {
                            "clicks": c
                        }
                    }, function(err, results) {

                        res.redirect(link);

                    });

                }


            });



        });
    }

});

app.listen(3000);
