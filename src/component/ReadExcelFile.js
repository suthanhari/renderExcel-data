import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

function ReadExcelFile(props) {

    const handleFile = async (e) => {
        const myFile = e.target.files[0];
        if (!myFile) return;
        if (!handleCheckFileName(myFile.name)) {
            setExcelFileError(myFile.name);
            return;
        }

        // read xlsx data;
        const data = await myFile.arrayBuffer();
        const mySheetData = readDataFromExcel(data)


        setFile(myFile);
        setFileName(myFile.name);

        // error :props.handleFileUploaded is not a function
        props.handleFileUploaded(mySheetData);



    }
    const readDataFromExcel = (data) => {
        const wb = XLSX.read(data)
        setSheetName(wb.SheetNames);

        const mySheetData = {}

        for (var i = 0; i < wb.SheetNames.length; i++) {
            let sheetName = wb.SheetNames[i];

            const workSheet = wb.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(workSheet);

            mySheetData[sheetName] = jsonData;

            console.log(sheetName);
        }

        setSheetData(mySheetData);
        console.log(mySheetData);

        console.log(wb);

        return mySheetData;
    }

    const [fileName, setFileName] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    const acceptableFileName = ["xlsx", "xls"];

    const handleCheckFileName = (name) => {
        return acceptableFileName.includes(name.split(".").pop().toLowerCase());
    }

    const handleRemove = () => {
        setFile(null);
        setFileName(null);
        setSheetData(null);
        setSheetName([]);
        fileRef.current.value = "";
    }
    const fileRef = useRef();
    const [file, setFile] = useState(null);
    const [sheetName, setSheetName] = useState([]);
    const [sheetData, setSheetData] = useState({});





    return (
        <>
            <div className='container'>
                <div className='row d-flex justify-content-center mt-4 '>
                    <div className='col-md-6 d-flex flex-row'>
                        <input className='form-control me-2' type={"file"} accept={"xlsx,xls"} multiple={false} onChange={(e) => handleFile(e)} ref={fileRef} />
                        {
                            fileName && (
                                <button type="button" className="btn-close mt-2" aria-label="Close" onClick={handleRemove}></button>
                            )
                        }
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        {
                            !fileName && <p>Please Upload file</p>
                        }
                        {
                            fileName && <p>{fileName}</p>
                        }
                        {
                            excelFileError && (
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    Invalid File Type! Valid Only for Excel files
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={handleRemove} aria-label="Close"></button>
                                </div>

                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReadExcelFile