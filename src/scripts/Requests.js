import { getRequests } from "./dataAccess.js";



export const Requests = () => {
    const requests = getRequests();

    let requestHTML = `<ul class="requests">
        ${requests.map(request => `<li>
            ${request.description}
            </li>`).join("")
        } </ul>`;

    return requestHTML;
};