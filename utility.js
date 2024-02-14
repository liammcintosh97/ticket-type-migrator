function formatDate(date_ob){

  //Format Day
  let day = date_ob.getDate();
  if(day < 10) day = "0" + day.toString()

  //Format Month
  let month = date_ob.getMonth() + 1;
  if(month < 10) month = "0" + month.toString()

  let year = date_ob.getFullYear();

  return year + "-" + month + "-" + day;
}

function getCustomFieldValue(task,fieldGid){
  for(var field of task.custom_fields){
    if(field.gid === fieldGid){
      if(field.type === "text") return field.text_value;
      else if(field.type === "enum"){
        if(!field.enum_value) return null
        return field.enum_value.name
      }
      else return null
    }
  }
}

module.exports = {
  formatDate,
  getCustomFieldValue
}