const system = require("./system.js")
const utility = require("./utility.js")
const migrator = require("./migrator.js")
const asana = require('asana');
const { param } = require("express/lib/request");

const accessToken = ""
const client = asana.Client.create().useAccessToken(accessToken);

const workspace = "996763182203";
const project = "1119164140873603";
const startDate = new Date(Date.parse("01/04/2019"))
const currentDate = new Date();

const searchErrors = [];
var iterations = 0;
const exeStartTime = new Date();

main();

//FUNCTIONS//

async function main(){

  var tasks = await system.load("tasks.json").catch((err) =>{
    if (err.code === 'ENOENT') {
      console.log('No Tasks File');
      return getTasks();
    }
    else console.log(err)
  });

  console.log("Loaded Tasks successfully")
  updateTasks(tasks)
}

async function updateTasks(tasks){
  for(t of tasks){
    var task = await getTask(t);

    var venueString = utility.getCustomFieldValue(task,"1197971343306526")

    if(venueString === null){
      console.log("No venue string, continuing")
      continue
    }

    await updateTask(task,venueString).then((results)=>{
      console.log("Updated task successfully: " + t)
    }).catch((error) =>{
      console.log(error)
      return
    });
  }
}

async function updateTask(task,venueString){
  var fields = migrator.migrateVenueData(venueString);

  var params = {
    "custom_fields": JSON.stringify(fields)
 }

  return client.tasks.updateTask(task.gid, params)
}

async function getTask(taskGid){

  return client.tasks.getTask(taskGid, {opt_pretty: true})
  .then((result) => {
      return result
  }).catch((err)=>{
      console.log(err)
  });
}

async function getTasks(){
  console.log("Getting Tasks");
  const tasks = [];
  var loop = new Date(startDate);
  var endDate = new Date(currentDate.setDate(currentDate.getDate() + 7))

  while(loop <= endDate){

    var priorWeek = new Date(loop)
    var nextWeek = new Date(loop.setDate(loop.getDate() + 6));

    var taskCollection = await searchForTasks(workspace,project,priorWeek.toISOString(),nextWeek.toISOString()).then((res)=>{
      if(!res) return
      console.log("Tasks Between: " + priorWeek.toISOString().split('T', 1)[0] + " - " + nextWeek.toISOString().split('T', 1)[0]);
      console.log(res.data);
      return res.data;
    })

    if(!taskCollection) return
    for(const t of taskCollection) tasks.push(t.gid);
    iterations++
    loop = new Date(nextWeek.setDate(nextWeek.getDate() + 1));
  }

  var log = "***** FINISHED *****\n"+
  "Total Tasks: " + tasks.length + "\n"+
  "Iterations: " + iterations + "\n"+
  "Execution Time: " + Math.abs(new Date() - exeStartTime) + "ms\n\n" +
  "Search Errors : " + searchErrors.length + " " + searchErrors + "\n" +
  "***** FINISHED *****"

  console.log(log)
  system.save(tasks,"tasks.json");
  return tasks;
}

async function searchForTasks(_workspace,_project,afterDate,beforeDate){
  const params = {
    "projects.all": _project,
    "opt_pretty": true,
    "created_at.after": afterDate,
    "created_at.before" : beforeDate,
    "limit": 100
  }

  return client.tasks.searchTasksForWorkspace(_workspace,params)
    .then((result) => {
      return result;
    }).catch((error)=>{
      const searchError = "Created Between: " + afterDate + " - " + beforeDate +"\n" +
      "Message: " + error.message

      console.error(searchError);
      searchErrors.push(searchError)
      return null;
    });
}