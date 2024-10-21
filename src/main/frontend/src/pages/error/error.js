import "../../css/error.scss"

function Error({code}){
    const handleGoBack = () => {
        if (code === 404) {
            window.location.href = '/'; // Перенаправление на главную страницу (или другую указанную)
        } else {
            window.history.back(); // Возвращает на предыдущую страницу
        }
    };
    return(
        <div className={`container-error`}>
            <div className={`number-error`}>
                {code}
            </div>
            <div className={`container-error-message`}>
                <div className={`message-error`}>
                    <h2 className={`ft112 ft1002`}>The page does not exist</h2>
                    <p className={`ft112`}>You can go back, or to the dashboard and back</p>
                    <div className={`button-error`}>
                        <button
                            className={`btn create-btn button-center`}
                            onClick={handleGoBack}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 fill="#75F5C5">
                                <path
                                    d="M19 11H7.83L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.71 11.29C4.32 11.68 4.32 12.31 4.71 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.83 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"></path>
                            </svg>
                            Go back
                        </button>
                        <a href={`/post`} className={`btn create-btn font-button`}>To news</a>
                    </div>
                </div>
                <div className={`report-error`}>
                    <h5 className={`ft113 ftmargin-11`}>Report a problem</h5>
                    <p className={`ft108 ftmargin-12`}>Contact our tech support</p>
                </div>
            </div>
        </div>
    );
}
export default Error;