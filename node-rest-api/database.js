const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://azetod:7g5pdNRf8BEQs7YG@cluster0.9anqsbn.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


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

