import generateGuid from "utils/generateGuid"
import DocStatusRequest from "./UploadReqestData";

export enum StatusValues
{
	Uploading = "uploading",
	ErrorUploading = "error-uploading",
	UploadAborted = "upload-aborted",
	Uploaded = "uploaded",
	PreQueue ="pre-queue",
	InQueue = "in-queue",
	ScaffolderNotRunning = "scaffolder-not-running",
	Processing = "processing",
	BuildingOpFiles = "building-op-files",
	Ingesting = "ingesting",
	Processed = "processed",
	Scanned = "scanned",
	ErrorProcessing = "error-processing",
	Absent = "absent",
	Problematic = "problematic",
	RetrievingStatus = "retrieving-status",
	IncorrectFiletype = "incorrect-filetype"
};

export interface DocStatusesRequest {
	user_id: string;
	DocStatusRequests : DocStatusRequest[];
}

export interface DocStatusRequest_v2
{
	ClientsideId: string,
	ClientsideDocname: string,
	StartPage: number | null,
	EndPage: number | null
	LastMeasuredStatus: string,
	DateTimeCreated: Date
}

export interface DocStatusesRequest_v2 {
	DocStatusRequests : DocStatusRequest[];
}

export interface DocStatusClientside {
	ClientsideId: string;
	ClientsideDocname: string;
	StartPage: number | null;
	EndPage: number | null;
	ServersideDocname: string;
	Status: string;
	TotalPageCount: number;
	PagesProcessed: number;
	PercProcessed: number;
    PositionInQueue: number;
	ProgressMessage: string;
	DateTime: Date;
}

export interface DocStatusNameAndPageRange{
	ClientsideDocname: string;
	StartPage: number | null;
	EndPage: number | null;
}

export interface DocStatusFromServer {
	ClientsideId: string;
	Status: StatusValues;
	TotalPageCount: number;
	PagesProcessed: number;
	PercProcessed: number;
	ProgressMessage: string;
	DateTime: Date;
}

export interface DocStatusesResponse {

	RequestedStatuses : RequestedDocStateResponse[],
	UnrequestedStatuses : SpecUserDocStateResponse[],
	OtherUserStatuses : DocStatusResponse[],
	DetectedDuplicatesClientsideIds : string[]
}

export interface RequestedDocStateResponse {
	ClientsideId : string,
	Status : string,
	TotalPageCount : number,
	PagesProcessed : number,
	PercProcessed : number,
	PositionInQueue : number,
	ProgressMessage : string
}

export interface SpecUserDocStateResponse {
    DocName: string;
    StartPage: number | null;
    EndPage: number | null;
    Status: string;
    TotalPageCount: number;
    PagesProcessed: number;
    PercProcessed: number;
    PositionInQueue: number;
    ProgressMessage: string;
}

export interface DocStatusResponse {
    User: string;
    IpAddress: string;
    DocName: string;
    StartPage: number | null;
    EndPage: number | null;
    Status: string;
    TotalPageCount: number;
    PagesProcessed: number;
    PercProcessed: number;
    ProgressMessage: string;
}

export interface DocStatusDisplay {
//	DocStatus: DocStatusClientside;
	DocDisplayName: string;
	Message: string;
	CssStyle: string;
	ShowWaitNotice: boolean;
	ShowProcessingGraphic: boolean;
	ProcessingGraphicSource: string;
	ShowProgressBar: boolean;
	PercProcessedText: string;
	ProgressMessage: string;
	ProgressBarClassName: string;
}

//newDocProcess.ClientsideId = generateUid("-");
//newDocProcess.ClientsideDocname = filename;
//newDocProcess.StartPage = startPage;
//newDocProcess.EndPage = endPage;
//newDocProcess.ServersideDocname = "";
//newDocProcess.Status = StatusValues.Uploading;
//newDocProcess.PercProcessed = 0;
//newDocProcess.ProgressMessage = "";
//newDocProcess.TotalPageCount = 0;
//newDocProcess.PagesProcessed = 0;
//newDocProcess.PercProcessed = 0;
//newDocProcess.ProgressMessage = "";
//newDocProcess.DateTime = Date.now();

export function createNewUploadingDocProcess(filename: string, startPage: number | null, endPage: number | null) {
	const newDocProcess: DocStatusClientside = {
		ClientsideId: generateGuid("-"),
		ClientsideDocname: filename,
		StartPage:startPage,
		EndPage: endPage,
		ServersideDocname: "",
		Status: StatusValues.Uploading,
		PercProcessed: 0,
		PositionInQueue: 0,
		ProgressMessage: "",
		TotalPageCount: 0,
		PagesProcessed: 0,
		DateTime: new Date(),
	}

	

	// TODO Add to process here

	// TODO Add upload
	// TODO Add 

	//buildAndAppendDisplay(newDocProcess);

	// TODO the below should be present in the DocStatusDataManager
	//checkRemovePrevious(newDocProcess);

	//_fileProcesses.push(newDocProcess);

	//saveProcesses();
	return newDocProcess;
}

