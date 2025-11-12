if (localStorage.getItem("setupCompleted") == (false || null)) {
  // nur beim ersten laden ausführen
  localStorage.setItem("cakes", 0);
  localStorage.setItem("cakesPerClick", 1);
  localStorage.setItem("cakesPerSecound", 0);
  localStorage.setItem(
    "prices",
    [
      15, 100, 500, 2000, 5000, 15000, 50000, 120000, 500000, 1000000, 3500000,
      10000000, 25000000, 75000000, 200000000, 500000000, 1500000000,
      3000000000, 10000000000, 50000000000
    ]
  );

  localStorage.setItem("setupCompleted", true);
}

const cake = document.getElementById("cake");
const counter = document.getElementById("counter");
counter.innerHTML = numberStringGeneration(localStorage.getItem("cakes"));

let prices = localStorage.getItem("prices").split(",");
const itemCakesPerSecound = [
  0.1, 1, 5, 15, 50, 125, 400, 1000, 2500, 6000, 15000, 40000, 100000, 250000,
  750000, 1500000, 5000000, 10000000, 25000000, 100000000
];

loadPrices();

// pro klick auf kuchen
cake.addEventListener("click", function () {
  let cakes = Number(localStorage.getItem("cakes"));
  let cakesPerClick = Number(localStorage.getItem("cakesPerClick"));

  // cakes addieren
  cakes = cakes + cakesPerClick;
  // in HTML anzeigen und in cookies speichern
  counter.innerHTML = numberStringGeneration(cakes);
  localStorage.setItem("cakes", cakes);
});

// pro sekunde
setInterval(() => {
  let cakes = Number(localStorage.getItem("cakes"));
  let cakesPerSecound = Number(localStorage.getItem("cakesPerSecound"));

  // cakes addieren
  cakes = cakes + cakesPerSecound;
  // auf eine Nachkommastelle kürzen, wegen JS shit
  cakes = Math.round(cakes * 10) / 10;
  // in HTML anzeigen und in cookies speichern
  counter.innerHTML = numberStringGeneration(cakes);
  localStorage.setItem("cakes", cakes);
}, 1000);

// kauf button func
function buyItem(itemIndex) {
  let cakes = Number(localStorage.getItem("cakes"));
  let cakesPerSecoundTotal = Number(localStorage.getItem("cakesPerSecound"));
  let prices = localStorage.getItem("prices").split(",");
  let price = prices[itemIndex];

  if (cakes >= price) {
    // change cakes and CakesPerSecound
    cakes -= price;
    //kuchenzahl runden, weil JS shit
    cakes = Math.round(cakes * 10) / 10;

    cakesPerSecoundTotal += itemCakesPerSecound[itemIndex];
    cakesPerSecoundTotal = Math.round(cakesPerSecoundTotal * 10) / 10; // runden, wegen JS shit

    //change Item price
    prices[itemIndex] = parseInt(Number(prices[itemIndex]) * 1.25);

    localStorage.setItem("prices", prices);
    localStorage.setItem("cakesPerSecound", cakesPerSecoundTotal);
    localStorage.setItem("cakes", cakes);
    counter.innerHTML = numberStringGeneration(cakes);
  }
  loadPrices();
}

function loadPrices() {
  prices = localStorage.getItem("prices").split(",");

  for (let i = 0; i < 20; i++) {
    //get el and array wert
    let button = document.getElementById("buyButton" + i);
    let itemPrice = numberStringGeneration(prices[i]);

    button.innerHTML = itemPrice + " Cakes";
  }
}

function numberStringGeneration(number) {
  let length = parseInt(number).toString().length;

  //nachkommastellen ab 100 entfernen
  if (length >= 3) {
    number = parseInt(number);
    length = number.toString().length;
  }

  if (length >= 13) {
    return parseInt(number / 1000000000) / 1000 + "t";
  }
  if (length >= 10) {
    return parseInt(number / 1000000) / 1000 + "b";
  }
  if (length >= 7) {
    return parseInt(number / 1000) / 1000 + "m";
  }
  if (length >= 4) {
    return parseInt(number) / 1000 + "k";
  }
  return Number(number);
}
