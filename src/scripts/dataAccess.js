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

//HTTP POST(create something new) Request with Fetch:

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


