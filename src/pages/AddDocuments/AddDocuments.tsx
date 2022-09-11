// SOURCE: https://stackoverflow.com/questions/61142978/make-a-react-component-rerender-when-data-class-property-change

import { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Container, Row, Col, Card, ProgressBar, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import ReactDom from "react-dom";
//import classes from "./upload.module.scss";
import {UploadPageConfig } from "./UploadPageConfig";
import uploadBackend from "./UploadBackend";
//import useUploadHelper from "pages/useUploadHelper";
import UploadZone from "./UploadZone";
//import DocDataStatusManager from "./DocStatusDataManager";
import {DocStatusClientside, DocStatusResponse, GetStatusDisplay, GetStatusDisplayOtherUser, DocStatusesRequest, StatusValues} from "./DocStatus";
import { MouseEventHandler } from "react";
// import {StatManDataFormat} from "./DocStatusDataManager";
import './upload.css';
import { getDocRepository } from "./DocRepository";
import { getLocalRepository } from "./LocalRepository";
import { getTestDocRepository } from "./TestDocRepository";
import { getTestLocalRepository } from "./TestLocalRepository";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import { getDocumentStatuses } from "store/actions/addDocuments";
import uploadRequestData from "./UploadReqestData";
import { AddOrUpdateProcessesById, ClearNonActiveStatuses } from "store/reducers/AddDocumentsSlice";
//mport gearImg from "assets/Gear-0.2s-200px.gif";
//import { config } from "App";

const config = getUploadPageConfig();

function getUploadPageConfig() : UploadPageConfig
{
    return { 
        uploadSave: "true",
        uploadUrl: "http://localhost:3000/upload_save/",
        getStatusesUrl : "http://localhost:3000/get_statuses_v2/",
        //getStatusesUrl : "http://localhost:3000/get_statuses/",
//        uploadUrl: "http://www.nosuchdomainadrianWhyte.com/upload_save/",
//        getStatusesUrl : "http://www.nosuchdomainadrianWhyte.com/get_statuses",
        queryIfPageRangeBlank: "true",
        suppressGetStatusErrorMessage: "true",
        allowPageAnalyseRange: "true",
        emailActive: "true",
		ShowOtherUsersDocStatuses: "true",
		ShowNamesOfOtherDocs: "false",
	  };
}

//= (config: uploadPageConfig) => 
export interface IProps {
    pageConfig: UploadPageConfig
  }

//const useInstance = (instance: DocDataStatusManager, fn: (data: StatManDataFormat) => any[]) => {

// TODO Put across a status getter here.
const docRepository = getTestDocRepository(config);
const localRepository = getTestLocalRepository("n1@dom.com");

//const instance = new DocDataStatusManager(config, docRepository, localRepository);

// const getDocStatuses = (data: StatManDataFormat) => data.docStatusesCurrentUser;
// const getDocStatusesOtherUsers = (data: StatManDataFormat) => data.docStatusesOtherUsers;



const DocStatuses = () => {
	const dispatch = useDispatch()
 	//const docStats = useInstance(instance, getDocStatuses);
	// TODO const docStatusDisplays = GetDocStatusDisplays(DocStatuses)

	// TODO GetStatusDisplay
	
	const { docStatusesCurrentUser } = useSelector((state: RootState) => state.AddDocuments)

	const { isGettingDocStatuses } = useSelector((state: RootState) => state.AddDocuments)

	const getStatusReq = () => {
		var docStatusRequests: uploadRequestData[] = [];
	
		docStatusesCurrentUser.forEach
			(
				function (item) {
					//if (item.Status != rsltVals.Uploading) {
					var DocStatusRequest =
					{
						ClientsideId: item.ClientsideId,
						ClientsideDocname: item.ClientsideDocname,
						StartPage: item.StartPage,
						EndPage: item.EndPage
					};
					docStatusRequests.push(DocStatusRequest);
					//}
				});
		return docStatusRequests;
	}
		
    useEffect(() => {
            const timer = setTimeout(() => {


//				if (!isGettingDocStatuses) {

					// setIsBlocked(true)
					// setisSavedInfo(true)
				const reqData = getStatusReq();
				
               dispatch(getDocumentStatuses(reqData))
               // setIsBlocked(false)

                // dispatch(extractCleanDocument())
                // setisSavedInfo(false)
                // setModalshow(false)
//			}
		}, 1000);
		return () => clearTimeout(timer);
    }, [isGettingDocStatuses])
	
	return <div id="zr-statuses-current-user" className="zr-statuses-container">
		{docStatusesCurrentUser.map(function (docStatus: DocStatusClientside, index: number)
			{
				const statusDisp = GetStatusDisplay(docStatus);

				var progBarClassNames = "zr-progress-bar"

				if (statusDisp.ShowProgressBar == true && statusDisp.ProgressBarClassName != "")
				{
					progBarClassNames += " " + statusDisp.ProgressBarClassName;
				}

				var statusClassNames = "zr-progress-bar";

				return <div id={docStatus.ClientsideId} className="zr-doc-processing">
					<div className={'zr-status ' + statusDisp.CssStyle}>
						<span className="zr-docname">{statusDisp.DocDisplayName}: </span>
						<span className="zr-status-desc">{statusDisp.Message}</span>
						{statusDisp.ShowProcessingGraphic ?
						<span className="zr-processing-graphic"></span>
						: null}
						<div>
							{statusDisp.ShowProgressBar ? <div className="zr-progress">
								<div className={progBarClassNames} style={{width: statusDisp.PercProcessedText}}></div>
								<div className="zr-progress-text">{statusDisp.ProgressMessage}</div>
								</div>
								: null}
						</div>
					</div>
				</div>;
			})
		}
    </div>
};

const DocStatusesOtherUsers = () => {
	//const docStats = useInstance(instance, getDocStatusesOtherUsers);
	const { docStatusesOtherUsers } = useSelector((state: RootState) => state.AddDocuments)

	// TODO const docStatusDisplays = GetDocStatusDisplays(DocStatuses)

	// TODO GetStatusDisplay
	
	return 	<div id="zr-statuses-current-user" className="zr-statuses-container">

		{(docStatusesOtherUsers.length > 0) &&
	        <h3 id="other-users-docs-hdg">Other Users' documents</h3>
		}	
		{docStatusesOtherUsers.map(function (docStatus: DocStatusResponse, index: number)
			{
				const statusDisp = GetStatusDisplayOtherUser(docStatus);

				var progBarClassNames = "zr-progress-bar"

				if (statusDisp.ShowProgressBar == true && statusDisp.ProgressBarClassName != "")
				{
					progBarClassNames += " " + statusDisp.ProgressBarClassName;
				}

				var statusClassNames = "zr-progress-bar";

				return <div className="zr-doc-processing">
					<div className={'zr-status ' + statusDisp.CssStyle}>
						<span className="zr-docname">{statusDisp.DocDisplayName}: </span>
						<span className="zr-status-desc">{statusDisp.Message}</span>
						{statusDisp.ShowProcessingGraphic ?
						<span className="zr-processing-graphic"></span>
						: null}
						<div>
							{statusDisp.ShowProgressBar ? <div className="zr-progress">
								<div className={progBarClassNames} style={{width: statusDisp.PercProcessedText}}></div>
								<div className="zr-progress-text">{statusDisp.ProgressMessage}</div>
								</div>
								: null}
						</div>
					</div>
				</div>;
			})
		}
    </div>
};

const AddDocuments = (props:any) => {
	//const docStats = useInstance(instance, getDocStatuses);
	const { docStatusesOtherUsers, docStatusesCurrentUser } = useSelector((state: RootState) => state.AddDocuments)
	const dispatch = useDispatch();

	const OnClearClicked = () => {
		dispatch(ClearNonActiveStatuses());
	}

    useEffect(() => {

	const userid = localStorage.getItem("userId");

	if (userid)
	{
		const localRepository = getLocalRepository(userid as string);
		var localStatuses = localRepository.TryGetStatuses();

		if (localStatuses)
		{
			dispatch(AddOrUpdateProcessesById(localStatuses));
		}
	}
    }, [])

	const anyInactivePresent = () => {

		var inactivePresent = false;
		for (var i = 0; i < docStatusesCurrentUser.length; i++) {
			if (!processIsActive(docStatusesCurrentUser[i]))
			{
				inactivePresent = true;
				break;
			}
		}
		return inactivePresent;
	}

	function processIsActive(process : DocStatusClientside) {
		var procIsActive = process.Status == StatusValues.RetrievingStatus ||
			process.Status == StatusValues.Uploading ||
			process.Status == StatusValues.Uploaded ||
			process.Status == StatusValues.PreQueue ||
			process.Status == StatusValues.InQueue ||
			process.Status == StatusValues.Processing ||
			process.Status == StatusValues.Ingesting;
	
		return procIsActive;
	}
	
	const ub = new uploadBackend();



    // const uploadZoneProps: UploadGeneralProps =
    // {
    //     docStatusManager: instance,
    //     uploadPageConfig: config
    // }

    var returnVal =(
        <>

    <section className="main-content p-4">
        <div className="main-content-top align-items-center d-flex justify-content-between mb-2">
        <h3>ADD DOCUMENTS</h3>
		</div>
<Row>
    <UploadZone></UploadZone>
            <div id="zr-statuses-container">
                    <DocStatuses/>
					{config.ShowOtherUsersDocStatuses == "true" &&
                    <DocStatusesOtherUsers/>
			}
            </div>
            <div id="zr-statuses-control-bar">
                <button id="zr-statuses-clear-btn" className="btn btn-outline-secondary btn-sm"  
				hidden={docStatusesCurrentUser.length == 0} 
				disabled={ !anyInactivePresent() } onClick={OnClearClicked}>Clear old</button>
            </div>
			</Row>
	{config.emailActive == "true" &&
		    <Row>
				<p id="wait-notice" style={{ display: "none" }}>
					{/* <span>
						Processing takes a while
					</span> */}
					<span>We'll email you when your .znr is ready.</span>
				</p>

	{/* <span>You should receive an email notification when the processing has finished and the
    resulting Znr file is available to download.</span> */}
		    </Row>
    }
    </section>
    </>
    )

    return returnVal;
}

export default AddDocuments;