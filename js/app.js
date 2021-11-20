const domBill = document.getElementById("bill");
const domTipCustom = document.getElementById("tip_custom");
const domPax = document.getElementById("pax");
const domReset = document.getElementById("btnReset");
const domTipPerPax = document.getElementById("tip_per_pax");
const domTotalPerPax = document.getElementById("total_per_pax");
const domPaxError = document.getElementById("pax-error");
const domForm = document.getElementById("app_form");
const domTipButtons = document.querySelectorAll(
  '.tips-grid input[type="radio"]'
);

const _state = {
  bill: 0,
  rate: 0.0,
  pax: 1,
};

function initApp() {
  domBill.value = bill;
  domPax.value = pax;

  updateTotals(true);
}

function updateTotals(isReset = false) {
  const { bill, rate, pax } = _state;

  if (0 === pax) {
    domPaxError.style.visibility = "visible";
    domPax.classList.add("with-error");
    domPax.select();

    domTipPerPax.innerText = "--";
    domTotalPerPax.innerText = "--";

    domReset.disabled = true;
    domReset.classList.add("disabled");

    return;
  }

  domPaxError.style.visibility = "hidden";
  domPax.classList.remove("with-error");

  const _tip = (bill * rate) / pax;
  const _total = (bill * (1.0 + rate)) / pax;

  domTipPerPax.innerHTML = `$${_tip.toFixed(2)}`;
  domTipPerPax.dataset.tooltip = `$${_tip.toFixed(2)}`;

  domTotalPerPax.innerHTML = `$${_total.toFixed(2)}`;
  domTotalPerPax.dataset.tooltip = `$${_total.toFixed(2)}`;

  if (isReset) {
    domReset.disabled = true;
    domReset.classList.add("disabled");
  } else {
    domReset.disabled = false;
    domReset.classList.remove("disabled");
  }
}

initApp();

domForm.addEventListener("reset", function () {
  _state.bill = 0;
  _state.rate = 0;
  _state.pax = 1;

  updateTotals(true);
});

domForm.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.target.blur();
  }
});

domForm.addEventListener("click", function (e) {
  if (e.target.type === "number") {
    e.target.select();
  }

  if (e.target.type === "radio") {
    domTipCustom.value = null;
    domTipCustom.classList.remove("in-use");

    _state.rate = e.target.dataset.rate / 100;
    updateTotals();
  }
});

domForm.addEventListener("focusout", function (e) {
  switch (e.target.id) {
    case "bill": {
      _state.bill = e.target.value;
      updateTotals();

      break;
    }

    case "tip_custom": {
      if (e.target.value) {
        domTipButtons.forEach((radio) => {
          radio.checked = false;
        });
        domTipCustom.classList.add("in-use");

        _state.rate = e.target.value / 100;
      }
      updateTotals();

      break;
    }

    case "pax": {
      if (e.target.value) {
        _state.pax = e.target.value / 1.0;
      } else {
        _state.pax = 1;
      }
      updateTotals();

      break;
    }

    default:
      domReset.disabled = true;
      domReset.classList.add("disabled");
  }
});
