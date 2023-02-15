const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const path = require('path')
const storageFile = require('fs')
const schedule = require('node-schedule')
let app = express();
const port = 3000;
let colors = require('colors');
const cors = require('cors');
const file = require('../data/newData.json');
const nodemailer = require('nodemailer')


let executeJob;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('../frontend'))


const filePath = path.join(__dirname, '../data/newData.json');

const createFile = async (fileContents, newFile) => 
{
  const writeFile = storageFile.createWriteStream(newFile, {flags:'w'});
  writeFile.write(fileContents);
}

const scheduleEvent = async (dataToWrite, request) => 
{
  let listingData = await request
  let data = await dataToWrite;
  await createFile(JSON.stringify(data), filePath) //Writes the data to the temp file.
}

const scheduleAJob = (job, scheduleFrequency, method, url) => {
  job = schedule.scheduleJob(scheduleFrequency, async () =>
  {
    try
    {
      let config = getConfig(method, url)
      let retrievedData = await axios(config);
      scheduleEvent(retrievedData.data, config);
      job.cancel();
      console.log('Job ran and finished successfully'.bgGreen)
    }
    catch
    {
      console.log('Job did not run'.bgRed)
    }
  })
}

scheduleAJob(executeJob, '0 0 * * *', 'get', process.env.MelissaListings)


const requestListings = async (url, res, req) => 
{
  let config = getConfig('get', url)
  let listingData = await axios(config)
  let data = await listingData.data.value;
  await res.json(data)
}


const listingIDMelissaListing = async (url, res, req) => 
{
  let config = getConfig('get', url)
  let listingData = await axios(config)
  let data = await listingData.data;
  await res.json(data) 
}


app.get('/listings', async (req, res) => 
{
  res.json(file);
});


// Get Single Item
app.get('/listing/:id',async (req, res) => {
  try 
  {
    let listingID = req.params.id

      let listingURL = `https://replication.sparkapi.com/Version/2/Reso/OData/Property('${listingID}')?$expand=Media`;

      listingIDMelissaListing(listingURL, res);  
    
  } catch (error) 
  {
    res.status(404).send('<h1>No Property to Display</h1>')
  }
})


// Search for listings
app.get('/search/:city', async (req, res) => {
  const filter = req.params.city;
  let SearchUrl = `https://replication.sparkapi.com/Version/2/Reso/OData/Property?$expand=Media&$top=300&$filter=contains(City,%27${filter}%27)`


  await requestListings(SearchUrl, res)
})


// Melissa's Listings
app.get('/melissalistings', async (req, res) => 
{

  const melissaUrl = `https://replication.sparkapi.com/Version/2/Reso/OData/Property?$expand=Media&$filter=ListAgentKey eq '20170127162138780060000000'`;

  listingIDMelissaListing(melissaUrl, res);

});


app.post('/sendmail', (req, res) =>{
      // Sending emails
    console.log(req.body);

    let mail = nodemailer.createTransport({
      service: 'gmail',
      auth: 
      {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      }
    });

    let mailOptions = 
    {
      from: req.body.from,
      to: process.env.EMAIL,
      subject: req.body.subject,
      text : req.body.body,
    }

    mail.sendMail(mailOptions, (error, info) => 
    {
      error ? console.log('No success') : res.status(200).json(`Success ${info.response}`);
    });
})


const getConfig = (method, url) => {

  let config = 
  {
    method: method,
    url: url,
    headers: { 
      'Authorization': process.env.Authorization, 
      'Accept': process.env.Accept, 
      'X-SparkApi-User-Agent': process.env.UserAgent
    }
  };

  return config;

}

//Render Static Files



app.listen(port, () => {
  console.log(`listening on ${port}`)
});











