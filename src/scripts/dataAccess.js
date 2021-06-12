const mainContainer = document.querySelector("#container");

const applicationState = {
    requests: []
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

//exporting copy of requests state:

export const getRequests = () => [...applicationState.requests];

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

// Fetching HTTP DELETE Request: when using DELETE method on an HTTP request to the API, you must identify a single resource
//(object via the id/primary key) as an argument to avoid deleting an entire collection/array:

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        );
};



