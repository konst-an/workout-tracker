function WorkoutTable({ workouts, onEdit, onDelete }) {
  return (
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
              <button className="action-btn edit-btn" title="Редактировать" onClick={() => onEdit(item)}>
                ✎
              </button>
              <button className="action-btn delete-btn" title="Удалить" onClick={() => onDelete(item.id)}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutTable
