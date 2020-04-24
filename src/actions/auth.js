import generateAPI from '../utils/api'
import axios from 'axios'
export const login = (token)=>({
    type: 'LOGIN',
    token
})
export const loadUser = (user)=>({
    type: 'SET_USER',
    user
})
export const startLogin = (email,password)=>{
    return async (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        
          const body = JSON.stringify({ email, password });
        
          try {
              //We try to login the user
            const res = await axios.post(process.env.DEV_URL+'/users/login', body, config);
            localStorage.setItem('auth_token',res.data.token)
            dispatch(login(res.data.token));

            //We then set the user's data
            const api = generateAPI(res.data.token)
            const user = await api.get('/users/me')
            
            dispatch(loadUser(user.data));
            
          } catch (err) {
            const errors = err.response.data.errors;
            //On ajoute ensuite les eventuelles erreurs
            if (errors) {
              errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            }
        
            dispatch({
              type: 'LOGIN_FAIL'
            });
          }
    }
}

export const startLoadUser =()=>{
    return async (dispatch,getState)=>{
        try {
            const api = generateAPI(getState().auth.token)
            const res = await api.get('/users/me')
        
            dispatch({
              type: 'USER_LOADED'
            })
            dispatch(loadUser(res.data))
          } catch (err) {
            dispatch({
              type: 'AUTH_ERROR'
            });
          }
    }
}
export const logout = ()=>({
    type:'LOGOUT'
})
export const startLogout = ()=>{
    return async (dispatch,getState)=>{
        try{
            const api = generateAPI(getState().auth.token)
            await aapi.post('/users/logout')
            dispatch(logout)
            dispatch({
                type : 'CLEAR_USER'
            })
        }catch(e){
            dispatch({
              type: 'LOGOUT_ERROR'
            });
          }
}
}