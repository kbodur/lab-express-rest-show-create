const express = require('express')

const logs = express.Router()

const logsArray = require('../models/logs')

const { checkForCaptainNameKey } = require('../validation/logsValidation')
logs.get('/', (req, res) => {
    res.json(logsArray)
})

logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(logsArray[arrayIndex]){
    res.status(200).json(logsArray[arrayIndex]);}
    else{
        res.redirect('/logs/9001')
       
    }
  });

logs.post('/', checkForCaptainNameKey, (req,res) =>{
  logsArray.push(req.body);
    res.json(logsArray[logsArray.length-1])
})

logs.delete("/:indexArray", (req, res) => {
    const { indexArray } = req.params;
    if (logsArray[indexArray]) {
      const deletedLogs = logsArray.splice(indexArray, 1);
      res.status(200).json(deletedLogs[0]);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

   // UPDATE
logs.put("/:arrayIndex", checkForCaptainNameKey, (req, res) => {
    const { arrayIndex } = req.params;
    logsArray[arrayIndex] = req.body;
    res.status(200).json(logsArray[arrayIndex]);
  });
 

logs.get('/', (req, res) => {
    let filteredLogs = [...logsArray];
  
   if (!Object.keys(req.query).length) {
       filteredLogs=logsArray}
     else if (req.query.order === 'asc') {
        filteredLogs.sort((a, b) => a.captainName.toLocaleLowerCase() > b.captainName.toLocaleLowerCase() );}
     else if (req.query.order === 'desc') {
        filteredLogs.sort((a, b) => a.captainName.toLocaleLowerCase() < b.captainName.toLocaleLowerCase());
      }
    
    if (req.query.mistakes) {
      const filterValue = req.query.mistakes === 'true';
      filteredLogs = filteredLogs.filter(log => log.mistakesWereMadeToday === filterValue);
    }
    res.json(filteredLogs);
})


module.exports = logs