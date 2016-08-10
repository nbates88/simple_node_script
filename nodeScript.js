var request = require("request")
var fs = require('fs');
var file = "/Users/nichole/Documents/resume.pdf"


function convertFile (fileName) {
   var data = fs.readFileSync(fileName);
   return new Buffer(data).toString('base64');
}

var myData = convertFile(file)

var requestData = {
  "first_name": "Nichole",
  "last_name": "Bates",
  "email": "nbates88@gmail.com",
  "position_id": "GENERALIST",
  "explanation": "I made a simple node script that converted my resume and then posted the JSON object to the URl",
  "projects": ["https://github.com/nbates88", "https://nichole-portfolio-2016.herokuapp.com/#/"],
  "source": "I attended a NYJS Meetup at Perka and Brian Ruslim told me about this process",
  "resume": myData
}


var url = "https://api.perka.com/1/communication/job/apply"


request({
    url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(requestData)
}, function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('response', JSON.stringify(response), '\nUpload successful!  Server responded with:', body);
  })