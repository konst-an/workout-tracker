import { useState } from "react"
import WorkoutForm from "./components/WorkoutForm"
import WorkoutTable from "./components/WorkoutTable"

function App() {
  const [workouts, setWorkouts] = useState([])
  const [date, setDate] = useState("")
  const [distance, setDistance] = useState("")
  const [editingId, setEditingId] = useState(null)

  function handleAddWorkout(formattedDate, distNum) {
    const existingWorkout = workouts.find(item => item.dateStr === formattedDate)
    let updatedList = []

    if (editingId) {
      updatedList = [...workouts];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].id === editingId) {
          updatedList[i].dateStr = formattedDate;
          updatedList[i].distance = distNum;
        }
      }
      setEditingId(null);
    } else if (existingWorkout) {
      updatedList = [...workouts];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].dateStr === formattedDate) {
          updatedList[i].distance = updatedList[i].distance + distNum;
        }
      }
    } else {
      const newWorkout = { id: Date.now(), dateStr: formattedDate, distance: distNum }
      updatedList = [...workouts, newWorkout];
    }

    updatedList.sort((a, b) => {
      const dateA = a.dateStr.split(".").reverse().join("-");
      const dateB = b.dateStr.split(".").reverse().join("-");
      return new Date(dateB) - new Date(dateA);
    });

    setWorkouts(updatedList);
    setDate("")
    setDistance("")
  }

  function handleDelete(id) {
    const filteredWorkouts = workouts.filter(item => item.id !== id)
    setWorkouts(filteredWorkouts)
    if (editingId === id) {
      setEditingId(null)
      setDate("")
      setDistance("")
    }
  }

  function handleEdit(item) {
    setEditingId(item.id)
    const [day, month, year] = item.dateStr.split(".")
    setDate(`${year}-${month}-${day}`)
    setDistance(item.distance.toString())
  }

  return (
    <div className="container">
      <WorkoutForm 
        onAddWorkout={handleAddWorkout}
        date={date}
        setDate={setDate}
        distance={distance}
        setDistance={setDistance}
        editingId={editingId}
      />
      <WorkoutTable 
        workouts={workouts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
