import { Component, DragEventHandler } from "react";
import { UploadConfig } from "./UploadPageConfig";
import React, { useState } from "react";
import { DocStatusClientside, StatusValues } from "./DocStatus";
import { createNewUploadingDocProcess } from "./DocStatus";
// import DocDataStatusManager from "./DocStatusDataManager";
import { ChangeEventHandler } from "react";
//import { uploadDoc } from "./DocUploader.ts.old";
import { uploadDocuments, uploadReturn, uploadParams } from "store/actions/addDocuments";
import { useDispatch } from "react-redux";
import { AddOrUpdateProcessesById } from "store/reducers/AddDocumentsSlice";

type UploadPageState = {
	//startPage: number | null;
	//endPage: number | null;
	startPage: number | "";
	endPage: number | "";
	selectedFiles: FileList | null;
};

interface FileWithProcess {
	file: File,
	process: DocStatusClientside
}

// export interface UploadGeneralProps
// {
// 	// uploadPageConfig: UploadPageConfig;
// 	docStatusManager: DocDataStatusManager;
// }

// class UploadZone extends Component<UploadGeneralProps, UploadPageState>{

// 	constructor(props: UploadGeneralProps, docStatusManager: DocDataStatusManager) {
// 		super(props);

//         this.state = {
//           startPage: "",
// 			endPage: "",
// 			selectedFiles: null
//         };

// //		this.handleChange = this.handleChange.bind(this);
// 	}

//	handleChange(event) {
//		this.setState({value: event.target.value});
//	  }
		
