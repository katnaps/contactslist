export const ContactReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return action.payload

        case 'FETCH_ERROR':
            return {
                post: {},
                error: 'Something went wrong'
            }
            
        default:
            return state
    }
}