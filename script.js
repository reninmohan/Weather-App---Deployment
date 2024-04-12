
const searchbtn = document.getElementById("searchbtn");
const weatherIcon = document.getElementById("weatherIcon");
const cityTxt = document.getElementById("cityTxt");
const tempTxt = document.getElementById("tempTxt");
const humidityTxt = document.getElementById("humidityTxt");
const windTxt = document.getElementById("windTxt");
const weatherInfo = document.getElementById("weatherInfo");
const additionalInfo = document.getElementById("additionalInfo");
const errorTxt = document.getElementById("errorTxt"); 
const cityname = document.getElementById("cityname");
const weatherIconArray = [
 {name:"haze", src:"./assets/weather_icon/haze.png"},
 {name:"rain", src:"./assets/weather_icon/rain.png"}, 
 {name:"clouds", src:"./assets/weather_icon/cloudy.png"},
 {name:"mist", src:"./assets/weather_icon/mist.png"}
];

//Event Listener for search button
searchbtn.addEventListener('click',()=>{
  let citynameValue = cityname.value;
  getWeatherInfo(citynameValue);
  });

cityname.addEventListener('keypress', ()=>{
  if(event.key==="Enter"|| event.keyCode ==="13"){
    let citynameValue = cityname.value;
     getWeatherInfo(citynameValue);
  }
})
async function getWeatherInfo(cityname){
  let postData ={
    cityname:cityname
  }
  try{
    let option = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(postData)
    }
    let response  = await fetch(`http://localhost:3000/api/weather`, option);
    let data =await response.json() 
    
    //Display weather info and hide error Message   
    weatherInfo.style.display = "flex";
    additionalInfo.style.display = "flex";
    errorTxt.style.display= "none";

    //Update weather info
    cityTxt.innerText = data.name;
    tempTxt.innerText = Math.round(data.main.temp)+" °C";
    humidityTxt.innerText = data.main.humidity + "%";
    windTxt.innerText = Math.floor(data.wind.speed * 18/5) +" Km/hr";

    //Set weather Icon
    let weatherCondition = data.weather[0].main.toLowerCase();
    let iconUrl = getIconUrl(weatherCondition);
    weatherIcon.src = iconUrl;            

  }catch(error){
    //Hide weather info  and show error message
    weatherInfo.style.display = "none";
    additionalInfo.style.display = "none";
    errorTxt.style.display= "block";
    console.log("Error Occured.",error);
    
  }

}

function getIconUrl(weatherCondition){
  let srcUrl = "./assets/weather_icon/default.png"

  weatherIconArray.forEach(element=>{
    if(element.name == weatherCondition){
      srcUrl =  element.src;
    }
  })
  return srcUrl;
}




