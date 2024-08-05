// Date Interval
document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const allDaysCheckbox = document.getElementById("all-days");
  const weekdayCheckboxes = document.querySelectorAll(
    "input[type=checkbox]:not(#all-days):not(#include-end-date)"
  );

  // Toggle dropdown menu visibility
  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  // Synchronize "All" checkbox with individual checkboxes
  allDaysCheckbox.addEventListener("change", () => {
    weekdayCheckboxes.forEach(
      (checkbox) => (checkbox.checked = allDaysCheckbox.checked)
    );
  });

  weekdayCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (!checkbox.checked) {
        allDaysCheckbox.checked = false;
      } else if (Array.from(weekdayCheckboxes).every((cb) => cb.checked)) {
        allDaysCheckbox.checked = true;
      }
    });
  });
});

function dateInterval() {
  let startDate = new Date(document.getElementById("start-date").value);
  let endDate = new Date(document.getElementById("end-date").value);
  const includeEndDate = document.getElementById("include-end-date").checked;
  const weekdays = Array.from(
    document.querySelectorAll(
      "input[type=checkbox]:not(#all-days):not(#include-end-date):checked"
    )
  ).map((checkbox) => parseInt(checkbox.value));

  if (!startDate || !endDate) {
    alert("Please select a valid date range.");
    return;
  }

  if (startDate > endDate) {
    let temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  let intervalDays = calculateDaysInterval(
    startDate,
    endDate,
    includeEndDate,
    weekdays
  );
  displayResults(intervalDays);
}

function calculateDaysInterval(startDate, endDate, includeEndDate, weekdays) {
  if (includeEndDate) endDate.setDate(endDate.getDate() + 1);
  let currentDate = new Date(startDate);
  let daysCount = 0;

  while (currentDate < endDate) {
    if (weekdays.includes(currentDate.getDay())) daysCount++;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysCount;
}

function displayResults(daysCount) {
  let breakdownResult = "",
    totalResult = "";
  let remainingDays = daysCount;

  const years = Math.floor(remainingDays / 365);
  remainingDays %= 365;
  const months = Math.floor(remainingDays / 30);
  remainingDays %= 30;
  const weeks = Math.floor(remainingDays / 7);
  remainingDays %= 7;
  const days = remainingDays;

  const hours = daysCount * 24;
  const minutes = daysCount * 24 * 60;
  const seconds = daysCount * 24 * 60 * 60;

  if (days > 0)
    totalResult += `<li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Total Days: ${daysCount}</li>`;
  if (years > 0)
    breakdownResult += `<li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Years: ${years}</li><li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Months: ${months}</li><li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Weeks: ${weeks}</li><li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Days: ${days}</li>`;
  else if (months > 0)
    breakdownResult += `<li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Months: ${months}</li><li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Weeks: ${weeks}</li><li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Days: ${days}</li>`;
  else if (weeks > 0)
    breakdownResult += `<li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Weeks: ${weeks}</li><li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Days: ${days}</li>`;

  // Add the total counts
  totalResult += `<li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Total Hours: ${hours}</li>`;
  totalResult += `<li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Total Minutes: ${minutes}</li>`;
  totalResult += `<li class="flex items-center justify-center text-md font-medium px-2 py-1 border-2 rounded-lg shadow-lg">Total Seconds: ${seconds}</li>`;

  document.getElementById("breakdown-result").innerHTML = breakdownResult;
  document.getElementById("total-result").innerHTML = totalResult;
}

// Date Manipulator
function dateManipulator() {
  const startDate = new Date(document.getElementById("date").value);
  const operation = document.getElementById("operation").value;
  const unit = document.getElementById("unit").value;
  const amount = parseInt(document.getElementById("amount").value);

  if (isNaN(startDate.getTime())) {
    alert("Please enter a valid start date.");
    return;
  }

  if (isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  let resultDate = new Date(startDate);

  switch (unit) {
    case "years":
      resultDate.setFullYear(
        operation === "add"
          ? resultDate.getFullYear() + amount
          : resultDate.getFullYear() - amount
      );
      break;
    case "months":
      resultDate.setMonth(
        operation === "add"
          ? resultDate.getMonth() + amount
          : resultDate.getMonth() - amount
      );
      break;
    case "weeks":
      resultDate.setDate(
        operation === "add"
          ? resultDate.getDate() + amount * 7
          : resultDate.getDate() - amount * 7
      );
      break;
    case "days":
      resultDate.setDate(
        operation === "add"
          ? resultDate.getDate() + amount
          : resultDate.getDate() - amount
      );
      break;
    default:
      alert("Invalid unit selected.");
      return;
  }

  document.getElementById("output-date").innerHTML = `
  <p class="text-xl font-semibold text-center px-2 py-1 border-2 rounded-lg shadow-lg">${resultDate.toDateString()}</p>`;
}
