export const initialState=null

export const reducer=(state,action)=>{
    // if(action.type==="USER"){
    //     return action.payload
    // }
    // return state

    switch (action.type) {
        case 'USER':
            return { ...state, user:action.payload }
        default:
            return state
    }

}