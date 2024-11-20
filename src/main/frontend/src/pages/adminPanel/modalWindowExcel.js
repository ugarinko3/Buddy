import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchDownload} from "../../store/slice/adminSlice";

function ModalWindowExcel({closeWindowExcel}) {
    const {season} = useSelector((state) => state.admin);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (season && season.length > 0) {
            setLoading(false);
        }
    }, [season]);

    const clickDownloadFile = async (item) => {
        try {
            const urlFile = await dispatch(fetchDownload(item));
            console.log("URL файла:", urlFile);
            downloadFile(urlFile);
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
        }
    };
    const downloadFile = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop();
        link.click();
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content wh-123">
                <h2>Данные сезонов</h2>
                <div className={`list-excel-file`}>
                    {loading ? (
                        <div className={`container-loader`}>
                            <div className="loader"></div>
                        </div>
                    ) : (
                        season.map((item, index) => (
                            <div className={`container-excel`} key={index} onClick={() => clickDownloadFile(item)}>
                                <p className={`name-excel`}>{item}</p>
                            </div>
                        ))
                    )}
                </div>
                <button className={`btn cancel-btn mr-145`} onClick={closeWindowExcel}>
                    Выйти
                </button>
            </div>
        </div>
    );
}

export default ModalWindowExcel;