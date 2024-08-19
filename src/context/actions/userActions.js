// Two different actions - 
// To push the data to the state
// To remove the data from the state

export const SET_USER = (user) => {
    return {
        type : 'SET_USER',
        user : user
    }
}

export const SET_USER_NULL = () => {
    return {
        type : 'SET_USER_NULL'
    }
}

//perform action on exactly what needs to be triggered
// reducer to perform that action to update or manupulate the states
// Then we need to maintain a store where we can manage all the states in a common place to spread the data states to all the child components