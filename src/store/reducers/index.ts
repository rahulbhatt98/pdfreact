import { combineReducers } from "redux";
import { userSlice } from "./userSlice"
import { docSlice } from "./docSlice"
import AddDocumentsSlice from "./AddDocumentsSlice"
import { docSetSlice } from "pages/Extract/ExtractDocumentSlice"
import { downloadDocSlice,fetchExtentionSlice } from "pages/Extract/ExtractDocumentSlice";
import { DisplayDataSlice } from "pages/Extract/DisplayDataSlice";
import { getTableSetsSlice } from "pages/ManageDocuments/getTableSetsSlice"
import   ExtractSlice  from './ExtractSlice'
import ExtractImageSlice from "./ExtractImageSlice";
import ExtractPageSlice from "./ExtractPageSlice";
import { GetPageSetSlice } from "./GetPageSetSlice";
import { GetImageSetSlice } from "./GetImageSetSlice";
import {getSearchData, getPdfData, getCoordinateData} from "../../pages/search/SearchSlice";
import { datapointSlice } from "./Datapoints.Slice"
import ExtractDocumentSlice from "./ExtractDocumentSlice"
import { GetHeadersSlice } from "./GetHeadersSlice";
import userInfoSlice from "./userInfoSlice";

const rootReducer = combineReducers({
    searchData: getSearchData.reducer,
    pdfData: getPdfData.reducer,
    coordinateData: getCoordinateData.reducer,
    user: userSlice.reducer,
    documents:docSlice.reducer,
    documentSet:docSetSlice.reducer,
    downloadDoc:downloadDocSlice.reducer,
    display:DisplayDataSlice.reducer,
    fetchExtentionData:fetchExtentionSlice.reducer,
    tableSets:getTableSetsSlice.reducer,
    GetPageSets: GetPageSetSlice.reducer,
    GetImageSets:GetImageSetSlice.reducer,
    ExtractDocument:ExtractDocumentSlice,
    Extract: ExtractSlice,
    ExtractPage :ExtractPageSlice,
    AddDocuments: AddDocumentsSlice,
    ExtractImage: ExtractImageSlice,
    datapoints:datapointSlice.reducer,
    GetHeaders:GetHeadersSlice.reducer,
    userInfo:userInfoSlice,

})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer