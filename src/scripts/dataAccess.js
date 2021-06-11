const applicationState = {
    requests: []
};

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