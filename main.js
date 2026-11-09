let expenses = [];

// Check LocalStorage
if(localStorage.getItem("expenses"))
{
    expenses = JSON.parse(localStorage.getItem("expenses"));

    displayExpenseList();
}

// Add and Edit Expense
expenseform.addEventListener('submit', (event) =>
{
    event.preventDefault();

    // Get values from input
    const expensenameinput = expensename.value;
    const amountinput = Number(amount.value);
    const categoryinput = category.value;
    const dateinput = date.value;

    if(expensenameinput && amountinput > 0 &&
       categoryinput && dateinput)
    {
        const editindex = editstatus.value;

        if(editindex == "")
        {
            // Add expense
            expenses.push({
                expensename: expensenameinput,
                amount: amountinput,
                category: categoryinput,
                date: dateinput
            });

            console.log(expenses);
        }
        else
        {
            // Update expense
            expenses[editindex] = {
                expensename: expensenameinput,
                amount: amountinput,
                category: categoryinput,
                date: dateinput
            };
        }
    }
    else
    {
        alert("Please fill the form completely");
        return;
    }

    expenseform.reset();

    editstatus.value = "";

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenseList();

});


// Display Expense List
function displayExpenseList()
{
    tablebody.innerHTML = "";

    const filtervalue = filtercategory.value;

    let totalamount = 0;

    expenses.forEach((item, index) =>
    {
        if(filtervalue == "All" || item.category == filtervalue)
        {
            totalamount += item.amount;

            tablebody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.expensename}</td>
                    <td>₹${item.amount.toFixed(2)}</td>
                    <td>${item.category}</td>
                    <td>${item.date}</td>

                    <td>
                        <button class="btn btn-warning"
                        onclick="editExpense(${index})">
                            Edit
                        </button>

                        <button class="btn btn-danger"
                        onclick="deleteExpense(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });

    total.innerText = totalamount.toFixed(2);
}


// Edit Expense
function editExpense(expenseindex)
{
    const expensedetails = expenses[expenseindex];

    expensename.value = expensedetails.expensename;

    amount.value = expensedetails.amount;

    category.value = expensedetails.category;

    date.value = expensedetails.date;

    editstatus.value = expenseindex;
}


// Delete Expense
function deleteExpense(expenseindex)
{
    if(confirm("Are you sure you want to delete this expense?"))
    {
        expenses.splice(expenseindex, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenseList();
    }
}


// Filter Expenses
filtercategory.addEventListener('change', () =>
{
    displayExpenseList();
});