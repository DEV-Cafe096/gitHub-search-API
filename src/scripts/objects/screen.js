const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
    <div class="info">
    <img src="${user.avatarUrl}" alt="Foto do perfil" onerror="this.src='img/profile.png'">
    <div class="data">
        <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
        <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
        
        <div class="followers-following">
            <p>👥 Seguidores: ${user.followers.length ?? 0}</p>
                        <p>🌟 Seguindo: ${user.following.length ?? 0}</p>
        </div>
    </div>
    </div>
`;
        let eventsList = '';
        if (user.events && user.events.length > 0) {
            user.events.forEach(event => {
                if (event.type === 'PushEvent') {
                    eventsList += `<li><strong>${event.repo.name}:</strong>${event.payload.commits[0].message}</li>`;
                } else if (event.type === 'CreateEvent') {
                    eventsList += `<li></li>`
                }
            });
        }

        this.userProfile.innerHTML += `<div class="events section">
        <h2>Eventos recentes</h2>
        <ul>${eventsList}</ul>
        </div>`;




        // console.log(repositoriesItens);

        if (user.repositories.length > 0) {
            let repositoriesItens = ''
            user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <span class="repo-info">
                🍴 ${repo.forks_count} 
                    ★ ${repo.stargazers_count} 
                    👀 ${repo.watchers_count} 
                    ${repo.language ? `(${repo.language})` : ''} 
                    
                </span></li>`)

            this.userProfile.innerHTML += `<div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositoriesItens}</ul>
            </div>`



        }




    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },

    renderErrorMessage(message) {
        this.userProfile.innerHTML = `<p class="error">${message}</p>`;
    }


}



export { screen }


//Teste
// document.addEventListener('DOMContentLoaded', () => {
//     // Função para criar um elemento HTML de partícula de neve
//     function createSnowflake() {
//         const snowflake = document.createElement('div');
//         snowflake.classList.add('snow');
//         document.body.appendChild(snowflake);
//     }

//     // Crie 100 partículas de neve
//     for (let i = 0; i < 100; i++) {
//         createSnowflake();
//     }
// });