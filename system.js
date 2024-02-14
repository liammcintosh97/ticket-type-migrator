var fs = require('fs');

function save(data,fileName){
  fs.writeFile(fileName, JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('Saved successfully');
    }
  );
}

async function load(fileName){
  return new Promise((resolve,reject) => {
    fs.readFile(fileName,'utf8',(err,data)=>{
      if (err){
        reject(err);
      }
      else{
        resolve(JSON.parse(data))
      }
    })
  })
}

module.exports = {
  save,
  load
}