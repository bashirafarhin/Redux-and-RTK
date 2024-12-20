import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cakeActions } from './cakeSlice';
export const CakeView = () => {
    const numOfCakes = useSelector((state) => state.cake.numOfCakes);
    const dispatch=useDispatch();
  return (
    <div>
        <h2>Number of cakes-{numOfCakes}</h2>
        <button onClick={()=>dispatch(cakeActions.ordered())}>Order cake</button>
        <button onClick={()=>dispatch(cakeActions.restocked(3))}>Restock cakes</button>
    </div>
  )
}
