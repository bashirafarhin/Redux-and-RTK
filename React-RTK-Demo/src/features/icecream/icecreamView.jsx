import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { icecreamActions } from './icecreamSlice';
export const IcecreamView = () => {
    const [ value, setvalue ] = useState(1);
    const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams);
    const dispatch=useDispatch();
  return (
    <div>
        <h2>Number of ice creams-{numOfIcecreams}</h2>
        <button onClick={()=>dispatch(icecreamActions.ordered())}>Order ice cream</button>
        <input  id="1" type="number" value={value} onChange={(e)=>{setvalue(parseInt(e.target.value))}}/>
        <button onClick={()=>dispatch(icecreamActions.restocked(value))}>Restock ice creams</button>
    </div>
  )
}
