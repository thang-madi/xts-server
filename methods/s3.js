
import { readFile } from "node:fs/promises";
import { PutObjectCommand, S3Client, S3ServiceException, } from "@aws-sdk/client-s3";


// Object's

module.exports.s3UploadFile = async function s3UploadFile(bucketName, key, filePath) {

    const client = new S3Client({
        region: 'YOUR_AWS_REGION',
        credentials: {
            accessKeyId: 'YOUR_ACCESS_KEY_ID',
            secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
        }
    });
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: await readFile(filePath),
    });

    try {
        const response = await client.send(command);
        console.log(response);
    } catch (caught) {
        if (
            caught instanceof S3ServiceException &&
            caught.name === "EntityTooLarge"
        ) {
            console.error(
                `Error from S3 while uploading object to ${bucketName}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`,
            );
        } else if (caught instanceof S3ServiceException) {
            console.error(
                `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`,
            );
        } else {
            throw caught;
        }
    }

    // const fs = require('fs');
    // const path = require('path');

    // const filePath = path.join(__dirname, 'path/to/your/file');
    // const fileStream = fs.createReadStream(filePath);

    // const params = {
    //     Bucket: 'your-bucket-name',
    //     Key: 'your-file-key',
    //     Body: fileStream
    // };

    // s3.upload(params, function (err, data) {
    //     if (err) {
    //         console.error('Error uploading file:', err);
    //     } else {
    //         console.log('File uploaded successfully:', data.Location);
    //     }
    // });

}

module.exports.s3UploadBase64String = async function s3UploadBase64String(bucketName, key, base64String) {

}

module.exports.s3DownloadFile = function s3DownloadFile() {

}

module.exports.s3DeleteFile = function s3DeleteFile(bucketName, key) {

}

module.exports.s3MoveFile = function s3MoveFile(bucketName, oldKey, newKey) {

}

module.exports.s3GetObjectList = function s3GetObjectList(bucketName) {

}

// Bucket's

module.exports.s3CreateBucket = function s3CreateBucket(bucketName) {

}

module.exports.s3DeleteBucket = function s3DeleteBucket(bucketName) {

}

module.exports.s3GetBucketList = function s3GetBucketList() {

}

// Policy's

module.exports.s3PutBucketPolicy = function s3PutBucketPolicy() {

}

module.exports.s3GetBucketPolicy = function s3GetBucketPolicy() {

}

module.exports.s3DeleteBucketPolicy = function s3DeleteBucketPolicy() {

}



