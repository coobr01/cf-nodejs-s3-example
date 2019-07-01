# Overview
This example was created to show how to use the [AWS SDK for JavaScript in Node.js](https://aws.amazon.com/sdk-for-node-js/) to read and write a file to an attached S3 managed service.

# Prerequisite
- A Cloud Foundry based hosting location which has access to the S3 service
- Setup s3 service in the organization/space
  - `cf create-service s3 basic-public cf-nodejs-s3-example-s3`
- Push the sample applicaiton to the organization/space
  - cf push cf-nodejs-s3-example --health-check-type none --no-route
- Once deployed, check the log file of the application to see the hyperlink to the example s3 file
  - `cf logs cf-nodejs-s3-example --recent`
  
  ![console log image](https://github.com/coobr01/cf-nodejs-s3-example/blob/master/docs/images/logfile.png "console log image")
  
