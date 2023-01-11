async function saveToCrud(event) {
    event.preventDefault();
    const amount= event.target.amount.value;
    const description= event.target.description.value;
    const category= event.target.category.value;

    let obj ={
        amount,
        description,
        category
    }

    try{
    const response= await axios.post("https://crudcrud.com/api/ac0b456249dd45119466c357783af688/studentData",obj)

        showExpenseOnScreen(response.data)
        console.log(response)
    }
    catch(err) {
        console.log(err)
    }

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
   async function reload(){
     try{
        const response = await axios.get("https://crudcrud.com/api/ac0b456249dd45119466c357783af688/studentData")

            for(let i=0;i<response.data.length;i++) {
                showExpenseOnScreen(response.data[i])
            }
        }
     catch(err){
        console.log(err)
     }

   }
   reload()
})

//Delete Expense
async function deleteExpense(id) {
    try{
        const response = await axios.delete(`https://crudcrud.com/api/ac0b456249dd45119466c357783af688/studentData/${id}`)
        console.log(response)
        deleteExpenseFromScreen(id)
    }
    catch(err){
        console.log(err)
    }

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