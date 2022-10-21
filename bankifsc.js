//Global variables to select ifsc input field and bank details
var bankDetails = document.getElementById("bank");
var form = document.getElementById("form-content");


function submitCode() {
    event.preventDefault(); //pausing default form submission
    var code = document.getElementById('ifsc_code'); //getting the value of input field[IFSC code]
    //AJAX call
    var url = `https://ifsc.razorpay.com/${code.value}`;
    fetch(url)
        .then(function(res) {
            if (res.status == 404) {
                throw new Error("IFSC CODE NOT CORRECT");
            }
            return res.json();
        })
        .then(function(bankDes) { // On Success
            M.toast({
                html: '<i class="material-icons">check</i> Request Successful!',
                classes: 'green rounded'
            });
            bankDetails.innerHTML = `
            <h3 class="col s12"> Bank Details </h3>
                  <table class="highlight centered col m8 l8 offset-m2 offset-l2 ">
                      <thead>
                        <tr>
                            <th>BANK</th>
                            <th>${bankDes.BANK}</th>
                        </tr>
                      </thead>
                      <tbody>
                       <tr>
                          <td>BANKCODE</td>
                          <td>${bankDes.BANKCODE}</td>
                       </tr>
                        <tr>
                          <td>BRANCH</td>
                          <td>${bankDes.BRANCH}</td>
                       </tr>
                       <tr>
                          <td>CONTACT</td>
                          <td>${bankDes.CONTACT}</td>
                       </tr>
                        <tr>
                          <td>ADDRESS</td>
                          <td>${bankDes.ADDRESS}</td>
                       </tr>
                       <tr>
                          <td>CITY</td>
                          <td>${bankDes.CITY}</td>
                       </tr>
                        <tr>
                          <td>IFSC</td>
                          <td>${bankDes.IFSC}</td>
                       </tr>
                      </tbody>
                     </table> 
                  <div class="col s12">
                    <button id="search_again" onclick="BackToForm()" class="btn ">
                         Search Another Bank
                     </button>
</div>`;


        })
        .catch(function(error) { // On failure
            M.toast({
                html: '<i class="material-icons">close</i>Error Occurred!',
                classes: 'red rounded'
            });

            bankDetails.innerHTML = `
            <div class="red-text errorMsg" >${error}</div> <hr>
            <div class="col s12">
                    <button id="search_again" onclick="BackToForm()" class="btn ">Search Another Bank </button>
            </div>`;

        });

    code.value = ""; //reseting the input field value to blank
    // Adding animations
    form.classList.add("hideAni");
    bankDetails.classList.add("showAni");
    setTimeout(function() {
        form.style.display = "none";
        bankDetails.style.display = "block";
        form.classList.remove("hideAni");
        bankDetails.classList.remove("showAni");
    }, 300);

}

//Adding animation while returning back search form
function BackToForm() {
    bankDetails.classList.add("hideAni");
    form.classList.add("showAni");
    setTimeout(function() {
        bankDetails.style.display = "none";
        form.style.display = "block";
        bankDetails.classList.remove("hideAni");
        form.classList.remove("showAni");
    }, 300);
}

// Materialise Initialisation
M.AutoInit();