const addButton = document.getElementById('addButton');
const addinputText = document.getElementById('addItem');
let table = document.getElementById('toDoTable').getElementsByTagName('tbody')[0];

console.log(typeof addinputText.value);

addItem();
changeButtonColorWhenHovering(addButton);
changeButtonColorWhenHoveringOff(addButton)



//adds the item in the text input when the button is clicked
function addItem(){

    //Append to table

    //add to database
    addButton.addEventListener('click', () =>{

        if(addinputText.value.trim() == '' || addinputText.value == null){
            //do nothing
        }
        else{
            let newRow = table.insertRow(2);
            newRow.innerHTML = `<tr> <td>${addinputText.value}</td> <td>$50.00</td> <td class='tdRightSide'><img src='img/emptyCircle.png' /></td>  <td class="tdRightSide"><img src="img/remove.png" /></td></tr>`;
            addinputText.value ='';
        }

    });
}

//Adds item when enter button is clicked
function addItemEnterButton(){
    addinputText.addEventListener('keydown', event =>{

        if(addinputText.value.trim() == '' || addinputText.value == null){
            //do nothing
        }
        else{
            if(event.key == "Enter"){
                let newRow = table.insertRow(2);
                newRow.innerHTML = `<tr> <td>${addinputText.value}</td> <td>$50.00</td> <td class='tdRightSide'><img src='img/emptyCircle.png' /></td> </tr>  <td class="tdRightSide"><img src="img/remove.png" /></td>`;
                addinputText.value ='';
            }            
        }

    });
}


function changeButtonColorWhenHovering (button){
    button.addEventListener('mouseover', () =>{
        addButton.style.opacity = .5;
        
    });
}

function changeButtonColorWhenHoveringOff (button){
    button.addEventListener('mouseout', () =>{
        addButton.style.opacity = 1;
    });
}

