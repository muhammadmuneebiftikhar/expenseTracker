var expenses = [];
var stringExpenses;
var expenseTable = document.getElementById("expenseTable");
var totalAmount = document.getElementById("totalAmount");
totalAmount.innerHTML = "Total Amount: Rs." + 0;

displayExpenses();

document.getElementById("form").addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let amount = document.getElementById("amount").value;

  const newExpense = {
    name,
    type,
    date,
    amount,
    id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
  };
  console.log(newExpense);
  expenses.push(newExpense);
  console.log("expenses", expenses);
  stringExpenses = JSON.stringify(expenses);
  localStorage.setItem("expenses", stringExpenses);
  displayExpenses();
}

function displayExpenses() {
  var retrievedData = localStorage.getItem("expenses");
  var retExpense = JSON.parse(retrievedData);
  expenseTable.innerHTML = "";
  var total = 0;

  if (retExpense) {
    for (let i = 0; i < retExpense.length; i++) {
      expenseTable.innerHTML += `
                <tr>
                    <td>${retExpense[i].type}</td>
                    <td>${retExpense[i].name}</td>
                    <td>${retExpense[i].date}</td>
                    <td>Rs.${retExpense[i].amount}</td>
                    <td><button class="deleteButton" onclick="deleteExpense(${retExpense[i].id})">
                        Delete</button></td>
                </tr>
            `;
      total = total + parseInt(retExpense[i].amount);
    }
    totalAmount.innerHTML = "Total Spend : Rs." + total;
    expenses = retExpense;
  }
}

function deleteExpense(id) {
  var retrievedData = localStorage.getItem("expenses");
  var retExpense = JSON.parse(retrievedData);
  for (let i = 0; i < retExpense.length; i++) {
    if (retExpense[i].id === id) {
      retExpense.splice(i, 1);
      localStorage.setItem("expenses", JSON.stringify(retExpense));
      displayExpenses();
      return;
    }
  }
  alert("ID not found");
}
