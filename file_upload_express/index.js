'use strict';

var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
require('colors');

var app = express();
app.use(bodyParser.json());

var file_meta = {};

var imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Images");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
 });

var upload = multer({
  storage: Storage,
  fileFilter: imageFilter,
  limits: {fileSize: 1024*20}
}).array("imgUploader", 3); //Field name and max count


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log('/api/upload fail ----------------'.red);
      console.log(err);
      return res.end("Something went wrong!");
    }

    file_meta = req.file;
    console.log('file metadata: '.blue);
    console.log(req.files);

    return res.end("File uploaded sucessfully!.");
  });
});

app.get('/api/image/:id', function(req, res) {
  res.setHeader('Content-Type', 'image/jpeg');
  fs.createReadStream(path.join('./Images', req.params.id)).pipe(res);
})

app.listen(2000, function(a) {
  console.log("Listening to port 2000");
});