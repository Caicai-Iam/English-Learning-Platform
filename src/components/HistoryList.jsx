import './HistoryList.css'

function HistoryList({ history, onLoad, onDelete }) {
  return (
    <div className="history-list-container">
      <h3 className="history-title">Learning History</h3>

      {history.length === 0 ? (
        <div className="history-empty">
          <p>No learning records yet</p>
        </div>
      ) : (
        <div className="history-items">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-content">
                <div className="history-date">{item.timestamp}</div>
                <div className="history-preview">{item.content}</div>
              </div>
              <div className="history-actions">
                <button
                  className="btn-action btn-load"
                  onClick={() => onLoad(item)}
                  title="Load"
                >
                  载入
                </button>
                <button
                  className="btn-action btn-download"
                  onClick={() => {
                    const element = document.createElement('a')
                    const file = new Blob([item.fullContent], {
                      type: 'text/plain',
                    })
                    element.href = URL.createObjectURL(file)
                    element.download = `learning-${item.id}.txt`
                    document.body.appendChild(element)
                    element.click()
                    document.body.removeChild(element)
                  }}
                  title="Download"
                >
                  下载
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => onDelete(item.id)}
                  title="Delete"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryList
