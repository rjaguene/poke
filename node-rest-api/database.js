const mongoose = require('mongoose');

e

mongoose.connection.on('connected', () => {
    console.log('connected!!!!!!!!')
})

const Poke = new mongoose.Schema({
  name: String,
  hp: String,
  cp: String,
  id: Number,
  picture: String
});

const poke = mongoose.model("Poke", Poke);

//const data = new nftData({
  //  title: "aa",
   // content: "bb"
 // });
  //data.save((err) =>{
 //   console.log(err)
 // });

module.exports = poke;



/*const data = new nftData({
    title: "aa",
    content: "bb"
  });*/
  //data.save((err) =>{
 //   console.log(err)
 // });

