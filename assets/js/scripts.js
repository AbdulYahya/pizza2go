'use strict';
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.baseCost = 7.95;
  this.baseToppingCost = 0.75;
}
Pizza.prototype.SizeCost = function() {
  if (this.size === 'medium') {
    this.baseCost += 2.00;
  } else if (this.size === 'large') {
    this.baseCost += 5.00;
  } else {
    this.baseCost;
  }
}
Pizza.prototype.ToppingsCost = function () {
  for (var index = 0; index < this.toppings.length; index += 1) {
    if (this.toppings[index]) {
      this.baseCost += this.baseToppingCost;
    }
  }
}
function Capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); }
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
function formReset(form) { form.reset(); }
function pizzaFormBuilder(form) {
  $(form).html('<div class="row">' +
                  '<div class="col-md-12">' +
                    '<div class="card-body">' +
                      '<h4 class="text-left pb-3">Your Name</h4>' +
                      '<input type="text" class="form-control" id="fName" placeholder="Samewise Gamgee" required>' +
                      '<div class="invalid-feedback">' +
                        'Please provide us with your name' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-md-12">' +
                    '<div class="card-body">' +
                      '<h4 class="text-left pb-3">Pick a Size</h4>' +
                        '<select id="pizzaSize" class="form-control" required>' +
                          '<option selected value="">Choose...</option>' +
                          '<option value="small">Small</option>' +
                          '<option value="medium">Medium</option>' +
                          '<option value="large">Large</option>' +
                        '</select>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-md-12">' +
                    '<div class="card-body">' +
                      '<h4 class="text-left pb-3">Pick Your Toppings</h4>' +
                      '<div class="row" id="top">' +
                        '<div class="col-md-3 mb-3">' +
                          '<label class="custom-control custom-checkbox">' +
                            '<input type="checkbox" class="custom-control-input" name="topping" value="olives" id="olives">' +
                            '<span class="custom-control-indicator"></span>' +
                            '<span class="text-muted">Olives</span>' +
                          '</label>' +
                        '</div>' +
                        '<div class="col-md-3 mb-3">' +
                          '<label class="custom-control custom-checkbox">' +
                            '<input type="checkbox" class="custom-control-input" name="topping" value="peppers">' +
                            '<span class="custom-control-indicator"></span>' +
                            '<span class="text-muted">Peppers</span>' +
                          '</label>' +
                        '</div>' +
                        '<div class="col-md-3 mb-3">' +
                          '<label class="custom-control custom-checkbox">' +
                            '<input type="checkbox" class="custom-control-input" name="topping" value="anchovies">' +
                            '<span class="custom-control-indicator"></span>' +
                            '<span class="text-muted">Anchovies</span>' +
                          '</label>' +
                        '</div>' +
                        '<div class="col-md-3 mb-3">' +
                          '<label class="custom-control custom-checkbox">' +
                            '<input type="checkbox" class="custom-control-input" name="topping" value="onions">' +
                            '<span class="custom-control-indicator"></span>' +
                            '<span class="text-muted">Onions</span>' +
                          '</label>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<button type="submit" class="btn btn-primary">Build</button>');
}

function pizzaBuilder() {
  var pizzaBuilder = document.getElementById('madeToOrderPizza');
  pizzaBuilder.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    var size = $('#pizzaSize').val();
    var toppings = [];
    grabToppings(toppings);
    orderConfirmation();
    var newPizza = new Pizza(size, toppings);
    newPizza.SizeCost();
    $('#orderConfirmation').append('<p class="card-header no-border-header font-weight-light">Base Pizza</p>' +
                                   '<li class="list-group-item">' + Capitalize(size) +
                                     '<span class="badge-pill badge-light float-right">$' + newPizza.baseCost.toFixed(2) +
                                   '</li>');
    newPizza.ToppingsCost();

    if (toppings.length > 0) {
      $('#orderConfirmation').append('<p class="card-header no-border-header font-weight-light">Toppings</p>');
    }
    $('input:checkbox[name=topping]:checked').each(function() {
      $('#orderConfirmation').append('<li class="list-group-item">' + Capitalize($(this).val())  +
                                       '<span class="badge-pill badge-light float-right">$ ' +
                                       newPizza.baseToppingCost + '</span>' +
                                     '</li>');
    });
    $('#orderTotal').html('$ ' + newPizza.baseCost.toFixed(2));
    formReset(pizzaBuilder);
  });
}

$(function () {
  if (!$('body').is('.no-js')){
    pizzaFormBuilder('#madeToOrderPizza');
    pizzaBuilder();
  }
})
