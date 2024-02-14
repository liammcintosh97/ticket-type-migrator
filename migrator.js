function migrateVenueData(venueString){
  var brandString = venueString.split(" ")[0]
  var locationString = venueString.split(" ")[1]

  var brandEnum = getBrandEnumValue(brandString)
  var locationEnum = getLocationEnumValue(locationString)

  if(brandEnum === null || locationEnum === null) return null;

  return {
    1201530131464455: brandEnum, //Brand
    1201530248269210: locationEnum //Location
  }
}

function getBrandEnumValue(brandString){
  switch(brandString){
    case "TSG":
      return "1201530131464456"
    case "TGIF":
      return "1201530131464457"
    default:
      return null
  }
}

function getLocationEnumValue(venueString){
  switch(venueString){
    case "Ballarat":
      return "1201530248269218"
    case "Belmont":
      return "1201530248270368"
    case "Carousel":
      return "1201530248270385"
    case "Chadstone":
      return "1201530161413184"
    case "Chirnside Park":
      return "1201530248270409"
    case "Chermside":
      return "1201530248270422"
    case "Doncaster":
      return "1201530248270501"
    case "Eastland":
      return "1201530248270521"
    case "Epping":
      return "1201530248270533"
    case "Fountain Gate":
      return "1201530248270547"
    case "Geelong":
      return "1201530248270650"
    case "Greenhills":
      return "1201530248271694"
    case "Joondalup":
      return "1201530248271710"
    case "King Street Wharf":
      return "1201530248271867"
    case "Knox":
      return "1201530248271881"
    case "Macquarie":
      return "1201530248271902"
    case "Mandurah":
      return "1201530248272946"
    case "Marion":
      return "1201530248272961"
    case "Melbourne Central":
      return "1201530248272976"
    case "Mordialloc":
      return "1201530248272992"
    case "Mt Druitt":
      return "1201530248273006"
    case "Plenty Valley":
      return "1201530248273015"
    case "Richmond":
      return "1201530248273100"
    case "Robina":
      return "1201530248273114"
    case "Rockingham":
      return "1201530248273123"
    case "Southland":
      return "1201530248275129"
    case "Tea Tree Plaza":
      return "1201530248275142"
    case "Tuggerah":
      return "1201530248275153"
    case "Watergardens":
      return "1201530248276195"
    case "Werribee":
      return "1201530248276206"
    case "Whitford":
      return "1201530248276296"
    default:
      return null
  }
}

module.exports = {
  migrateVenueData
}