import { sendRequest } from "./dataAccess.js";

//As user types into form fields and changes state of the app, this transient state is converted into permanent state by storing it in the 
//database.json file via the POST fetch call/sendRequest() fxn as illustrated below:
const mainContainer = document.querySelector("#container");

// What this is doing is getting the input element who has a property of name and the value of name is service description
// document.querySelector("input[name='serviceDescription']")
// on a raw xpath this query would be like this: //input[@name='serviceDescription']
//xpath is a query language for selecting elements in a webpage from an html or xml document, using brackets allows you to find an element
//by using a specific property value of name in example below: 
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='serviceDescription']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userBudget = document.querySelector("input[name='serviceBudget']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate,
            isCompleted: false
        };

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI);
    };
});




export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html;
};


