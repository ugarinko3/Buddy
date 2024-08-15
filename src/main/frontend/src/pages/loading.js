import "../css/loading.css";

function Loading() {
    return (
        <div className="loading">
            <div class="spinner">
              <div class="blob top"></div>
              <div class="blob bottom"></div>
              <div class="blob left"></div>

              <div class="blob move-blob"></div>
            </div>
        </div>
    )
}
export default Loading;