export function GetStatusDisplay(docStatus: DocStatusClientside): DocStatusDisplay  {

	const displayName = getDisplayDocname(docStatus.ClientsideDocname, docStatus.StartPage, docStatus.EndPage);

	let docStatDisp: DocStatusDisplay =
	{
//		DocStatus: docStatus,
		DocDisplayName: displayName,
		Message: "",
		CssStyle: "",
		ShowWaitNotice: false,
		ShowProcessingGraphic: false,
		ProcessingGraphicSource: "",
		PercProcessedText: "0%",
		ShowProgressBar: false,
		ProgressMessage: docStatus.ProgressMessage,
		ProgressBarClassName: ""
	};

	// TODO Include GetDisplayDocName here

	switch (docStatus.Status)
	{
		case StatusValues.Uploading:
			docStatDisp.CssStyle = "zr-status-uploading";
			docStatDisp.Message = "Uploading";
			docStatDisp.ShowWaitNotice = true;
			docStatDisp.ShowProgressBar = true;
			docStatDisp.ProgressBarClassName = "processing";
			break;
		case StatusValues.Uploaded:
			docStatDisp.CssStyle = "zr-status-uploaded";
			docStatDisp.Message = "Uploaded";
			docStatDisp.ShowWaitNotice = true;
			docStatDisp.ShowProgressBar = false;
			break;
		case StatusValues.InQueue:
			docStatDisp.CssStyle = "zr-status-in-queue";
			docStatDisp.Message = "Waiting (position " + docStatus.PositionInQueue.toString() + " in the queue)";
			docStatDisp.ShowWaitNotice = true;
			break;
		case StatusValues.PreQueue:
			docStatDisp.CssStyle = "zr-status-pre-queue";
			docStatDisp.Message = "Waiting (to join queue)";
			docStatDisp.ShowWaitNotice = true;
			break;
		case StatusValues.BuildingOpFiles:
			docStatDisp.CssStyle = "zr-status-pre-queue";
			docStatDisp.Message = "Building output files";
			docStatDisp.ShowWaitNotice = true;
			break;
		case StatusValues.ErrorUploading:
			docStatDisp.CssStyle = "zr-status-error-uploading";
			docStatDisp.Message = "Error uploading";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.UploadAborted:
			docStatDisp.CssStyle = "zr-status-upload-aborted";
			docStatDisp.Message = "Upload aborted";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.ScaffolderNotRunning:
			docStatDisp.CssStyle = "zr-status-scaffolder-not-running";
			docStatDisp.Message = "Zanran Scaffolder application doesn't appear to be running. Please contact your system administrator.";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.Processing:
			docStatDisp.CssStyle = "zr-status-processing";
			docStatDisp.Message = "Extraction proceeding...";
			docStatDisp.ShowWaitNotice = true;
			docStatDisp.ShowProcessingGraphic = true;
			docStatDisp.ProcessingGraphicSource = "/images/Gear-0.2s-200px.gif";
			docStatDisp.ShowProgressBar = true;
			docStatDisp.PercProcessedText =  docStatus.PercProcessed.toString() + "%";
			docStatDisp.ProgressBarClassName = "processing";
			break;
		case StatusValues.Ingesting:
			docStatDisp.CssStyle = "zr-status-ingesting";
			docStatDisp.Message = "Results being recorded in database...";
			docStatDisp.ShowWaitNotice = true;
			docStatDisp.ShowProcessingGraphic = true;
			docStatDisp.ProcessingGraphicSource = "/images/Gear-0.2s-200px.gif";
			docStatDisp.ShowProgressBar = true;
			docStatDisp.PercProcessedText =  docStatus.PercProcessed.toString() + "%";
			docStatDisp.ProgressBarClassName = "ingesting";
			break;
		case StatusValues.Processed:
			docStatDisp.CssStyle = "zr-status-processed";
			docStatDisp.Message = "Document processed";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.ErrorProcessing:
			docStatDisp.CssStyle = "zr-status-error-processing";
			docStatDisp.Message = "Error processing document";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.Scanned:
			docStatDisp.CssStyle = "zr-status-scanned";
			docStatDisp.Message = "The document appears to be scanned - an image. This version of software can only process native PDFs. " +
				"Please contact your system administrator or Zanran for more details.";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.Absent:
			docStatDisp.CssStyle = "zr-status-absent";
			docStatDisp.Message = "Document appears to be absent";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.Problematic:
			docStatDisp.CssStyle = "zr-status-error-problematic";
			docStatDisp.Message = "This document is causing our software to fail and has been quarantined on the server";
			docStatDisp.ShowWaitNotice = false;
			break;
		case StatusValues.RetrievingStatus:
			docStatDisp.CssStyle = "zr-status-retrieving-status";
			docStatDisp.Message = "Retrieving status";
			docStatDisp.ProcessingGraphicSource = "/content/Gear-0.2s-200px.gif";
			break;
		case StatusValues.IncorrectFiletype:
			docStatDisp.CssStyle = "zr-status-incorrect-file-type";
			docStatDisp.Message = "Incorrect file type.";
			docStatDisp.ShowWaitNotice = false;
			break;
		default:
			docStatDisp.CssStyle = "zr-status-unknown";
			docStatDisp.Message = "Request for document status returned an unknown message. Please contact your system administrator.";
			docStatDisp.ShowWaitNotice = false;
	}

	return docStatDisp;
}

