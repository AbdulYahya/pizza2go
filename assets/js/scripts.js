'use strict';
// Global Variables
var toppings = [];

// Business Logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.basePrice = 7.95;
}

Pizza.prototype.Cost = function() {
  if (this.size == 'medium')
    this.basePrice += 2;
  else if (this.size == 'large')
    this.basePrice += 5;
  else
    this.basePrice;

  for (var i = 0; i < this.toppings.length; i++) {
    if (this.toppings[i])
      this.basePrice += 0.75;
  }
}

// User Interface Logic
function grabToppings() {
  $('input:checkbox[name=topping]').change(function(event) {
    var eventTarget = $(event.target);
    var checkboxInput = eventTarget.find('input');
    var checkboxValue = eventTarget.attr('value');
    var index;

    if ((index = toppings.indexOf(checkboxValue)) > -1) {
      toppings.splice(index, 1);
      setTimeout(function() { checkboxInput.prop('checked', false) }, 0);
    } else {
      toppings.push(checkboxValue);
      setTimeout(function() { checkboxInput.prop('checked', true) }, 0);
    }

    if (checkboxValue == 'olives') {
      $('#orderConfirmation').append('<li class="list-group-item">' + checkboxValue + '</li>');
    }
    // console.log(toppings);
  });
  return toppings;
}

function pizzaBuilder() {
  var pizzaBuilder = document.getElementById('pizzaBuilder');

  pizzaBuilder.addEventListener('submit', function(event) {
    var size = $('#pizzaSize').val();
    var newPizza = new Pizza(size, toppings);
    newPizza.Cost()
    console.log(size);
    console.log(newPizza.basePrice.toFixed(2));

    event.preventDefault();
    event.stopPropagation();
  }, grabToppings());
}

$(function () {
  if ($('body').is('.no-js')){
    console.log("The class '.no-js' is present on this page. Do not run JS on this Page!");
  } else {
    pizzaBuilder();
    console.log("The class '.no-js' is NOT present on this page. Run JS on this Page!");
  }
})
