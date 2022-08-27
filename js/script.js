$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    items: 4,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    slideBy: 2,
    slideTransition: 'linear',
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 4,
      },
      992: {
        items: 6,
      },
    },
  });
});

//Add and remove item
const itemQuantity = document.querySelectorAll('.js-quantity-item');
const addItem = document.querySelectorAll('.js-add-item');
const removeItem = document.querySelectorAll('.js-remove-item');

function addRemoveItem(element, index) {
  itemQuantity[index].innerText =
    +element.dataset.value + +itemQuantity[index].innerText;
  if (+itemQuantity[index].innerText == -1) {
    itemQuantity[index].innerText = 0;
  }
}

addItem.forEach((item, indice) => {
  item.addEventListener('click', () => {
    let e = item;
    let i = indice;
    addRemoveItem(e, i);
    atualizaValor();
    calculaTotal();
  });
});

removeItem.forEach((item, indice) => {
  item.addEventListener('click', () => {
    let e = item;
    let i = indice;
    addRemoveItem(e, i);
    atualizaValor();
    calculaTotal();
  });
});

//Valor total da compra
const valorUnitarioDoItem = document.querySelectorAll('.js-item-price');
const valorTotalDoItem = document.querySelectorAll('.js-total');

function atualizaValor() {
  valorUnitarioDoItem.forEach((item, index) => {
    valorTotalDoItem.forEach((elemento) => {
      valorTotalDoItem[index].innerText = `$${
        +item.innerText.replace('$', '') * +itemQuantity[index].innerText
      }`;
    });
  });
}
atualizaValor();

//Valor no carrinho
const subtotal = document.querySelector('.js-subtotal');
const frete = document.querySelector('.js-shipping');
const total = document.querySelector('.js-cart-total');

function calculaTotal() {
  let arrayTotalItem = [];
  valorTotalDoItem.forEach((item, index) => {
    arrayTotalItem.push(+item.innerText.replace('$', ''));
  });
  if (valorTotalDoItem.length > 0) {
    subtotal.innerText = `$${arrayTotalItem.reduce(
      (acc, valor) => acc + valor,
    )}`;

    total.innerText = `$${
      +subtotal.innerText.replace('$', '') + +frete.innerText.replace('$', '')
    }`;
  }
}
calculaTotal();

//Excluir item do carrinho
const deleteButton = document.querySelectorAll('.js-item-table-remove');
const itemCarrinho = document.querySelectorAll('.js-item-table');
let contador = 0;

deleteButton.forEach((item, index) => {
  item.addEventListener('click', () => {
    itemCarrinho[index].remove();
    valorTotalDoItem[index].innerText = `$0`;
    contador++;
    if (itemCarrinho.length == contador) {
      frete.innerText = `$0`;
    }
    calculaTotal();
  });
});

//Suggestion Carousel
$('.suggestion-carousel, .related-carousel').owlCarousel({
  autoplay: true,
  smartSpeed: 1000,
  margin: 45,
  dots: false,
  loop: true,
  nav: true,
  navText: [
    '<i class="bi bi-arrow-left"></i>',
    '<i class="bi bi-arrow-right"></i>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
  },
});
