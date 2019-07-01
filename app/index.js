var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

var s3_vcap_services;
var s3_access_key_id;
var s3_bucket;
var s3_region;
var s3_secret_access_key;
var s3_uri;

if (process.env.VCAP_SERVICES) {
  console.log("Using VCAP_SERVICES Information to work with s3.");
  s3_vcap_services = JSON.parse(process.env.VCAP_SERVICES);
  s3_access_key_id = s3_vcap_services["s3"][0].credentials.access_key_id;
  s3_bucket = s3_vcap_services["s3"][0].credentials.bucket;
  s3_region = s3_vcap_services["s3"][0].credentials.region;
  s3_secret_access_key =
    s3_vcap_services["s3"][0].credentials.secret_access_key;
  s3_uri = s3_vcap_services["s3"][0].credentials.uri;
  console.log(s3_access_key_id);
  console.log(s3_bucket);
  console.log(s3_region);
  console.log(s3_secret_access_key);
  console.log(s3_uri);
} else {
  console.log(
    "VCAP_SERVICES Information not found. s3 connection will not be attempted."
  );
}

if (s3_access_key_id != "") {
  var config = new AWS.Config({
    accessKeyId: s3_access_key_id,
    secretAccessKey: s3_secret_access_key,
    region: s3_region
  });

  AWS.config.update(config);
  s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  var bucketParams = {
    Bucket: s3_bucket
  };

  let s3Objects;

  async function listObjs(notes) {
    try {
      s3Objects = await s3.listObjectsV2(bucketParams).promise();
      console.log(notes + " Success listObjects" + s3Objects);
    } catch (e) {
      console.log(notes + " Error listObjects" + e);
    }
  }

  listObjs("#1");

  const fs = require("fs");
  const content = "Some content!";

  fs.writeFile("test.txt", content, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });

  var uploadParams = { Bucket: s3_bucket, Key: "", Body: "" };
  var fileStream = fs.createReadStream("test.txt");
  fileStream.on("error", function(err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = "test.txt";

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log("Upload Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  });

  listObjs("#2");
}

app.get("/", (req, res) => res.send("Cooper"));
app.listen(port, () => console.log(`Application listening on port ${port}.`));
