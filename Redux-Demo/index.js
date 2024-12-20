// console.log("initialize npm init, installed redux");
import { createStore, bindActionCreators, combineReducers, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
const logger=reduxLogger.createLogger();
const CAKE_ORDERED="CAKE_ORDERED";
const CAKE_RESTOCKED="CAKE_RESTOCKED";
const ICECREAM_ORDERED="ICECREAM_ORDERED";
const ICECREAM_RESTOCKED="ICECREAM_RESTOCKED";
//action creator
const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}
const restockCake = (qty=1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}
const orderIceCream = (qty=1) => {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}
const restockIceCream = (qty=1) => {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}
//reducer
// const initialState = {
//     numOfCakes: 10,
//     numOfIcecream: 20,
// }
// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case CAKE_ORDERED:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes-1,
//             }
//         case CAKE_RESTOCKED:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes+action.payload,
//             }
//         case ICECREAM_ORDERED:
//             return {
//                 ...state,
//                 numOfIcecream: state.numOfIcecream-1,
//             }
//         case ICECREAM_RESTOCKED:
//             return {
//                 ...state,
//                 numOfIcecream: state.numOfIcecream+action.payload,
//             }
//         default: return state;
//     }
// }
// reducers should be separate in order to debug
const initialCakeState={
    numOfCakes: 10,
}
const initialIceCreamState={
    numOfIceCreams: 20,
}
// dispatched action will reach all reducers, the reducer which find that action type updates the state
// others not but this case doesn't happen in redux-toolkit
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes-1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes+action.payload,
            }
        default: return state;
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams-1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams+action.payload,
            }
        case CAKE_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams-1,
            }
        default: return state;
    }
}
const rootReducer=combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})
// store
const store=createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());
// subscribe method takes a function
// const unsubscribe=store.subscribe(()=>console.log("Updated State",store.getState()));
const unsubscribe=store.subscribe(()=>{});
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));
// alternate way of doing above things
const actions=bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);
unsubscribe();