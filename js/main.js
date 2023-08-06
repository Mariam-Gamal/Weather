
async function search(city){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ebdbcb8369dd4738b46190437230508&q=${city}&days=3`);
    if (res.ok && 400 != res.status){
        let final = await res.json();
        console.log(res , final);
        displayCurrent(final.location , final.current),
        displayForecast(final.forecast.forecastday)
    }
}

document.getElementById("search").addEventListener("keyup", final=>{
    search(final.target.value)
}
);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(final, res) {
    if (null != res) {
        var d = new Date(res.last_updated.replace(" ", " "));
        let box = ` <div class="col-lg-4 today forecast">
        <div class="forecast-header d-flex justify-content-between" id="today">
        <div class="day">${days[d.getDay()]}</div>
        <div class=" date">${d.getDate() + months[d.getMonth()]}</div>
        </div> 
        <div class="forecast-content" id="current">
        <div class="location fs-5">${final.name}</div>
        <div class="degree">
            <div class="num">${res.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
                <img src="https:${res.condition.icon}" alt="" width="90">
            </div>	
        </div>
        <div class="custom">${res.condition.text}</div>
        <span><img src="images/icon-umberella.png" alt="">20%</span>
        <span><img src="images/icon-wind.png" alt="">18km/h</span>
        <span><img src="images/icon-compass.png" alt="">East</span>
        </div>
    </div>`
        document.getElementById("forecast").innerHTML = box
    }
}
function displayForecast(final){
    let cartona = "";
    for (let d = 1; d < final.length; d++)
    cartona +=
     `<div class="col-lg-4 forecast text-center">
        <div class="forecast-header">
            <div class="day">${days[new Date(final[d].date.replace(" ", " ")).getDay()]}</div>
        </div> 
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="https:${final[d].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${final[d].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${final[d].day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${final[d].day.condition.text}</div>
        </div>
    </div>`
    document.getElementById("forecast").innerHTML += cartona
}



search('cairo');