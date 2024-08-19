const useAuthReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_USER':
            // set the user data
            return{
                ...state,
                user : action.user
            }

            case 'SET_USER_NULL':
            // set the user data
            return{
                ...state,
                user : null
            }

            default :
            return state
    }
}

export default useAuthReducer