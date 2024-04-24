function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}
const container = element("div", "container", "", "");
const h1 = element(
  "h1",
  "text-center",
  "title",
  "RESTCOUNTRIES AND WEATHER DETAILS USING FETCH API"
);
const row = element("div", "row", "", "");

const response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
        <div class="card h-100" >
        <div class="card-header">
        <h5 class="card-title text-center">${result[i].name.common}</h5>
        </div>
        <div class="img-box">
        <img src="${result[i].flags.png}" class="card-img-top" alt="countries-flag-image"/>
        </div>
        <div class="card-body">
         <div class="card-text text-center">Region:${result[i].region}</div>
         <div class="card-text text-center">Capital:${result[i].capital}</div>
        <div class="card-text text-center">Country codes:${result[i].cca3}</div>
        <button class="btn btn-primary">Click for Weather</button>
        </div>
        </div>
        `;
      row.append(col);
    }
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = result[index].latlng;
        let lat = latlng[0];
        let lon = latlng[1];
        //console.log(lat)
        //console.log(lon)
        let Weatherapi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=158f564f5849512e9a7b0d4b49963d2c`
        );
        Weatherapi.then((ele) => ele.json()).then((ele1) => {
          // console.log(ele1)
          alert(
            `weather of ${result[index].name.common} are ${ele1.main.temp}🌡C , ${ele1.weather[0].main}☁ and ${ele1.weather[0].description}🌧`
          );
        });
      });
    });
  });
container.append(row);
document.body.append(h1, container);
