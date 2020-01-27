var close_ok = document.querySelector(".modal__ok-button");
var close_error = document.querySelector(".modal__error-button");

var modal__ok = document.querySelector(".modal__ok");
var modal__error = document.querySelector(".modal__error");

var validity_form = document.querySelector("form");
var page_form = document.querySelector(".contest");
var login = page_form.querySelector("[name=name]");
var mail = page_form.querySelector("[name=mail]");


close_ok.addEventListener("click", function(evt){
  evt.preventDefault();
  modal__ok.classList.add("visually-hidden");
});

close_error.addEventListener("click", function(evt){
  evt.preventDefault();
  modal__error.classList.add("visually-hidden");
});


validity_form.addEventListener("submit", function(evt){
  if (!login.value || !mail.value){
  evt.preventDefault();
  modal__error.classList.remove("visually-hidden");

  } else {
    modal__ok.classList.remove("visually-hidden");
  }
});
