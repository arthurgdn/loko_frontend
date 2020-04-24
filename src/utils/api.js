import axios from 'axios'
//fonction pour générer une instance axios avec le token de l'utilisateur
//On pourra eventuellement l'ajouter ensuite au store auth 
export default (token)=>{
    const instance =  axios.create({
        baseURL: process.env.DEV_URL,
    })
    instance.defaults.headers.common['Authorization'] = 'Bearer '+token;
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    return instance
}
