const amountInput = document.querySelector(".amount");
const selectCurrency = document.querySelector(".slct");
const counterBtn = document.querySelector(".counter");
const resultWindow = document.querySelector(".result");
const loaderIcon = document.querySelector(".loader");

loaderIcon.style.display = "none";

const calculateResult = () => {
  if (amountInput.value == "") {
    alert("Uzupełnij kwotę");
    return;
  } else if (amountInput.value <= 0) {
    alert("Wpisano złą wartość");
    return;
  }
  loaderIcon.style.display = "block";
  axios
    .get(
      `https://api.nbp.pl/api/exchangerates/rates/a/${selectCurrency.value}/?format=json`
    )
    .then((response) => {
      resultWindow.innerText = `TO  ${
        Math.round(response.data.rates[0].mid * amountInput.value * 100) / 100
      }  PLN`;
    })
    .finally(() => (loaderIcon.style.display = "none"));
};

counterBtn.addEventListener("click", calculateResult);
