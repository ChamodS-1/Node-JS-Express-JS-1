const fs = require('fs');
const path = require('path');


const express = require('express');
const app = express();

app.use(express.urlencoded({extended : false}));

app.get('/user-data', function(req,res){

    res.send('<h1>Chamod</h1>');

});

app.get('/', function(req,res){

   res.send('<form action="/user-name" method="POST"><label for="your-name">Your Name :</label><input type ="text" name="username" id="yourname"><label for="your-age">Your Age :</label><input type ="number" name="userage" id="your-age"><button>Submit</button></form>');

});

app.post('/user-name', function(req,res){

    const  userName = req.body.username;
    const  userAge = req.body.userage;
    const filePath = path.join(__dirname, 'data' , 'names.json');

    const readFile = fs.readFileSync(filePath);
    const exisitingFile = JSON.parse(readFile);

    exisitingFile.Name = userName;
    exisitingFile.Age = userAge;
    //exisitingFile.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(exisitingFile));

    console.log(exisitingFile.Name);
    res.send('<h1>Data Stored!</h1>');

});

app.get('/result',function(req,res){

    const filePath = path.join(__dirname, 'data' , 'names.json');

    const readFile = fs.readFileSync(filePath);
    const exisitingFile = JSON.parse(readFile);

    let unordedList = '<ul>';
   // unordedList='';

    for(const user in exisitingFile){
     
        unordedList=unordedList+'<li>'+user+':'+'  '+exisitingFile[user]+'</li>';

    }

    unordedList+='</ul>';

    res.send(unordedList);


})

app.listen(3000);