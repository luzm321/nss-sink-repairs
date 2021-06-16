import { fetchRequests, fetchPlumbers, fetchCompletions, deleteRequest } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";


const mainContainer = document.querySelector("#container");
//render function invokes the fetchRequests function which returns the external data from the api database stored in applicationState object,
//then the data structures can be converted into HTML representations:
//fetchRequests function returns a promise, which you resolve with .then() and chain the .then() which takes the fxn fetchPlumbers which returns a
//promise that you resolve with another .then which takes the fxn fetchCompletions returns another promise that you resolve with yet another .then
//which takes a function that enables the returned html representation value of calling the SinkRepair() fxn to be displayed to the DOM after the
// render() fxn is invoked on line 23:
export const render = () => {
    fetchRequests()
    .then(fetchPlumbers)
    .then(fetchCompletions)
    .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    );
};

render();

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
);


