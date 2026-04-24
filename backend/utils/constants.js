
require("dotenv").config();
 const cloudName = process.env.cloud_name;
 const apiKey =process.env.api_key;
const  apiSecret = process.env.api_secret;

module.exports ={
    cloudName,
    apiKey,
    apiSecret
}