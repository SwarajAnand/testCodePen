const projectReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_PROJECTS':
            // set the user data
            return{
                ...state,
                projects : action.projects
            }

            case 'SET_PROJECTS_NULL':
            // set the user data
            return{
                ...state,
                projects : null
            }

            default :
            return state
    }
}

export default projectReducer