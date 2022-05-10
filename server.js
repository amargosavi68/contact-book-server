const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = "mongodb://localhost:27017/test";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const phoneSchema = mongoose.Schema({
  mobile: {
    type: String
  },
  work: {
    type: String
  }
})

const contactSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: phoneSchema
})

const Contacts = mongoose.model('Contacts', contactSchema);

const app = express();

app.use(express.json());

app.use(cors())

app.get("/contacts", async (req, res) => {
  try {
      const students = await Contacts.find();    
      res.status(200).json(students);
  } catch(error) {
      res.status(404).json({message: error.message});
  }

});

app.post("/contacts", (req, res) => {
  console.log(req.body)
  Contacts.create(req.body, (err, result) => {
    if (err) {
      res.statusCode = 200;
      res.send(err);
    } else {
      res.status(200).json(result);
      console.log("Record inserted sucessfully");
    }
  });
});
app.put("/editcontact", (req, res) => {
  Contacts.updateOne(req.body, (err, result) => {
    if (err) {
      res.statusCode = 200;
      res.send(err);
    } else {
      res.status(200).json("Contact Updated successfully");
    }
  });
});

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
