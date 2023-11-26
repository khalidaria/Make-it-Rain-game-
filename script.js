"use strict";

// global variables
const dollarBill = document.querySelector(".dollar-outline");
const totalMoneyOnScreen = document.querySelector(".total-money-on-screen");
let numberOfDigit = document.querySelectorAll(".digit");
const interval = {}; // all interval timer methods

// background blur
const backgroundBlur = document.querySelector(".blur");
backgroundBlur.style.display = "none";

// piggy bank icon
const piggyIcon = document.querySelector(".piggy-bank-upgrade");
const piggyModal = document.querySelector(".piggy-modal");
const totalPiggyMoneyOnScreen = document.querySelector(".piggy-total-money");
const piggyCollect = document.querySelector(".piggy-money-on-screen");
const piggyUpgrade = document.querySelector(".piggy-upgrade-button");
const piggyUpgradeOne = document.querySelector(".piggy-upgrade-0");
const piggyUpgradeTwo = document.querySelector(".piggy-upgrade-1");
const piggyDollarPerHourOnScreen = document.querySelector(".piggy-dollar-hour");
const piggyDollarCapacityOnScreen = document.querySelector(".piggy-capacity");
const currentPiggyUpgrades = document.querySelector(".current-piggy-upgrades");

let totalPiggyMoney = 0;
let totalPiggyMoneyTest = 0;
let dollarPerHour = 50;
let dollarCapacity = 30;
let piggyUpgradeCost = 10;
let piggyUpgradePlusOne = 50;
let piggyUpgradePlusTwo = 30;
const piggyMultiplier = [1.5, 1.5, 1.25]; // upgradePerHour, upgradeCapacity, upgradeCost

// dollar bill icon
const billIcon = document.querySelector(".dollar-upgrade");
const billModal = document.querySelector(".bill-modal");

// rest
const perSecondUpgrade = document.querySelector(".piggy-bank-upgrade");
const reset = document.querySelector(".piggy-bank-upgrade");

let totalMoney = 0;
let currentDollarBill = 1;
let dollarPerSecond = 1;

// dollar bill animation
dollarBill.addEventListener("mousedown", function () {
  dollarBill.style.margin = "5px 55px 0";
});

dollarBill.addEventListener("mouseup", function () {
  dollarBill.style.margin = "0 50px";
});

// append new digit
const newDigit = function () {
  const newDigit = document.createElement("p");
  newDigit.textContent = 0;
  newDigit.classList.add("digit");
  totalMoneyOnScreen.appendChild(newDigit);
};

// dollar calculation
const dollarCalc = function (addDollarAmount) {
  totalMoney += addDollarAmount;
  totalMoney = String(totalMoney); // convert to string for indexing below

  // updating totalMoneyOnScreen
  const updateMoneyOnScreen = (i) => {
    numberOfDigit[i].textContent = totalMoney[i];
  };

  for (let i = 0; i < totalMoney.length; i++) {
    if (totalMoney.length !== numberOfDigit.length) {
      // add extra digits based on the length of the money
      for (let i = 0; i < totalMoney.length - numberOfDigit.length; i++) {
        newDigit();
      }

      // updating the counters
      numberOfDigit = document.querySelectorAll(".digit");
      for (let i = 0; i < totalMoney.length; i++) {
        updateMoneyOnScreen(i);
      }
      break;
    } else {
      updateMoneyOnScreen(i);
    }
  }

  totalMoney = Number(totalMoney); // convert to number for addition above
};

// dollar click
dollarBill.addEventListener("click", function () {
  dollarCalc(currentDollarBill);
});

// dollar per second
interval.dollarPerSecond = () => {
  setInterval(dollarCalc.bind(null, dollarPerSecond), 1000);
};

// FIXME: make code more reusable

// modal popup and close
const openAndCloseModal = (icon, modal) => {
  icon.addEventListener("click", function () {
    if (backgroundBlur.style.display === "none") {
      modal.style.display = "flex";
      backgroundBlur.style.display = "";
    } else {
      modal.style.display = "none";
      backgroundBlur.style.display = "none";
    }
  });

  backgroundBlur.addEventListener("click", function () {
    modal.style.display = "none";
    backgroundBlur.style.display = "none";
  });
};

openAndCloseModal(piggyIcon, piggyModal);
openAndCloseModal(billIcon, billModal);

