import { getRequests } from "./dataAccess.js";



export const Requests = () => {
    const requests = getRequests();

    let requestHTML = `<ul class="requests">
        ${requests.map(request => `<li>
            ${request.description}
            <button class="request__delete" id="request--${request.id}"> Delete </button>
            </li>`).join("")
        } </ul>`;

    return requestHTML;
};
