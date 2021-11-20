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
  bill: 142.55,
  rate: 0.15,
  pax: 5,
};

function initApp() {
  document.querySelector("#tip_15").checked = true;
  updateDom();
}

function updateDom() {
  const { bill, rate, pax } = _state;

  // ermove later?
  domBill.value = bill;
  domPax.value = pax;

  if (0 === pax) {
    domPaxError.style.visibility = "visible";
    domPax.classList.add("with-error");

    domTipPerPax.innerText = "--";
    domTotalPerPax.innerText = "--";

    domReset.disabled = true;
    domReset.classList.add("disabled");
  } else {
    updateTotals();
  }
}

function updateTotals() {
  const { bill, rate, pax } = _state;

  const _tip = (bill * rate) / pax;
  const _total = (bill * (1.0 + rate)) / pax;

  domTipPerPax.innerHTML = `$${_tip.toFixed(2)}`;
  domTotalPerPax.innerHTML = `$${_total.toFixed(2)}`;
}

initApp();

domForm.addEventListener("reset", function () {
  domReset.classList.add("disabled");

  _state.bill = 0;
  _state.rate = 0;
  _state.pax = 1;

  updateTotals();
});

domForm.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log("captured return key");
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
  console.log(e.target.id);
  switch (e.target.id) {
    case "bill": {
      _state.bill = e.target.value;
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
      break;
    }

    case "pax": {
      _state.pax = e.target.value / 1.0;
      break;
    }

    default:
    // nothing
  }

  updateTotals();
});

// leave focus
// read input
// update state
// update dom
