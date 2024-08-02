import { getUser, getFollowers, getFollowing } from '../scripts/services/user.js'
import { getRepositories } from '../scripts/services/repositories.js'

import { user } from '../scripts/objects/user.js'
import { screen } from '../scripts/objects/screen.js'
import { getUserEvents } from './services/events.js'




document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return
    getUserData(userName)

})

//Clicar Enter no input para buscar
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(userName)
    }

})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Prencha o campo com o nome do usuário do GitHub')
        return true
    }

}

function filterEventsGitHub(events) {
    const allowedTypes = ['CreateEvent', 'PushEvent'];
    const filtered = events
        .filter(event => allowedTypes.includes(event.type))
        .slice(0, 10);
    return filtered;
}

async function getUserData(userName) {
    try {

        const userResponse = await getUser(userName)
        if (userResponse.message === "Not Found") {
            screen.renderNotFound()
            return
        }
        const eventsResponse = await getUserEvents(userName);
        if (Array.isArray(eventsResponse) && eventsResponse.length > 0) {
            const filteredEvents = filterEventsGitHub(eventsResponse);
            user.setEvents(filteredEvents);
        } else {
            console.warn('Nenhum evento foi encontrado.');
            user.setEvents([]); //Define array vazio para ewitar erros na renderização
        }


        // Desafio 1 ( Adicionei as 2 funções e os 2 pârametros criados no user.js/service)
        const [repositoriesResponse, followersResponse, followingResponse] = await Promise.all([
            getRepositories(userName),
            getFollowers(userName),
            getFollowing(userName)
        ])
        user.setInfo(userResponse)
        user.setRepositories(repositoriesResponse)
        user.setFollowers(followersResponse)
        user.setFollowing(followingResponse)


        screen.renderUser(user)




    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        screen.renderErrorMessage("Erro ao carregar os dados. Tente novamente mais tarde.");
    }
}





