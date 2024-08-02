import { baseUrl } from '../variable.js'

async function getUserEvents(userName) {
    const response =  await fetch(`${baseUrl}/${userName}/events`);
    return response.json();
}

export { getUserEvents }