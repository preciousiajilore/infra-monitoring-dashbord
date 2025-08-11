import { useState } from "react";

export default function Counter ({step}){
    const [count, setCount] = useState(0);

    return (
        <div>
            <p> Count: {count}</p>
            <button onClick={() => setCount(count + step)}>+{step}</button>
            <button onClick={() => setCount(count - step)}>-{step}</button>
        </div>
    );
}