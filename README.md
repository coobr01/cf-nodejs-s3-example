# Overview
This example was created to show how to use the [AWS SDK for JavaScript in Node.js](https://aws.amazon.com/sdk-for-node-js/) to read and write a file to an attached S3 managed service.

# Prerequisite
- A Cloud Foundry based hosting location which has access to the S3 service
- Setup s3 service in the organization/space
  - `cf create-service s3 basic-public cf-nodejs-s3-example-s3`
- Push the sample applicaiton to the organization/space
  - `cf push cf-nodejs-s3-example --health-check-type none`
- Once deployed, tail the log file of the application
  - `cf logs cf-nodejs-s3-example --recent`
- Use web application endpoint to create/upload file to s3
  - `https:\\YOURAPPNAME\createFile` -- this should provide a https hyperlink to the s3 file
    
  ![console log image](https://github.com/coobr01/cf-nodejs-s3-example/blob/master/docs/images/logfile.png "console log image")
  
# Cleanup
- If needed by your Cloud Foundry provider - delete the test file from s3 (i.e. clear the bucket)
  - `https:\\YOURAPPNAME\emptyBucket`
- Delete the application
  - `cf delete cf-nodejs-s3-example`
- Remove the s3 instance
  - `cf delete-service cf-nodejs-s3-example-s3`
