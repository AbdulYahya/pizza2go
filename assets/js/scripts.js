'use strict';
// Global Variables
var toppings = [];

// Business Logic

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
  });
}

function pizzaBuilder() {
  var pizzaBuilder = document.getElementById('pizzaBuilder');

  pizzaBuilder.addEventListener('submit', function(event) {
    var size = $('#pizzaSize').val();
    console.log(size);

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
