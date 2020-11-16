const addButton = document.getElementById('addButton');
const addinputText = document.getElementById('addItem');
let table = document.getElementById('toDoTable').getElementsByTagName('tbody')[0];

console.log(typeof addinputText.value);

addItem();

function addItem(){

    //Append to table

    //add to database
    addButton.addEventListener('click', () =>{

        if(addinputText.value.trim() == '' || addinputText.value == null){
            //do nothing
        }
        else{
            let newRow = table.insertRow(2);
            newRow.innerHTML = `<tr> <td>${addinputText.value}</td> <td class='tdRightSide'><img src='img/emptyCircle.png' /></td> </tr>`;
        }

    });
}

