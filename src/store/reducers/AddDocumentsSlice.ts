import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { act } from "react-dom/test-utils";
import { getDocumentStatuses, uploadDocuments } from "store/actions/addDocumentsDirect";
import { DocStatusClientside, DocStatusesRequest, DocStatusesResponse, DocStatusFromServer, DocStatusResponse, StatusValues } from "pages/AddDocuments/DocStatus";
import generateGuid from "utils/generateGuid";
import { UploadConfig } from "pages/AddDocuments/UploadPageConfig";
import { useDispatch } from "react-redux"
import { WritableDraft } from "immer/dist/internal";
import { getLocalRepository } from "pages/AddDocuments/LocalRepository";

interface AddDocumentState {
  	docStatusesCurrentUser: DocStatusClientside[];
  	docStatusesOtherUsers: DocStatusResponse[];
    isGettingDocStatuses: Boolean;
    isGettingDocStatusesErrored:Boolean;
    docStatusesRetrieved:Boolean;
    isUploadingDoc: Boolean;
    docIsUploaded: Boolean;
    isUploadingDocErrored: Boolean;
    startPage: number | "";
    endPage: number | "";
    selectedFiles: FileList | null;
    }

const initialState = {
  docStatusesCurrentUser: [],
  docStatusesOtherUsers: [],
  isGettingDocStatuses: false,
  isGettingDocStatusesErrored:false,
  docStatusesRetrieved:false,
  isUploadingDoc: false,
  docIsUploaded: false,
  isUploadingDocErrored: false,
	startPage: "",
	endPage: "",
	selectedFiles: null
} as AddDocumentState

const AddDocumentsSlice = createSlice({
  name: "addDocumentsSlice",
  initialState,
  reducers: {
    // Reducer comes here
    // TODO Add reducer here for signifying the state has changed
    AddOrUpdateProcessesById:(state, action: PayloadAction<DocStatusClientside[]>)=>{
      AddOrUpdateById(state, action.payload);
      // const newDocStatuses = [...state.docStatusesCurrentUser];
      // action.payload.forEach(
      //   (process, idx) => {
      //     AddOrUpdateById(state, process);
      //     const idxSearched = searchExistingProcessOnId(newDocStatuses, process)
  
      //     if (idxSearched == -1) {
      //       newDocStatuses.push(process);
      //     }
      //     else {
      //       newDocStatuses[idx] = process;
      //     }
      //   }
      // );
      // state.docStatusesCurrentUser = newDocStatuses;
      // saveProcesses(newDocStatuses);
    },


    ClearNonActiveStatuses: (state) => {

      var changesMade: boolean = false;
  
      const newDocStatuses = [...state.docStatusesCurrentUser];
      interface procWithIdx {
        process: DocStatusClientside;
        idx: number;
      }
  
      var processesToRemove: procWithIdx[] = [];
  
      newDocStatuses.forEach(
        function (process, idx) {
          if (!processIsActive(process)) {
            const procWithIdx: procWithIdx = { process: process, idx: idx };
            processesToRemove.push(procWithIdx);
          }
        }
      );
  
      for (var i: number = processesToRemove.length - 1; i >= 0; i--) {
        var crntProcWithIdx = processesToRemove[i];
        newDocStatuses.splice(crntProcWithIdx.idx, 1);
        changesMade = true;
      }
  
      if (changesMade)
      {
        state.docStatusesCurrentUser = newDocStatuses;
        saveProcesses(newDocStatuses);
        }
    }
  
    },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getDocumentStatuses.fulfilled, (state, action) => {
      state.isGettingDocStatuses = false;
      if (action.payload.status===200)
      {
        var docStatusResponse = <DocStatusesResponse> action.payload.data;
        //var data = action.payload.status===200?action.payload.data[];
        updateScreenStatuses(state, docStatusResponse);
  
        saveProcesses(state.docStatusesCurrentUser);
        //this.checkIfNeedPeriodicCheckForStatusOnServer();
    
        //  TODO Make synthesis of state here
      //     // Add user to the state array
          state.docStatusesRetrieved =  true;
          // state.isErrored = action.payload.status==400?true:false
          // TODO Put all the logic here for updating the stuff.
          // TODO Question: how do you trigger server call?
          //state.dataDoc = action.payload.status===200?action.payload.data:[]  
        }
        else
        {
          state.docStatusesRetrieved =  false;
        }
    });
    builder.addCase(getDocumentStatuses.pending, (state) => {
     
      state.docStatusesRetrieved  = false
      state.isGettingDocStatuses = true;
        // state.isErroredDoc = true;
        // state.isLoadingDoc = true;
    });
    builder.addCase(getDocumentStatuses.rejected,(state)=>{
      state.docStatusesRetrieved  = false;
      state.isGettingDocStatuses = false;
      state.isGettingDocStatusesErrored = true;
    });
    
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(uploadDocuments.fulfilled, (state, action) => {
    
      //     // Add user to the state array
        state.isUploadingDoc = false;

        if (action.payload.statusCode===200)
        {
          state.docIsUploaded = true;
          if (action.payload.newDocProc.Status == StatusValues.Uploading) {
            // Don't know if 
            //var filename = this.stripEndQuotes(event.response);
            action.payload.newDocProc.Status = StatusValues.InQueue;
            // Don't know if serverside docname ever gets used
            action.payload.newDocProc.ServersideDocname = action.payload.newDocProc.ServersideDocname;
      
            AddOrUpdateById(state, [action.payload.newDocProc]);
          }
        }
        else
        {
          if (action.payload.statusCode===200)
          {
            state.isUploadingDocErrored = true;
          }
          action.payload.newDocProc.Status = StatusValues.ErrorUploading;
          action.payload.newDocProc.ServersideDocname = action.payload.newDocProc.ClientsideDocname;
          AddOrUpdateById(state, [action.payload.newDocProc]);
        }
      });
      builder.addCase(uploadDocuments.pending, (state) => {
       
        state.docIsUploaded  = false
        state.isUploadingDoc = true;
        state.isUploadingDocErrored = true;
          // state.isErroredDoc = true;
          // state.isLoadingDoc = true;
      });
      builder.addCase(uploadDocuments.rejected,(state, action)=>{
          state.docIsUploaded  = false;
          state.isUploadingDoc = false;
          state.isUploadingDocErrored = false;
      });
}


})

