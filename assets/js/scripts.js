'use strict';

$(function () {
  if ($('body').is('.no-js')){
    console.log("The class '.no-js' is present on this page. Do not run JS on this Page!");
  } else {
    console.log("The class '.no-js' is NOT present on this page. Run JS on this Page!");
  }
})
