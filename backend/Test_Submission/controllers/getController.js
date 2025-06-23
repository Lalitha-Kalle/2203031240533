const express = require("express")

function getController(req, res) {
  const body = req.body
  res.send("GET")
}


module.exports = {
  getController,

}