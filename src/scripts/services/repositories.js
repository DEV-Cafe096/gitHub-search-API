import { baseUrl, reposQuantity } from '../variable.js'


async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${reposQuantity}`)
    return await response.json()
}

export { getRepositories }