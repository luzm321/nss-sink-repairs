import { fetchRequests } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";
import { deleteRequest } from "./dataAccess.js";



const mainContainer = document.querySelector("#container");
//render function invokes the fetchRequests function which returns the external data from the api database stored in applicationState object, 
//then the data structures can be converted into HTML representations:
//fetchRequests function receives a promise, which you resolve with .then() which takes a function that enables the returned html representation
//value of calling the SinkRepair() fxn to be displayed to the DOM after the render() fxn is invoked on line 19:
const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    );
};

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--");
        deleteRequest(parseInt(requestId));
    };
});


render();

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
);


