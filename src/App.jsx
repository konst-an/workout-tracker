import { useState } from "react"

function App() {
  const [workouts, setWorkouts] = useState([])

  const [date, setDate] = useState("")
  const [distance, setDistance] = useState("")
  const [editingId, setEditingId] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    const isValidDate = /^\d{2}\.\d{2}\.\d{4}$/.test(date)
    if (!isValidDate) {
      alert("Неверный формат даты! Используйте точки: ДД.ММ.ГГГГ (например, 20.07.2019)")
      return
    }

    if (!date || !distance) return
    const distNum = parseFloat(distance)

     if (isNaN(distNum) || distNum <= 0) {
      alert("Количество километров должно быть больше нуля!")
      return
    }

    //Проверяем, есть ли уже тренировка с такой же датой
    const existingWorkout = workouts.find(item => item.dateStr === date)

    let updatedList = []

    if (editingId) {
      updatedList = [...workouts];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].id === editingId) {
          updatedList[i].dateStr = date;
          updatedList[i].distance = distNum;
        }
      }
      setEditingId(null);
    } else if (existingWorkout) {
      updatedList = [...workouts];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].dateStr === date) {
          updatedList[i].distance = updatedList[i].distance + distNum;
        }
      }
    } else {
      const newWorkout = {
        id: Date.now(),
        dateStr: date,
        distance: distNum
      }
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
    setDate(item.dateStr)
    setDistance(item.distance.toString())
  }

  return (
  <div className="container">
  
      <div className="form-container">
        <form id="trainingForm" onSubmit={handleSubmit}>
          <div className="form-row">
            
            <div className="form-group">
              <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
              <input 
                type="text" 
                id="date" 
                name="date" 
                placeholder="20.07.2019" 
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

            <button type="submit" className="submit-btn">OK</button>
            
          </div>
        </form>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата (ДД.ММ.ГГ)</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>

        <div className="table-body" id="tableBody">
          
          {workouts.map((item) => (
            <div className="table-row" key={item.id}>
              <div className="col-date">{item.dateStr}</div>
              <div className="col-distance">{item.distance}</div>
              <div className="col-actions">
                <button 
                    className="action-btn edit-btn" 
                    title="Редактировать"
                    onClick={() => handleEdit(item)}
                  >
                  ✎
                </button>
                <button 
                  className="action-btn delete-btn" 
                  title="Удалить"
                  onClick={() => handleDelete(item.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default App