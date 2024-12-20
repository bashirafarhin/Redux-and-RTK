import store from "./app/store.js";
import { cakeActions } from "./features/cake/cakeSlice.js";
import { icecreamActions } from "./features/icecream/icecreamSlice.js";
import { fetchUsers } from "./features/user/userSlice.js";

console.log('Initial state', store.getState());
const unsubscribe=store.subscribe(()=>{console.log('Updated state', store.getState())});
store.dispatch(fetchUsers());
store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());

// it will dispatch the action in this way {
    // type: "cake/ordered",
    // payload: undefined, since the ordered action doesn't accept arguments
// }
// then the action will go to the middleware if there is any middleware
// then the action will reach the cakeReducer in which it will go in that reducer whose type will
// be matched the action type
// then RTK uses Immer under the hood, allowing you to "mutate" the state directly without violating
// Redux's immutability principles. Immer converts these mutations into immutable state updates.
// A new state object is returned by Immer with the updated value for numOfCakes.
// The Redux store updates its internal state with the new object.


// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.restocked(3));

// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.restocked(2));
// unsubscribe();