// shortening dollar amount
const dollarShortening = function (dollarAmount) {
  dollarAmount = BigInt(dollarAmount);
  dollarAmount = String(dollarAmount);
  const dic = dollarAmount.length; // dollar index count (dic)
  let unitSymbol = "";

  if (dollarAmount.length >= 4 && dollarAmount.length <= 6) {
    unitSymbol = "K";
  } else if (dollarAmount.length >= 7 && dollarAmount.length <= 9) {
    unitSymbol = "M";
  } else if (dollarAmount.length >= 10 && dollarAmount.length <= 12) {
    unitSymbol = "B";
  } else if (dollarAmount.length >= 13 && dollarAmount.length <= 15) {
    unitSymbol = "T";
  } else if (dollarAmount.length >= 16 && dollarAmount.length <= 18) {
    unitSymbol = "aa";
  } else if (dollarAmount.length >= 19 && dollarAmount.length <= 21) {
    unitSymbol = "bb";
  } else if (dollarAmount.length >= 22 && dollarAmount.length <= 24) {
    unitSymbol = "cc";
  } else if (dollarAmount.length >= 25 && dollarAmount.length <= 27) {
    unitSymbol = "dd";
  } else if (dollarAmount.length >= 28 && dollarAmount.length <= 30) {
    unitSymbol = "ee";
  } else if (dollarAmount.length >= 31 && dollarAmount.length <= 33) {
    unitSymbol = "ff";
  } else if (dollarAmount.length >= 34 && dollarAmount.length <= 36) {
    unitSymbol = "gg";
  }

  if (dollarAmount.length === 4) {
    return `${dollarAmount[0]}.${dollarAmount[1]}${unitSymbol}`;
  } else if (dollarAmount.length === 5) {
    return `${dollarAmount.slice(0, 2)}.${dollarAmount[2]}${unitSymbol}`;
  } else if (dollarAmount.length === 6) {
    return `${dollarAmount.slice(0, 3)}.${dollarAmount[3]}${unitSymbol}`;
  } else if (dollarAmount.length >= 7) {
    let indexCheck = dollarAmount.length / 3;
    indexCheck = String(indexCheck);

    if (Number.isInteger(Number(indexCheck))) {
      return `${dollarAmount.slice(0, 3)}.${dollarAmount.slice(
        3,
        4
      )}${unitSymbol}`;
    } else if (indexCheck.split(".")[1][0] === "3") {
      return `${dollarAmount[0]}.${dollarAmount.slice(1, 2)}${unitSymbol}`;
    } else {
      return `${dollarAmount.slice(0, 2)}.${dollarAmount.slice(
        2,
        3
      )}${unitSymbol}`;
    }
  } else {
    return dollarAmount;
  }
};

// piggy bank
const addPiggyPerHour = function () {
  totalPiggyMoneyTest = totalPiggyMoney;
  totalPiggyMoney += dollarPerHour / 3600;
  if (
    Math.trunc(totalPiggyMoney) > Math.trunc(totalPiggyMoneyTest) &&
    Math.trunc(totalPiggyMoney) <= dollarCapacity
  )
    totalPiggyMoneyOnScreen.textContent = `$${dollarShortening(
      Math.trunc(totalPiggyMoney)
    )}`;
  if (totalPiggyMoney >= dollarCapacity)
    totalPiggyMoneyOnScreen.textContent = `$${dollarShortening(
      dollarCapacity
    )}`;
};

// piggy dollar per second
interval.piggyPerSecond = () => {
  setInterval(() => {
    if (totalPiggyMoney <= dollarCapacity) {
      addPiggyPerHour();
    }
  }, 1000);
};

// piggy collect
piggyCollect.addEventListener("click", function () {
  if (totalPiggyMoney >= dollarCapacity) {
    totalMoney += dollarCapacity;
  } else {
    totalMoney += Math.trunc(totalPiggyMoney);
  }

  totalPiggyMoney = 0;
  dollarCalc(0);
});

// piggy upgrade
let counter = 0;

piggyUpgrade.addEventListener("click", function () {
  !counter
    ? (piggyUpgrade.textContent = `COST: $${dollarShortening(
        piggyUpgradeCost
      )}`)
    : (piggyUpgrade.textContent = "UPGRADE PIGGY BANK");
  piggyUpgradeOne.textContent = `+${dollarShortening(piggyUpgradePlusOne)}`;
  piggyUpgradeTwo.textContent = `+${dollarShortening(piggyUpgradePlusTwo)}`;

  if (counter === 1) {
    dollarPerHour += piggyUpgradePlusOne;
    dollarCapacity += piggyUpgradePlusTwo;

    piggyDollarPerHourOnScreen.innerHTML = `$${dollarShortening(
      dollarPerHour
    )} <span>/hour</span>`;
    piggyDollarCapacityOnScreen.innerHTML = `$${dollarShortening(
      dollarCapacity
    )} <span>capacity</span>`;

    piggyUpgradePlusOne = Math.trunc(piggyUpgradePlusOne * piggyMultiplier[0]);
    piggyUpgradePlusTwo = Math.trunc(piggyUpgradePlusTwo * piggyMultiplier[1]);

    piggyUpgradeOne.textContent = "";
    piggyUpgradeTwo.textContent = "";
    counter -= 2;
  }

  piggyUpgradeCost = Math.trunc(piggyUpgradeCost * piggyMultiplier[2]);
  counter++;
});

// bill upgrade
// billModal.style.display = "flex"; // DELETE
// backgroundBlur.style.display = ""; // DELETE

// testing
interval.dollarPerSecond();
interval.piggyPerSecond();
