import React from 'react';
import ReadExcelFile from './ReadExcelFile';

function DisplaySheet() {


    const handleFileUploaded = (e) => {
        console.log("submited", e);
    }

    return (
        <div className='container'>
            <div className='row d-flex justify-content-center mt-2'>
                <div className='col-md-8'>

                    <ReadExcelFile handleFileUploaded={(e) => handleFileUploaded(e)} />


                </div>
            </div>
        </div>
    )
}

export default DisplaySheet