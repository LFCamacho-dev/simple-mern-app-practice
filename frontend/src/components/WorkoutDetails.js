import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


export const WorkoutDetails = ({workout }) => {

    const {dispatch} = useWorkoutsContext()


    const handleClick = async () => { 
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }

     }
  return (

    <div className="workout-details">

        <h4>{workout.title}</h4>
        <p><strong>Load (kg): {workout.load}</strong></p>
        <p><strong>Reps: {workout.reps}</strong></p>
        <p>Created at: {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

    </div>

  )
}
