import { getRequests, getPlumbers, saveCompletion, deleteRequest, getCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--");
        deleteRequest(parseInt(requestId));
    };
});

export const Requests = () => {
    const requests = getRequests();
    const plumbers = getPlumbers();
    const completions = getCompletions();

//Sorting through an array of objects by its property value by utilizing the sort() method as shown below which takes a callback function that
//takes as parameters 2 objects (a,b) contained in the reservations array. Sorting through the partyDate property in the database to return the
//sorted reservations to be displayed in chronological order. Need to implement parseInt() and split() methods to extract the integer from the
//string value in database.
//When 1 is returned(or a is > b), the function communicates to sort() that the object a takes precedence in sorting over the object b (ascending). Returning
//-1 (a < b) would do the opposite of the chronological order(descending) by switching position of object a and b. The returned boolean value determines
//the ascending or descending order.
//The callback function could calculate other properties too, to handle the case where the date is the same, and sort by a secondary property.

    const sortedRequests = () => { 
        
        let requestsArraySorted = requests.sort((a,b) => {
            return parseInt(a.neededBy.split("-").join("")) - parseInt(b.neededBy.split("-").join(""));
        });

        completions.map((completedRequest) => {
            requestsArraySorted.map((request) => {
                if (parseInt(completedRequest.requestId) === request.id) {
                    // you use indexOf because the request could be the first or somewhere in the middle, so we need to find the exact index
                    // of the request in order to remove it from the sorted array via the splice method.
                    let index = requestsArraySorted.indexOf(request);
                    requestsArraySorted.splice(index, 1);
                }
            });
        });
        return requestsArraySorted;
    }

    const completedRequests = completions.sort((a,b) => {
        return parseInt(a.date_created.split("-").join("")) - parseInt(b.date_created.split("-").join(""))
    });

    //Then you map through the sortedRequests function that contains the array of request objects that have been sorted chronologically:

    let requestHTML = `<ul class="requests">
        ${sortedRequests().map(request => `<li>
            ${request.description} to be completed by ${request.neededBy}
            <select class="plumbers" id="plumbers" request-description="${request.description}" date-requested="${request.neededBy}">
                <option value="">Choose</option>
                ${plumbers.map(plumber => {
                    return `<option value="${request.id}--${plumber.id}--${plumber.name}">${plumber.name}</option>`
                }).join("")}
            </select>
            <button class="request__delete" id="request--${request.id}"> Delete </button>
            </li>`).join("")
        } 
        ${completedRequests.map(completedRequest => `<li class="completedRequest">
            ${completedRequest.description} has been completed on ${completedRequest.date_created} by ${completedRequest.plumber}
            <button class="request__delete" id="request--${completedRequest.id}"> Delete </button>
            </li>`).join("")
        }
        
        </ul>`;

    return requestHTML;

    // Second way of representing html:

    // let requestHTML = "<ul>";

    // const listItems = sortedRequests.map(request => {
    //     return `
    //         <li class="requests">
    //             ${request.description}
    //             <select class="plumbers" id="plumbers">
    //                 <option value="">Choose</option>
    //                 ${plumbers.map(plumber => {
    //                     return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
    //                 }).join("")}
    //             </select>
    //             <button class="button" id="request--${request.id}"> Delete
    //             </button>
    //         </li>`
    // });

    // requestHTML += listItems.join("");
    // requestHTML += "</ul>";
    // return requestHTML;
    
};


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId, plumberName] = event.target.value.split("--")
            const requestDescription = event.target.getAttribute("request-description");
            const requestedDate = event.target.getAttribute("date-requested");

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: new Date().toLocaleDateString(),
                isCompleted: true,
                description: requestDescription,
                requestedDate: requestedDate,
                plumber: plumberName
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
             saveCompletion(completion);
        };
    }
);


