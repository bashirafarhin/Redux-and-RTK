import { createStore } from "redux";
import { produce } from "immer";

const initialState = {
    name: 'Vishwas',
    address: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA'
    }
}
const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = street => {
    return {
      type: STREET_UPDATED,
      payload: street
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case STREET_UPDATED:
        //   return {
        //     ...state,
        //     address: {
        //       ...state.address,
        //       street: action.payload
        //     }
        //   }
        // when we we need to update state especially in nested states it sometimes gets difficult to only change
        // a property and all property should remain same even with using spread operator that's why we use immer
        // package, it takes current state and it has a function which receives a draft copy of the state and
        // behind the scenes it works in the same manner as above
        return produce(state,(draft)=>{
            draft.address.address=action.payload
        })
      default: {
        return state
      }
    }
}
const store = createStore(reducer);
console.log('Initial State ', store.getState())
const unsubscribe = store.subscribe(() => {
  console.log('Updated State ', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()