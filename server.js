const express = require('express');
const _ = require('lodash');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();

app.use(expressLayouts);
app.set('layout', 'main-layout');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// our first Route
app.get('/', (request, response, next) => {
  console.log("Me ha llegado la pregunta.");
  let filename = __dirname+'/views/juan.html';
  console.log(`He pedido el fichero: ${filename}`);
  response.sendFile(filename);
});


let animals = [
  {name:'Ornitorrinco'},
  {name:'Tortuga', color: 'green'},
  {name:'Rinoceronte', color:'red'},
  {name:'Suricata',color:'yellow'},
  {name:'Mapache', color:'blue'},
  {name:'Andrei', color:'purple'},
  {name:'Miguel', color: 'pink'}
];



app.get('/madrid', (req,res) =>{
  res.render('animales-madrid', {
    sitio: "IronHack Madrid",
    animales: _.take(animals, 4)
  });
});

app.get('/miami', (req,res) =>{
  res.render('animales-miami', {
    sitio: "IronHack Miami",
    animales: _.takeRight(animals, 4)
  });
});

app.get('/animals', (req,res) =>{
  if(req.query.animal){
    animals.push({name:req.query.animal, color:'red'});
  }

  res.render('add-animals', {
    sitio: "IronHack Miami",
    animales: animals,
    nombre: req.query.name || ' no hay parametro para añadir el animal '
  });
});


app.post('/animals', (req,res) =>{
  console.log("QUERY PARAMETERS:");
  console.log(req.query);
  console.log("HTTP BODY:");
  console.log(req.body);
  animals.push({name:req.body.animal, color:'red'});
  res.redirect('/animals?name=ESPOSTCONREDIRECT');
});



// Server Started
let port = 3000;
app.listen(port, () => {
  console.log(`My first app listening on port ${port}!`);
});
