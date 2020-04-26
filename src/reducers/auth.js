const authReducerDefaultState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading : true,
}

export default (state = authReducerDefaultState,action)=>{
    switch(action.type){
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated : true,
                loading : false
            }
        case 'LOGIN':
            return {
                isAuthenticated : true,
                token : action.token,
                loading : false
            }
        case 'LOGOUT':
            return {
                isAuthenticated : false,
                token : null,
                loading : false
            }
        default: return state
    }
}