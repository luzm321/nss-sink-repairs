import { render } from "./main.js";
const mainContainer = document.querySelector("#container");

const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
};

// FETCH CALL REQUESTS:

//fetching get request api call to store external data from the api database in applicationState object:

const API = "http://localhost:8088";

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        );
};

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (servicePlumbers) => {
                // Store the external state in application state
                applicationState.plumbers = servicePlumbers
            }
        );
};

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceCompletions) => {
                // Store the external state in application state
                applicationState.completions = serviceCompletions
            }
        );
};

//exporting copy of specified object properties of application state:

export const getRequests = () => {
    return applicationState.requests.sort((a,b) => {
        // a is the second thing, b is the first thing in the array, if the second thing is the same as the first thing return 0, if they aren't
        // the same then is the first thing true, if it is then it returns -1, if it isn't it returns 1.
        // this sorting allows for all the isCompleted requests to be last and the false ones first.
        return (a.isCompleted === b.isCompleted) ? 0 : b.isCompleted ? -1 : 1;
    });
};

// export const getRequests = () => {
//     return applicationState.requests.map(request => ({...request}));
// };

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}));
};

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}));
};

//HTTP POST(create something new) Request with Fetch; the POST fetch call will dispatch the stateChanged custom event after the POST operation
//is completed; every time state changes, you have to generate new HTML representations of the state

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    };


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        });
};

export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    };


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            render();
        });
};


// Fetching HTTP DELETE Request: when using DELETE method on an HTTP request to the API, you must identify a single resource
//(object via the id/primary key) as an argument to avoid deleting an entire collection/array:

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                // mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                render();
            }
        );
};



