import React from 'react';
import ReadExcelFile from './ReadExcelFile';

function DisplaySheet() {

    const [sheetData, setSheetData] = useState(null);
    const [sheets, setSheets] = useState(null);



    let handleFileUploaded = (e) => {
        console.log("submited");

        if (e) { setSheets(Object.keys(e)[0]) }
        setSheetData(e);
    }



    return (
        <>
            <div className='container'>
                <div className='row d-flex justify-content-center mt-2'>
                    <div className='col-md-8'>


                        <ReadExcelFile handleFileUploaded={handleFileUploaded} />
                        <p>{sheets}</p>
                        {sheetData &&
                            <>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            {sheetData[sheets][0].map(h => <th key={h}>{h}</th>)}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            <tr>
                                                {sheetData[sheets].slice(1).map(row =>
                                                    <tr>

                                                        {row.map(c => <td>{c}</td>)}
                                                    </tr>



                                                )}

                                            </tr>

                                        }
                                    </tbody>
                                </table>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}


export default DisplaySheet