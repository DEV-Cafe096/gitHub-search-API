
            //Criando objeto
const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    repositories: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url 
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
    },
    setRepositories(repositories){
        this.repositories = repositories
    },
    setFollowers(followers){
        this.followers = followers

    },

    setFollowing(following){
        this.following = following
    },

    setEvents(events){
        this.events = events
    }
    
}

export { user }