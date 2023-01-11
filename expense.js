function saveToCrud(event) {
    event.preventDefault();
    const amount= event.target.amount.value;
    const description= event.target.description.value;
    const category= event.target.category.value;

    let obj ={
        amount,
        description,
        category
    }

    axios.post("https://crudcrud.com/api/10eae63119ea44539137a6a36be13e14/studentdata",obj)
    .then((response)=>{
        showExpenseOnScreen(response.data)
        console.log(response)
    })
    .catch((err)=>console.log(err))


}

//Display expense on Screen
function showExpenseOnScreen(expense) {

    document.getElementById('amount').value='';
    document.getElementById('description').value='';


    const parentNode= document.getElementById('list')

    const childHTML=`<li id=${expense._id}> ${expense.amount} - ${expense.description} - ${expense.category}
               <button onclick=deleteExpense('${expense._id}')>Delete Expense</button>
               <button onclick=editExpense('${expense._id}','${expense.amount}','${expense.description}','${expense.category}')>Edit Expense</button>
    </li>`

    parentNode.innerHTML= parentNode.innerHTML + childHTML;
}

//Display details after reload
window.addEventListener("DOMContentLoaded",()=>{

    axios.get("https://crudcrud.com/api/10eae63119ea44539137a6a36be13e14/studentdata")
    .then((response)=>{

        for(let i=0;i<response.data.length;i++) {
            showExpenseOnScreen(response.data[i])
        }
    })
    .catch((err)=>console.log(err))
})

//Delete Expense
function deleteExpense(id) {
    axios.delete(`https://crudcrud.com/api/10eae63119ea44539137a6a36be13e14/studentdata/${id}`)
    .then((response)=>console.log(response))
    .catch((err)=>console.log(err))

    deleteExpenseFromScreen(id)
}

//Delete expense from Screen

function deleteExpenseFromScreen(id) {
    const parentNode = document.getElementById('list')
    const child = document.getElementById(id)

    parentNode.removeChild(child)
}

//Edit Expense
function editExpense(id,amount,description,category) {

    document.getElementById('amount').value = amount;
    document.getElementById('description').value= description;
    document.getElementById('category').value= category;

    deleteExpense(id)
}