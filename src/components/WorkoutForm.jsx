import { useState } from "react"

function WorkoutForm({ onAddWorkout, date, setDate, distance, setDistance, editingId }) {
  function handleSubmit(e) {
    e.preventDefault()

    if (!date) return
    const [year, month, day] = date.split("-")
    const formattedDate = `${day}.${month}.${year}`

    const distNum = parseFloat(distance)
    if (isNaN(distNum) || distNum <= 0) {
      alert("Количество километров должно быть больше нуля!")
      return
    }

    onAddWorkout(formattedDate, distNum)
  }

  return (
    <div className="form-container">
      <form id="trainingForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="distance">Пройдено км</label>
            <input 
              type="number" 
              id="distance" 
              name="distance" 
              placeholder="5.7" 
              step="0.1" 
              min="0" 
              value={distance} 
              onChange={(e) => setDistance(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="submit-btn">
            {editingId ? "Сохранить" : "OK"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default WorkoutForm
