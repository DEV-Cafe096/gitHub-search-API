import { baseUrl } from '../variable.js'



async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

export { getUser, getFollowers, getFollowing }


// Desafio 1

async function getFollowers(userName){
    const response = await fetch(`${baseUrl}/${userName}/followers`);
    return response.json();
}
async function getFollowing(userName){
    const response = await fetch(`${baseUrl}/${userName}/following`);
    return response.json();
}