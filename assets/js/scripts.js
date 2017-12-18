'use strict';
// Global Variables
// var toppings = [];

// Business Logic
function Capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function formReset(form) {
  form.reset();
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.baseCost = 7.95;
  this.baseToppingCost = 0.75;
}

Pizza.prototype.Cost = function() {
  if (this.size == 'medium')
    this.baseCost += 2;
  else if (this.size == 'large')
    this.baseCost += 5;
  else
    this.baseCost;

  for (var i = 0; i < this.toppings.length; i++) {
    if (this.toppings[i])
      this.baseCost += this.baseToppingCost;
  }
}

// User Interface Logic
function pizzaBuilder() {
  var pizzaBuilder = document.getElementById('pizzaBuilder');

  pizzaBuilder.addEventListener('submit', function(event) {
    var size = $('#pizzaSize').val();
    var toppings = [];
    var newPizza = new Pizza(size, toppings);

  // $('input:checkbox[name=topping]:checked').parent().find('span.text-muted').text() *** Checkbox Text value ***
    // If toppings are checked push to toppings array
    // Do not need global toppings array using this method
    $('input:checkbox[name=topping]:checked').each(function() {
      toppings.push($(this).val());
       $('#orderConfirmation').append('<li class="list-group-item">' + Capitalize($(this).val())  + ' <span class="badge-pill badge-info float-right">$ ' + newPizza.baseToppingCost + '</span></li>');
    });

    // newPizza.Cost()
    // toppings = [];

    formReset(pizzaBuilder);
    event.preventDefault();
    event.stopPropagation();
  });
}

$(function () {
  if ($('body').is('.no-js')){
    console.log("The class '.no-js' is present on this page. Do not run JS on this Page!");
  } else {
    pizzaBuilder();
    console.log("The class '.no-js' is NOT present on this page. Run JS on this Page!");
  }
})
