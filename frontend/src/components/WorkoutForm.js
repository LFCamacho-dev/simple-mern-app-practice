import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"



export const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workoutBody = { title, load, reps }
        console.log(workoutBody)
        
        
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workoutBody),
            headers: {"Content-Type": "application/json"}
        
        })
        const json = await response.json()
        
        if(!response.ok){
            setError(json.error)
        } 

        if(response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            // console.log('New Workout Added');
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }


  return (

    <form onSubmit={handleSubmit} className="create">
        <h3>Add a New Workout</h3>

        <label htmlFor="title">Exercise Title:</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title} />

        <label htmlFor="load">Load:</label>
        <input
          type="number"
          id="load"
          onChange={(e) => setLoad(e.target.value)}
          value={load} />

        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          onChange={(e)  => setReps(e.target.value)}
          value={reps} />

        <button type="submit">Add Workout</button>
        { error && <div className="error">{error}</div> }

    </form>


  )
}
