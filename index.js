'use strict';

// Parent Elements

const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

const script = document.createElement("script");
script.src = "./script.js";
document.body.append(script);

const nav = document.createElement('nav');
nav.classList.add('nav-bar');
container.append(nav);

const main = document.createElement("main");
container.append(main);

const footer = document.createElement("footer");
container.append(footer);

// Components

const addElement = (type, text, parent) => {
  const element = document.createElement(type);
  element.textContent = text;
  parent.appendChild(element);
};

const addImg = (icon, parent) => {
  const img = document.createElement("img");
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  parent.appendChild(img);
};

const cityCard = (args, icon) => {
  const div = document.createElement('div');
  div.className = 'city-card';
  const text = document.createElement('div');
  args.forEach(arg => addElement('p', arg, text));
  div.appendChild(text);
  addImg(icon, div);
  main.appendChild(div)
};

function addTRH(parent) {
  const items = ['Day', 'Temperature', 'Sunrise', 'Sunset', 'Description', ''];
  const tr = document.createElement("tr");
  items.forEach(item => {addElement('th', item, tr)})
  parent.appendChild(tr);
}

function addTRD(ar, icon, parent) {
  const tr = document.createElement("tr");
  ar.forEach(item => addElement('td', item, tr));
  addImg(icon, tr)
  parent.appendChild(tr);
}

// Main

addElement('h1', 'Weather Report', nav)

const city = document.createElement('input');
city.placeholder = 'Your City Weather';
nav.append(city)

addElement('p', "© 2021 Pollaroid All rights reserved", footer);