const searchExistingProcessOnId = (docStatuses: DocStatusClientside[], docStatus: DocStatusClientside) => {
  // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate

  for (var i = 0; i < docStatuses.length; i++) {
    if (docStatuses[i].ClientsideId == docStatus.ClientsideId)
      return i;
  }
  return -1;
}

const ONE_DAY: number = 24 * 60 * 60 * 1000; /* ms */
const ONE_HOUR: number = 60 * 60 * 1000; /* ms */
const QUARTER_HOUR: number = 15 * 60 * 1000; /* ms */

const updateScreenStatuses = (state : AddDocumentState, docStatusResponse: DocStatusesResponse) => {

  // NOTE: This will need to be updated as we move the Api to version 2
  //let statusesFromServer: DocStatusFromServer[] = <DocStatusFromServer[]> dataFromServer;
  var docStatusesCurrentUserChanged = false;

  const newDocStatuses = [...state.docStatusesCurrentUser]

  if (docStatusResponse.DetectedDuplicatesClientsideIds)
  {
    docStatusResponse.DetectedDuplicatesClientsideIds.forEach((clientsideId : string) => {
      deleteByClientsideId(newDocStatuses, clientsideId);
      docStatusesCurrentUserChanged = true;
    }
    );
  }

  var crntProcess: DocStatusFromServer;

  docStatusResponse.RequestedStatuses.forEach(
    // TODO Change to arrow syntax?
     (statusFromServer) => {
      // TODO Clone the array here
      const crntProcess = findInArray<DocStatusClientside>(newDocStatuses, function (statusClientside: DocStatusClientside) {
        return statusClientside.ClientsideId == statusFromServer.ClientsideId;
      });

      if (crntProcess) {
        if (crntProcess.Status == StatusValues.Uploading && statusFromServer.Status == StatusValues.Absent) {
          var timeElapsed = new Date().getTime() - crntProcess.DateTime.getTime();
          if (timeElapsed > ONE_HOUR) {
            crntProcess.Status = StatusValues.ErrorUploading;
          }
          else {
            crntProcess.Status = statusFromServer.Status;
          }
        }
        else {
          crntProcess.Status = statusFromServer.Status;
        }
        crntProcess.TotalPageCount = statusFromServer.TotalPageCount;
        crntProcess.PagesProcessed = statusFromServer.PagesProcessed;
        crntProcess.PercProcessed = statusFromServer.PercProcessed;
        crntProcess.PositionInQueue = statusFromServer.PositionInQueue;
        crntProcess.ProgressMessage = statusFromServer.ProgressMessage;
        docStatusesCurrentUserChanged = true;
      };
    }
  );
  
  docStatusResponse.UnrequestedStatuses.forEach(
    (docState) => 
    {
      var newDocProcess : DocStatusClientside =  {
        ClientsideId : generateGuid("-"),
        ClientsideDocname : docState.DocName,
        StartPage : docState.StartPage,
        EndPage : docState.EndPage,
        ServersideDocname : "",
        Status : docState.Status,
        ProgressMessage : docState.ProgressMessage,
        TotalPageCount : docState.TotalPageCount,
        PagesProcessed : docState.PagesProcessed,
        PercProcessed : docState.PercProcessed,
        PositionInQueue : docState.PositionInQueue,
        DateTime : new Date(),
        }
        newDocStatuses.push(newDocProcess);
      //_lastClientsideId++;
      docStatusesCurrentUserChanged = true;
    }
  )
  if (docStatusesCurrentUserChanged) {
    state.docStatusesCurrentUser = newDocStatuses;
  }

  var otherUsersChanged = false;

  if (UploadConfig.ShowOtherUsersDocStatuses == "true")
  {
    state.docStatusesOtherUsers = docStatusResponse.OtherUserStatuses;
    otherUsersChanged = true;
  }

  if (docStatusesCurrentUserChanged && otherUsersChanged) {
    saveProcesses(state.docStatusesCurrentUser);
    // this.notify();
  }

  // docStatusResponse.OtherUserStatuses.forEach(
  // 	(docState) => 
  // 	{
  // 		refreshNeeded : true;
  // 		var newDocProcess : DocStatusClientside =  {
  // 			ClientsideId : generateGuid("-"),
  // 			ClientsideDocname : docState.DocName,
  // 			StartPage : docState.StartPage,
  // 			EndPage : docState.EndPage,
  // 			ServersideDocname : "",
  // 			Status : docState.Status,
  // 			ProgressMessage : docState.ProgressMessage,
  // 			TotalPageCount : docState.totalPageCount,
  // 			PagesProcessed : docState.pagesProcessed,
  // 			PercProcessed : docState.PercProcessed,
  // 			PositionInQueue : docState.PositionInQueue,
  // 			DateTime : new Date(),
  // 			}
  // 			newDocStatuses.push(newDocProcess);
  // 		//_lastClientsideId++;

  // 	}
  // )
}	

