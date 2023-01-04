const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const nftData = require('./database');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;


app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use(cors({
  origin: ['http://localhost:4200', 'https://my-website.com']
}));

app.get('/api', (req, res) => {
  nftData.find({})
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
})


app.get('/api/:id', (req, res) => {
  const id = req.params.id;
  const objet = nftData.findOne({ id: id });
  if (objet) {
    objet.exec((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(result);
      }
    });
  }
});

app.delete('/api/:id', (req, res) => {
  const id = req.params.id;

  // Supprimer le pokemon avec cet id dans la base de données
  nftData.deleteOne({ id: id })
    .then(() => {
      // Si la suppression a réussi, renvoyer une réponse vide avec un statut 200
      res.status(200).send();
    })
    .catch((err) => {
      // Si la suppression a échoué, renvoyer une erreur 500 avec un message d'erreur
      res.status(500).send(err);
    });
});

app.post('/api/save', (req, res) => {
  console.log("okkkkkkkk")
  // console.log(req.body)
  let data = req.body

  // console.log(data)

  const update = data.update;
  //const adress = data.adress;

  // console.log(update);


  /*   for (let i = 0; i < img.length; i++) {
         console.log(i);
         let data = new nftData({
             adress: adress[i],
             imgUrl: img[i]
         })
         data.save();
     }*/
  const name = data.name;
  const hp = data.hp;
  const cp = data.cp;
  const id = data.id
  const picture = data.picture

  if (data.update == 0) {
    const filter = { name: name };
    const update = { data: data };
    // console.log(filter, update)
    let doc = nftData.findOneAndUpdate(filter, update, { returnOriginal: false }).exec();
  } else {

    let poke = new nftData({
      name: name,
      hp: hp,
      cp: cp,
      id: id,
      picture: picture
    })

    poke.save();

  }
})



app.put('/api/:id', (req, res) => {
  console.log("okkkk")
  const id = req.params.id;
  const pokemon = req.body;
  
  // Mettre à jour le pokemon avec cet id dans la base de données
  nftData.findOneAndUpdate({ id: id }, pokemon)
  .then(() => {
  // Si la mise à jour a réussi, renvoyer une réponse vide avec un statut 200
  res.status(200).send();
  })
  .catch((err) => {
  // Si la mise à jour a échoué, renvoyer une erreur 500 avec un message d'erreur
  res.status(500).send(err);
  });
  });


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}



app.listen(PORT, console.log('listening on $(PORT)'));