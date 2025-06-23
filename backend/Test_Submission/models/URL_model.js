const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
  url: {
    typeof: String
  },
  validality: String,
  
})