export function GetStatusDisplayOtherUser(docStatus: DocStatusResponse): DocStatusDisplay  {

	const displayName = getDisplayDocname(docStatus.DocName, docStatus.StartPage, docStatus.EndPage);

	let docStatDisp: DocStatusDisplay =
	{
//		DocStatus: docStatus,
		DocDisplayName: displayName,
		Message: "",
		CssStyle: "",
		ShowWaitNotice: false,
		ShowProcessingGraphic: false,
		ProcessingGraphicSource: "",
		PercProcessedText: docStatus.PercProcessed.toString() + "%",
		ShowProgressBar: false,
		ProgressMessage: docStatus.ProgressMessage,
		ProgressBarClassName: ""
	};

	// TODO Include GetDisplayDocName here

	switch (docStatus.Status)
	{
		case StatusValues.InQueue:
			docStatDisp.CssStyle = "zr-status-in-queue";
			docStatDisp.Message = "In queue";
			docStatDisp.ShowWaitNotice = true;
			break;
		case StatusValues.ErrorUploading:
			docStatDisp.CssStyle = "zr-status-pre-queue-unknown-user";
			docStatDisp.Message = "Waiting (to join queue)";
			docStatDisp.ShowWaitNotice = true;
			break;
		case StatusValues.BuildingOpFiles:
			docStatDisp.CssStyle = "zr-status-building-op-files-unknown-user";
			docStatDisp.Message = "Waiting (to join queue)";
			docStatDisp.ShowWaitNotice = true;
			break;
		case StatusValues.Processing:
			docStatDisp.CssStyle = "zr-status-processing-unknown-user";
			docStatDisp.Message = "Extraction proceeding...";
			docStatDisp.ShowWaitNotice = true;
			docStatDisp.ShowProcessingGraphic = true;
			docStatDisp.ProcessingGraphicSource = "/images/Gear-0.2s-200px.gif";
			docStatDisp.ShowProgressBar = true;
			docStatDisp.ProgressBarClassName = "processing";
			break;
		case StatusValues.Ingesting:
			docStatDisp.CssStyle = "zr-status-ingesting-unknown-user";
			docStatDisp.Message = "Results being recorded in database...";
			docStatDisp.ShowWaitNotice = true;
			docStatDisp.ShowProcessingGraphic = true;
			docStatDisp.ProcessingGraphicSource = "/images/Gear-0.2s-200px.gif";
			docStatDisp.ShowProgressBar = true;
			docStatDisp.ProgressBarClassName = "ingesting";
			break;
		default:
			docStatDisp.CssStyle = "zr-status-unknown-other-user";
			docStatDisp.Message = "Request for document status returned an unknown message. Please contact your system administrator.";
			docStatDisp.ShowWaitNotice = false;
	}

	return docStatDisp;
}

function getDisplayDocname(docname : string, startPage: number | null, endPage: number | null) {
	var dispName = docname;

	if (startPage != null && endPage != null) {
		if (startPage == endPage) {
			dispName += " (page " + startPage.toString() + ")";
		}
		else {
			dispName += " (page " + startPage.toString() + " to " + endPage.toString() + ")";
		}
	}

	return dispName;
}

//export interface DocStatusDisplay extends DocStatusFromServer {
//	ClientsideId: string;
//	Status: StatusValues;
//	TotalPageCount: number;
//	PagesProcessed: number;
//	PercProcessed: number;
//	ProgressMessage: string;
//	DateTime: Date;
//}
