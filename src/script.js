const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const balanceDisplay = document.getElementById("balance");

const incomes = [];
const expenses = [];

incomeBtn.addEventListener("click", () => handleTransaction("income"));
expenseBtn.addEventListener("click", () => handleTransaction("expense"));

function handleTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount) || amount <= 0) return;

  const transaction = {
    description,
    amount,
    type,
  };

  if (type === "income") {
    incomes.push(transaction);
    addToList(transaction, incomeList);
  } else {
    expenses.push(transaction);
    addToList(transaction, expenseList);
  }

  updateBalance();
  clearInputs();
}

function addToList(transaction, listElement) {
  const li = document.createElement("li");
  const label = transaction.type === "income" ? "Inkomst" : "Utgift";
  li.textContent = `${transaction.description} - ${transaction.amount} kr (${label})`;
  li.className = transaction.type;
  listElement.appendChild(li);
}

function updateBalance() {
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  balanceDisplay.textContent = `${balance}`;
}

function clearInputs() {
  descInput.value = "";
  amountInput.value = "";
}
