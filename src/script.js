// Hämta DOM-element
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const balanceDisplay = document.getElementById("balance");

// Arrayer för inkomster och utgifter
const incomes = [];
const expenses = [];

// Event-lyssnare för knappar
incomeBtn.addEventListener("click", () => handleTransaction("income"));
expenseBtn.addEventListener("click", () => handleTransaction("expense"));

// Funktion som hanterar transaktioner
function handleTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Fyll i en giltig beskrivning och ett positivt belopp.");
    return;
  }

  const transaction = {
    description,
    amount,
    type,
  };

  if (type === "income") {
    incomes.push(transaction);
    addTransactionToList(transaction, incomeList);
  } else if (type === "expense") {
    expenses.push(transaction);
    addTransactionToList(transaction, expenseList);
  }

  updateBalance();
  clearInputs();
}

// Lägg till transaktion i rätt lista i DOM
function addTransactionToList(transaction, listElement) {
  const li = document.createElement("li");
  li.textContent = `${transaction.description}: ${transaction.amount} kr`;
  listElement.appendChild(li);
}

// Uppdatera saldot
function updateBalance() {
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  balanceDisplay.textContent = balance + " kr";
}

// Rensa input-fält
function clearInputs() {
  descInput.value = "";
  amountInput.value = "";
}
