const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(cors());
// enable public folder
app.use(express.static('public'));


require("./routes/quoteRoutes")(app);

const uri = process.env.MONGODB_URI || "mongodb+srv://root:root@cluster0-0bwqc.mongodb.net/quotesDB";

mongoose.connect(uri,{useNewUrlParser: true});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running`);
});