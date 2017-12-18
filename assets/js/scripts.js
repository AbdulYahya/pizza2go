'use strict';
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.baseCost = 7.95;
  this.baseToppingCost = 0.75;
}
Pizza.prototype.Cost = function() {
  if (this.size === 'medium') {
    this.baseCost += 2.00;
  } else if (this.size === 'large') {
    this.baseCost += 5.00;
  } else {
    this.baseCost;
  }

  for (var index = 0; index < this.toppings.length; index += 1) {
    if (this.toppings[index]) {
      this.baseCost += this.baseToppingCost;
    }
  }
}
function Capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); }
function formReset(form) { form.reset(); }
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
function pizzaBuilder() {
  var pizzaBuilder = document.getElementById('pizzaBuilder');
  pizzaBuilder.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var size = $('#pizzaSize').val();
    var toppings = [];
    grabToppings(toppings);
    orderConfirmation();
    var newPizza = new Pizza(size, toppings);
    $('#orderConfirmation').append('<p class="card-header no-border-header font-weight-light">Base Pizza</p>' +
                                   '<li class="list-group-item">' + Capitalize(size) +
                                   '<span class="badge-pill badge-light float-right">$' + newPizza.baseCost +
                                   '</li><p class="card-header no-border-header font-weight-light">Toppings</p>');
    $('input:checkbox[name=topping]:checked').each(function() {
      $('#orderConfirmation').append('<li class="list-group-item">' +
                                      Capitalize($(this).val())  +
                                      ' <span class="badge-pill badge-light float-right">$ ' +
                                      newPizza.baseToppingCost + '</span></li>');
    });
    newPizza.Cost();
    $('#orderTotal').html('$ ' + newPizza.baseCost.toFixed(2));
    formReset(pizzaBuilder);
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
