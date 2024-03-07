var palData;
var secretPal;
var won = false;

document.addEventListener('DOMContentLoaded', function () {
    loadPalData();
});

window.onclick = function(event) { // click
    if (!event.target.matches('#myInput')) { // click out
        var dropdowns = document.getElementsByClassName("dropdown-content"); // look for dropdown
        for (var i = 0; i < dropdowns.length; i++) {  // For each dropdown, toggle
            var openDropdown = dropdowns[i]; 
            if (openDropdown.classList.contains('show')) { // toggle
                openDropdown.classList.remove('show');
            }
        }
    }
}


window.onload = function() {
    var dropdownItems = document.querySelectorAll('.dropdown-content a'); // store item

    dropdownItems.forEach(function(item) { // check each item
        item.addEventListener('click', function() { // check for click
            document.getElementById('myInput').value = ''; // Clear the input field
        });
    });
}

async function loadPalData() {
    secretPal = Math.floor(Math.random() * 138);
    await fetch('./PalData.json')
        .then((response) => response.json())
        .then((json) => {
            palData = json;
        })
        .catch((error) => {
            console.error('Error fetching JSON:', error);
        });
    
    console.log("Secret Pal: " + secretPal);
    console.log(palData[secretPal]);

}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function displayOff() {
    document.getElementById("myDropdown").classList.toggle("none");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().startsWith(filter)) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function compareAttributes(attribute, input, secret) {
    return (palData[input][attribute] === palData[secret][attribute]) ? "✅" :
           (palData[input][attribute] < palData[secret][attribute]) ? "⬆️" : "⬇️";
}

function guessPal(inputPal) {
    num = (Number(palData[inputPal]["Number"]) === Number(palData[secretPal]["Number"])) ? "✅" :
    (Number(palData[inputPal]["Number"]) < Number(palData[secretPal]["Number"])) ? "⬆️" : "⬇️";
    t1 = (palData[inputPal]["Type 1"] === palData[secretPal]["Type 1"]) ? "✅" : "❌";
    t2 = (palData[inputPal]["Type 2"] === palData[secretPal]["Type 2"]) ? "✅" : "❌";
    kin = compareAttributes("Kindling", inputPal, secretPal);
    wat = compareAttributes("Watering", inputPal, secretPal);
    pla = compareAttributes("Planting", inputPal, secretPal);
    ele = compareAttributes("Electric", inputPal, secretPal);
    han = compareAttributes("Handiwork", inputPal, secretPal);
    gat = compareAttributes("Gathering", inputPal, secretPal);
    lum = compareAttributes("Lumbering", inputPal, secretPal);
    min = compareAttributes("Mining", inputPal, secretPal);
    med = compareAttributes("Medicine", inputPal, secretPal);
    coo = compareAttributes("Cooling", inputPal, secretPal);
    tra = compareAttributes("Transporting", inputPal, secretPal);
    far = compareAttributes("Farming", inputPal, secretPal);

    // Create a new grid container
    var newGridContainer = document.createElement("div");
    newGridContainer.className = "grid-container";

    // Generate the content for the grid container based on the selected value
    var pal = palData[inputPal];
    var cellContent = [pal.Name, pal.Number , pal['Type 1'], pal['Type 2'], pal.Kindling, pal.Watering, pal.Planting,pal.Electric, pal.Handiwork, pal.Gathering, pal.Mining, pal.Medicine, pal.Cooling, pal.Lumbering, pal.Transporting, pal.Farming];
    var cellContent2 = ["", num, t1, t2, kin, wat, pla, ele, han, gat, lum, min, med, coo, tra, far];

    // Loop through the cell content and create div elements for each
    cellContent.forEach(function (content, index) {
        var cell = document.createElement("div"); 
        var p = document.createElement("p");
        cell.className = "cell";
        cell.textContent = content; // name content etc
        var cell2 = cellContent2[index];
        p.textContent = cell2;
        cell.appendChild(p);
        newGridContainer.appendChild(cell);
    });

    // Append the new grid container to the body
    document.body.appendChild(newGridContainer);

    if (secretPal == inputPal) {
        won = true;
        var containerDiv = document.createElement('div');

        // Create a div for the congratulatory message
        var congratsDiv = document.createElement('div');
        congratsDiv.style.textAlign = 'center';
        congratsDiv.style.border = '2px solid #000'; // 2px black border
        congratsDiv.style.backgroundColor = '#f0f0f0'; // Light gray background color
        congratsDiv.style.padding = '10px'; // Padding for better appearance

        // Create an image element
        var image = document.createElement('img');
        image.src = 'PalImages/image_'+ String(secretPal+1) +'.png'; // Replace with the actual path to your image
        image.alt = 'Congrats Image'; // Alt text for accessibility
        // Style the image
        image.style.width = '100px'; // Adjust the width as needed
        image.style.height = '100px'; // Adjust the height as needed
        image.style.borderRadius = '50%'; // Make it circular

        // Create a text element
        
        var textNode = document.createElement('span');
        textNode.textContent = ' The pal was ' + palData[secretPal]["Name"] + ' good job!';
        textNode.style.fontSize = '50px'; 

        // Append the image and text to the congratsDiv
        congratsDiv.appendChild(image);
        congratsDiv.appendChild(textNode);

        // Append the congratsDiv to the container
        containerDiv.appendChild(congratsDiv);

        // Create a retry button
        var retryButton = document.createElement('button');
        retryButton.textContent = 'Play Again';
        retryButton.style.marginTop = '10px'; // Add some space between the congratulatory message and the button
        retryButton.addEventListener('click', function () {
            location.reload();
        });

        // Append the retry button to the container
        containerDiv.appendChild(retryButton);

        // Append the container div to the body
        document.body.appendChild(containerDiv);
    }
}

class cell {
    constructor(Name,Number,Type1,Type2,Kindling,Watering,Planting,Electric,Handiwork,Gathering,Lumbering,Mining,Medicine,Cooling,Transporting,Farming) {
        this.Name = Name;
        this.Number = Number;
        this.Type1 = Type1;
        this.Type2 = Type2;
        this.Kindling = Kindling;
        this.Watering = Watering;
        this.Planting = Planting;
        this.Electric = Electric;
        this.Handiwork = Handiwork;
        this.Gathering = Gathering;
        this.Lumbering = Lumbering;
        this.Mining = Mining;
        this.Medicine = Medicine;
        this.Cooling = Cooling;
        this.Transporting = Transporting;
        this.Farming = Farming;
    }
  }