const processIsActive = (process: DocStatusClientside) =>{
  var procIsActive = process.Status == StatusValues.RetrievingStatus ||
    process.Status == StatusValues.Uploading ||
    process.Status == StatusValues.Uploaded ||
    process.Status == StatusValues.PreQueue ||
    process.Status == StatusValues.InQueue ||
    process.Status == StatusValues.Processing ||
    process.Status == StatusValues.BuildingOpFiles ||
    process.Status == StatusValues.Ingesting;

  return procIsActive;
}

const findInArray = <T1>(arrayObj: Array<T1>, testFn: (a:T1) => boolean) : T1 | null => {
  var rtrnItem = null;
  arrayObj.forEach(
    function (item, idx) {
      if (testFn(item)) {
        rtrnItem = item;
        return false;
      }
    }
  );
  return rtrnItem;
}


const deleteByClientsideId = (newDocStatuses: DocStatusClientside[], clientsideId: string) => {

  for (var i = 0; i < newDocStatuses.length; i++) {

    if (newDocStatuses[i].ClientsideId === clientsideId) {
      newDocStatuses.splice(i, 1);
    }
  }
}

const saveProcesses = (statuses : DocStatusClientside[]) => {
//  var processesInSaveFormatString = JSON.stringify(statuses);
//  const key = getProcessKey();
//  localStorage.setItem(key, processesInSaveFormatString);
	const userid = localStorage.getItem("userId");

	if (userid)
	{
		const localRepository = getLocalRepository(userid as string);
    localRepository.SetStatuses(statuses);
  }
}

const getProcessKey = () => {
  const userId : string = localStorage.getItem("user")??"anon";
  const processKey = userId + "_zanran_local_storage";
  return processKey;
}

const AddOrUpdateById = (state :  WritableDraft<AddDocumentState>, statusesToUpdate: DocStatusClientside[])=>{
  const newDocStatuses = [...state.docStatusesCurrentUser];
  statusesToUpdate.forEach(
    (process, idx) => {
      const idxSearched = searchExistingProcessOnId(newDocStatuses, process)

      if (idxSearched == -1) {
        newDocStatuses.push(process);
      }
      else {
        newDocStatuses[idx] = process;
      }
    }
  );
  state.docStatusesCurrentUser = newDocStatuses;
  saveProcesses(newDocStatuses);
}




export const { AddOrUpdateProcessesById, ClearNonActiveStatuses } = AddDocumentsSlice.actions
export default AddDocumentsSlice.reducer;