const UploadZone = () =>
    {
		const dispatch = useDispatch()
  
		const [selectedData,setSelectedData] = useState<UploadPageState>(
			{ 
				startPage: "",
				endPage: "",
				selectedFiles: null
			// 	  "PDF":[],
			//   "row_header": [],
			//   "row_header_match":'match',
			//   "row_header_min_score":10,
			//   "col_header":[],
			//   "col_header_match":'exact_match',
			//   "col_header_min_score":-1,
			//   "deduplicate":"yes",
			//   "elastic_indx": "10k",
			})
		
		const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
			setSelectedData({...selectedData,"selectedFiles":event.currentTarget.files})
		};

		const changeStartPageHandler = (event: React.FormEvent<HTMLInputElement>) => {
			setSelectedData({...selectedData,"startPage": getCurrentValue(event.currentTarget.value)})
		};
	
		const changeEndPageHandler = (event: React.FormEvent<HTMLInputElement>) => {
			setSelectedData({...selectedData,"endPage": getCurrentValue(event.currentTarget.value)})
		};

		const clearPageRange = () => {
			setSelectedData({...selectedData,"startPage": ""})
			setSelectedData({...selectedData,"endPage": ""})
		}
	
		const uploadFilesManual = () => {
			if (checkProceed()) {
				if (selectedData.selectedFiles != null && selectedData.selectedFiles?.length >0)
					HandleFiles(selectedData.selectedFiles, selectedData.startPage, selectedData.endPage);
					clearPageRange();
			}
		}

		const pageRangeValid = () => {
			const startPage = selectedData.startPage;
			const endPage = selectedData.endPage;
	
			var isValid = true;
	
			if (startPage === "" && endPage !== "") {
				isValid = false;
			}
			else if (startPage !== "" && endPage === "") {
				isValid = false;
			}
			else if (startPage === 0) {
				isValid = false;
			}
			else if (endPage === 0) {
				isValid = false;
			}
			else if (startPage !== "" && endPage !== "" && startPage > endPage) {
				isValid = false;
			}
			return isValid;
		}
	
		const pageRangeNotEntered = () => {
			return selectedData.startPage === "" || selectedData.endPage === "";
		}
	
		const checkProceed = () => {
			var proceed = false;
		
			if (!pageRangeValid()) {
				alert('Please enter a valid page range')
			}
			else if (UploadConfig.queryIfPageRangeBlank && pageRangeNotEntered()) {
				// or page range invalid
		
				var msg = "No page range has been selected. Do you wish to proceed?";
				// TODO Use the 
				proceed = window.confirm(msg);
			}
			else {
				proceed = true;
			}
			return proceed;
		};

		const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
			preventDefaults(event);
			unhighlight(event.currentTarget)
				
			if (checkProceed()) {
				let dt = event.dataTransfer;
				if (dt != null)
				{
					let files = dt.files;
					HandleFiles(files, selectedData.startPage, selectedData.endPage);
					clearPageRange();
				}
			}
		}

		const getCurrentValue  = (value: string) => {
			const startPageValue: number | "" = value == "" ? "" : Number.parseInt(value);
			return startPageValue;
		};
		
		const handleDragEnterOrOver = (event: React.DragEvent<HTMLDivElement>) => {
			preventDefaults(event);
			highlight(event.currentTarget)
		}
		
		
		const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
			preventDefaults(event);
			unhighlight(event.currentTarget)
		}
		
		const preventDefaults = (event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			event.stopPropagation()
		}
		
		const highlight = (element: HTMLDivElement) => {
			element.classList.add('zr-highlight');
		};
			
		const unhighlight = (element: HTMLDivElement) => {
			element.classList.remove('zr-highlight');
		}
		
		const HandleFiles = (files: FileList, startPage: number | "",
		endPage: number | "") => {
		
			// TODO Get underlying start and end page here
					//var startPage = getTbValue('txtStartPage');
					//var endPage = getTbValue('txtEndPage');
		
			const startPageFinalVal : number | null = startPage == "" ? null : startPage;
			const endPageFinalVal: number | null = endPage == "" ? null : endPage;
		
			const filesWithProcesses: FileWithProcess[] = [];
		
			for (let i = 0; i < files.length; i++) {
				const fileToUpload = files[i];
		
				var newDocProc: DocStatusClientside = createNewUploadingDocProcess(fileToUpload.name, startPageFinalVal, endPageFinalVal);

				dispatch(AddOrUpdateProcessesById([newDocProc]));
		
				var fileWithProcess =
				{
					file: files[i],
					process: newDocProc
				};
				filesWithProcesses.push(fileWithProcess);
		
			}
		
			//this.saveProcesses();
			// TODO The below should be superflous CHECK THAT IT IS
			//checkIfNeedPeriodicCheckForStatusOnServer();
			filesWithProcesses.forEach(
				(fileWithProcess) =>
				{
					const uploadParams : uploadParams =
					{
						fileToUpload: fileWithProcess.file, 
						startPage: startPageFinalVal,
						endPage: endPageFinalVal, 
						newDocProc: fileWithProcess.process
					}
		
					dispatch(uploadDocuments(uploadParams));
				}
				//Doc(this.props.uploadPageConfig.uploadUrl, fileWithProcess.file, startPage, endPage, fileWithProcess.process, this.props.docStatusManager)
			);
		}
		//        var uh = uploadHelper();
 //       const { handleClick } = useUploadHelper();
  
        //const ub = new uploadBackend();
        var returnVal =(
            <>
        <div id="zr-drop-zone" 
            onDragOver={handleDragEnterOrOver}
			onDragEnter={handleDragEnterOrOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            >
            <div className="zr-block">
						<p>Select file(s): <input type="file" id="myfile" className="required" multiple onChange={changeHandler} /></p>
            </div>
            {UploadConfig.allowPageAnalyseRange == "true" &&
            <div className="zr-block">
                <p>
                    Select page range to process <span className="zr-comment">(optional, usually only applies when single file selected)</span>:
                    </p>
						<p className="zr-control-row">Page
						<input id="txtStartPage" type="number" min="0" value={selectedData.startPage} onChange={changeStartPageHandler} max="1000" /> to <input id="txtEndPage" type="number" min="0" max="1000" onChange={changeEndPageHandler} value={selectedData.endPage} /></p>
            </div>
            }
            <p className="zr-end-of-block zr-instructions">Or drag and drop files onto this panel</p>
        </div>
        <p className="zr-upload-ctrls">
			<button id="zr-upload" type="button" className="btn btn-primary" onClick={uploadFilesManual} >Upload and Process</button>
        </p>

        </>
        )

        return returnVal;
}

	// manualUploadFiles: FileList | null = null ;


            /*

// TODO: Wire up the events below

const minPageValue = 1;
const maxPageValue = 999;

function startPageChanged()
{
	var startPageInit = getTbValue('txtStartPage');
	var endPageInit = getTbValue('txtEndPage');

	var startPage = startPageInit;
	var endPage = endPageInit;

	if (startPage == null) {
		endPage = null;
	}
	else {
		if (startPage != null) {
			if (startPage < minPageValue) {
				startPage = minPageValue;
			}
			if (startPage > maxPageValue) {
				startPage = maxPageValue;
			}
			if (endPage == null || startPage > endPage) {
				endPage = startPage;
			}
		}
	}

	if (startPage != startPageInit) {
		$('#txtStartPage').val(startPage.toString());
	}

	if (endPage != endPageInit) {
		$('#txtEndPage').val(endPage.toString());
    }
}

function endPageChanged() {
	var startPageInit = getTbValue('txtStartPage');
	var endPageInit = getTbValue('txtEndPage');

	var startPage = startPageInit;
	var endPage = endPageInit;

	if (endPage == null) {
		startPage = null;
	}
	else {
		if (endPage != null) {
			if (endPage < minPageValue) {
				endPage = minPageValue;
			}
			if (endPage > maxPageValue) {
				endPage = maxPageValue;
			}
			if (startPage == null || endPage < startPage) {
				startPage = endPage;
			}
		}
    }

	if (startPage != startPageInit) {
		$('#txtStartPage').val(startPage.toString());
	}

	if (endPage != endPageInit) {
		$('#txtEndPage').val(endPage.toString());
	}
}

TODO Wire up the button for clearNonActiveStatuses

TODO Make the code below use the remove function on Up


function clearNonActiveStatuses() {
	var processesToRemove = [];

	$(_fileProcesses).each(
		function (idx, process) {
			if (!processIsActive(process)) {
				var procWithIdx = { process: process, idx: idx };
				processesToRemove.push(procWithIdx);
			}
		}
	);

	for (i = processesToRemove.length - 1; i >= 0; i--) {
		var crntProcWithIdx = processesToRemove[i];

		$("#" + crntProcWithIdx.process.ClientsideId).remove();
		_fileProcesses.splice(crntProcWithIdx.idx, 1);
	}
}


function processIsActive(process) {
	var procIsActive = process.Status == rsltVals.RetrievingStatus ||
		process.Status == rsltVals.Uploading ||
		process.Status == rsltVals.InQueue ||
		process.Status == rsltVals.Processing ||
		process.Status == rsltVals.Ingesting;

	return procIsActive;
}


function handleDrop(e) {

	if (checkProceed()) {
		let dt = e.dataTransfer;
		let files = dt.files;
		handleFiles(files);
    }
}

function checkProceed() {

	var proceed = false;

	if (!pageRangeValid())
	{
		alert('Please enter a valid page range')
    }
	else if (_showConfirmDialogIfRangeBlank && pageRangeNotEntered()) {
		// or page range invalid

		var msg = "No page range has been selected. Do you wish to proceed?";
		proceed = confirm(msg);
	}
	else {
		proceed = true;
	}
	return proceed;
}

function pageRangeValid() {
	var startPage = getTbValue('txtStartPage');
	var endPage = getTbValue('txtEndPage');

	var isValid = true;

	if (startPage == null && endPage != null) {
		isValid = false;
	}
	else if (startPage != null && endPage == null) {
		isValid = false;
	}
	else if (startPage == 0) {
		isValid = false;
	}
	else if (endPage == 0) {
		isValid = false;
	}
	else if (startPage != null && endPage != null && startPage > endPage) {
		isValid = false;
	}
	return isValid;
}

function pageRangeNotEntered() {
	return getTbValue('txtStartPage') == null || getTbValue('txtEndPage') == null;
}

function handleFiles(files) {
	var startPage = getTbValue('txtStartPage');
	var endPage = getTbValue('txtEndPage');

	var filesWithProcesses = [];

	$.each(files, function (idx, fileToUpload) {
		var newDocProc = createNewUploadingDocProcess(fileToUpload.name, startPage, endPage);

		var fileWithProcess =
		{
			File: fileToUpload,
			Process: newDocProc
		};
		filesWithProcesses.push(fileWithProcess);
	});
	saveProcesses();
	checkIfNeedPeriodicCheckForStatusOnServer();
	filesWithProcesses.forEach(
		function (fileWithProcess) {
			uploadFile(fileWithProcess.File, startPage, endPage, fileWithProcess.Process);
		}
	);
}

function findInArray(arrayObj, testFn) {
	var rtrnItem = null;
	$(arrayObj).each(
		function (idx, item) {
			if (testFn(item)) {
				rtrnItem = item;
				return false;
			}
		}
	);
	return rtrnItem;
}

function findIdxInArray(arrayObj, testFn) {
	var rtrnIdx = -1;

	for (idx = 0; idx < arrayObj.length; idx++) {
		if (testFn(arrayObj[idx])) {
			rtrnIdx = idx;
			break;
		}
	}
	return rtrnIdx;
}


function uploadFilesManual() {
	if (checkProceed()) {
		var filesToUpload = $('#myfile')[0].files;
		handleFiles(filesToUpload);
	}
}

function uploadFile(fileToUpload, startPage, endPage, newDocProc) {

	var formData = new FormData();
	formData.append('file', fileToUpload); // myFile is the input type="file" control

	formData.append('startPage', startPage); // myFile is the input type="file" control
	formData.append('endPage', endPage); // myFile is the input type="file" control

	var ajax = new XMLHttpRequest();

	ajax.upload.addEventListener("progress",
		function (rslt) {
			progressHandler(newDocProc, rslt);
		}, false);
	ajax.addEventListener("load",
		function (rslt) {
			completeHandler(newDocProc, rslt);
		}, false);
	ajax.addEventListener("error",
		function (rslt) {
			errorHandler(newDocProc, rslt);
		}
		, false);
	ajax.addEventListener("abort", abortHandler, false);

	ajax.open("POST", _uploadUrl);
	ajax.send(formData);
}

function createNewUploadingDocProcess(filename, startPage, endPage) {
	var newDocProcess = new Object();
	//_lastClientsideId++;
	newDocProcess.ClientsideId = generateUid("-");
	newDocProcess.ClientsideDocname = filename;
	newDocProcess.StartPage = startPage;
	newDocProcess.EndPage = endPage;
	newDocProcess.ServersideDocname = "";
	newDocProcess.Status = rsltVals.Uploading;
	newDocProcess.PercProcessed = 0;
	newDocProcess.ProgressMessage = "";
	newDocProcess.TotalPageCount = 0;
	newDocProcess.PagesProcessed = 0;
	newDocProcess.PercProcessed = 0;
	newDocProcess.ProgressMessage = "";
	newDocProcess.DateTime = Date.now();

	buildAndAppendDisplay(newDocProcess);

	checkRemovePrevious(newDocProcess);

	_fileProcesses.push(newDocProcess);

	saveProcesses();
	return newDocProcess;
}

function generateUid(separator) {
	/// <summary>
	///    Creates a unique id for identification purposes.
	/// </summary>
	/// <param name="separator" type="String" optional="true">
	/// The optional separator for grouping the generated segmants: default "-".
	/// </param>

	var delim = separator || "-";

	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
}

function checkRemovePrevious(newDocProcess) {

	var sameDocnameFunc = function(el)
	{
		return el.ClientsideDocname == newDocProcess.ClientsideDocname &&
			el.ClientsideDocname.StartPage == newDocProcess.StartPage &&
			el.ClientsideDocname.EndPage == newDocProcess.EndPage;
	}

	var idx = findIdxInArray(_fileProcesses, sameDocnameFunc);

	while (idx != -1)
	{
		var crntProc = _fileProcesses[idx];
		$("#" + crntProc.ClientsideId).remove();

		_fileProcesses.splice(idx, 1);
		idx = findIdxInArray(_fileProcesses, sameDocnameFunc);
	}
}

// TODO Find index of next
// TODO


function getShortFilename(fullPath) {
	var filename = fullPath.replace(/^.*[\\\/]/, '');
	return filename;
}

function progressHandler(newDocProc, event) {
	var percent = (event.loaded / event.total) * 100;

	newDocProc.PercProcessed = percent;
	newDocProc.ProgressMessage = "Uploaded " + addCommas(event.loaded.toString()) + " bytes of " + addCommas(event.total.toString());
	setDisplay(newDocProc);
}

function completeHandler(newProcDoc, rslt) {

	if (newProcDoc.Status == rsltVals.Uploading) {
		var filename = stripEndQuotes(rslt.currentTarget.response);
		newProcDoc.Status = rsltVals.InQueue;
		newProcDoc.ServersideDocname = filename;

		setDisplay(newProcDoc);
	}

	saveProcesses();
	checkIfNeedPeriodicCheckForStatusOnServer();
}

function errorHandler(newProcDoc, rslt) {
	newProcDoc.Status = rsltVals.ErrorUploading;
	newProcDoc.ServersideDocname = filename;
}

function abortHandler(event) {
	newProcDoc.Status = rsltVals.UploadAborted;
	newProcDoc.ServersideDocname = filename;
}

function stripEndQuotes(s) {
	var t = s.length;
	if (s.charAt(0) == '"') s = s.substring(1, t--);
	if (s.charAt(--t) == '"') s = s.substring(0, t);
	return s;
}

function getTbValue(tbId)
{
	var idstring = '#' + tbId;

	if ($(idstring).length)
	{
		var startPageTextBox = $(idstring)[0].value;
		if (startPageTextBox === "")
		{
			return null;
		}
		else
		{
			return parseInt(startPageTextBox);
		}
	}
	else
	{
		return null;
	}
}

             */




    
export default UploadZone;
