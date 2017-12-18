'use strict';
// Global Variables
// var toppings = [];
var checkedToppings = $('input:checkbox[name=topping]');

// ********** Business Logic **********

// Objects & Prototypes
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.baseCost = 7.95;
  this.baseToppingCost = 0.75;
}

Pizza.prototype.Cost = function() {
  if (this.size == 'medium')
    this.baseCost += 2.00;
  else if (this.size == 'large')
    this.baseCost += 5.00;
  else
    this.baseCost;

  for (var i = 0; i < this.toppings.length; i++) {
    if (this.toppings[i])
      this.baseCost += this.baseToppingCost;
  }
}

// Normal Functions
function Capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formReset(form) {
  form.reset();
}

function orderConfirmation() {
  $('.line-up').html('<div class="card">' +
                       '<h4 class="card-header">Order Confirmation</h4>' +
                       '<div class="card-body">' +
                         '<div class="card-text" id="orderConfirm">' +
                           '<ul class="list-group" id="orderConfirmation"></ul>' +
                         '</div>' +
                        '</div>' +
                        '<div class="card-footer text-muted">' +
                          'Total:  <span class="badge-pill badge-info float-right" id="orderTotal"></span>' +
                        '</div>' +
                      '</div>');
}

function grabToppings(toppings) {
  $('input:checkbox[name=topping]:checked').each(function() {
    toppings.push($(this).val());
  });
}
// User Interface Logic
function pizzaBuilder() {
  var pizzaBuilder = document.getElementById('pizzaBuilder');

  pizzaBuilder.addEventListener('submit', function(event) {
    // Declare preventDefault & stopPropagation first thing
    // To prevent odd bugs while testing/refactoring
    event.preventDefault();
    event.stopPropagation();

    var size = $('#pizzaSize').val();
    var toppings = [];

    // Get toppings
    grabToppings(toppings);
    // Create order confirmation card
    orderConfirmation();
    // Instantiating a new Pizza object and storing it into the Var newPizza
    var newPizza = new Pizza(size, toppings);
    // Append pizza size into order confirmation card
    $('#orderConfirmation').append('<p class="card-header no-border-header font-weight-light">Base Pizza</p><li class="list-group-item">' + Capitalize(size) + '<span class="badge-pill badge-light float-right">$' + newPizza.baseCost + '</li><p class="card-header no-border-header font-weight-light">Toppings</p>');
    // Append Toppings into order confirmation card
    $('input:checkbox[name=topping]:checked').each(function() {
      $('#orderConfirmation').append('<li class="list-group-item">' + Capitalize($(this).val())  + ' <span class="badge-pill badge-light float-right">$ ' + newPizza.baseToppingCost + '</span></li>');
    });
    // Call the cost prototype on our newPizza instance
    // to get the total cost of the uses customized pizza
    newPizza.Cost();
    // Append the total cost into order confirmation card
    $('#orderTotal').html('$ ' + newPizza.baseCost.toFixed(2));
    // for (var i = 0; i < toppings.length; i++) {
    // }
    // $('#orderConfirmation').append('<li class="list-group-item">' +   + ' <span class="badge-pill badge-info float-right">$ ' + newPizza.baseToppingCost + '</span></li>');

    // $( ":checkbox" ).map(function() { return this.id; }) .get()
    //   .join();
    // console.log(newPizza);

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
