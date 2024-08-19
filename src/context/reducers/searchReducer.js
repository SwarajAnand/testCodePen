const searchReducer = (state='', action) => {
    switch(action.type){
        case 'SET_SEARCH_TERM':
            // set the user data
            return{
                ...state,
                searchTerm : action.searchTerm
            }

            case 'SET_SEARCH_TERM_EMPTY':
            // set the user data
            return{
                ...state,
                searchTsearch:''
            }

            default :
            return state
    }
}

export default searchReducer