// const COUNTELEMENT = 12;
const ARRAYELEMENT = [
  { id: 0, name: 'broccoli', url: './img/broccoli.png', choose: false },
  { id: 1, name: 'salad', url: './img/salad.png', choose: false },
  { id: 2, name: 'cheese', url: './img/cheese.png', choose: false },
  { id: 3, name: 'egg', url: './img/egg.png', choose: false },
  { id: 4, name: 'glass', url: './img/glass.png', choose: false },
  { id: 5, name: 'pizza', url: './img/pizza.png', choose: false },
  { id: 6, name: 'tomato', url: './img/tomato.png', choose: false },
  { id: 7, name: 'watermelon', url: './img/watermelon.png', choose: false },
  { id: 8, name: 'water', url: './img/water.png', choose: false },
];
// clone array
const clone = array => {
  // copy array without link on real array
  const cloneArray = array.map(item => Object.assign({}, item));

  for (let i = 0, j = array.length; i < array.length; i += 1, j += 1) {
    array[i].id = j;
    cloneArray.push(array[i]);
  }
  return cloneArray;
};
// shuffle items for array
const shuffle = array => {
  for (
    let j, x, i = array.length;
    i;
    j = parseInt(Math.random() * i),
      x = array[(i -= 1)],
      array[i] = array[j],
      array[j] = x
  );
  return array;
};
const create = item => {
  const container = document.createElement('div');
  container.classList.add('flip-container');
  container.setAttribute('id-data', `${item.id}`);

  container.innerHTML = `
  <div class='flipper'>
      <div class='front'></div>
      <div class='back'>
        <img src='${item.url}' width='129px' height='129px'>
      </div> 
    </div>`;
  return container;
};
const render = array => {
  const cardsContainer = document
    .querySelector('.cards-container')
    .cloneNode(true);

  array.forEach(element => {
    cardsContainer.appendChild(create(element));
  });
  return cardsContainer;
};
const updateState = (array, elem) => {
  array.forEach(item => {
    if (item.id === Number(elem)) {
      item.choose = true;
    }
    return item;
  });
};
const countClick = number => {
  number += 1;
  return number;
};
const compareElement = arrayObjects => {
  const arrayIndex = [];
  const allFlipper = document.querySelectorAll('.flipper');
  const divFront = document.querySelectorAll('.flip-container');

  arrayObjects.forEach((item, index) => {
    if (item.choose === true) {
      arrayIndex.push(index);
    }
  });
  if (arrayObjects[arrayIndex[0]].name === arrayObjects[arrayIndex[1]].name) {
    divFront[arrayIndex[0]].classList.add('hidden');
    divFront[arrayIndex[1]].classList.add('hidden');
  } else {
    allFlipper[arrayIndex[0]].classList.remove('flipper-focus');
    allFlipper[arrayIndex[1]].classList.remove('flipper-focus');
  }
  arrayObjects[arrayIndex[0]].choose = false;
  arrayObjects[arrayIndex[1]].choose = false;
  arrayIndex.length = 0;
  return 0;
};
const wrapper = array => {
  const container = document.querySelector('.cards-container');

  let count = 0; // ???
  container.addEventListener('click', event => {
    if (event.target.className === 'cards-container') {
      return true;
    }
    const element = event.target.closest('.flipper');
    count = countClick(count);
    if (element.classList.contains('flipper-focus')) {
      // click on same element
      count = 1;
    }
    if (count > 2) {
      // disable ckick after two open tabs
      count -= 1;
      return true;
    }
    element.classList.add('flipper-focus');
    const parent = element.parentNode;
    const numberId = parent.getAttribute('id-data');
    updateState(array, numberId);
    if (count === 2) {
      setTimeout(() => {
        count = compareElement(array);
      }, 900);
    }
    return true;
  });
};
const cloneArray = clone(ARRAYELEMENT);
shuffle(cloneArray);
const body = document.querySelector('body');
body.replaceChild(
  render(cloneArray),
  document.querySelector('.cards-container'),
);
wrapper(cloneArray);
