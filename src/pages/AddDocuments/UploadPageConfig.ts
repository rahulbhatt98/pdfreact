export type UploadPageConfig = {
    uploadSave: string;
    uploadUrl: string;
    getStatusesUrl: string;
    queryIfPageRangeBlank: string;
    suppressGetStatusErrorMessage: string;
    allowPageAnalyseRange: string;
    emailActive: string;
    ShowOtherUsersDocStatuses: string,
    ShowNamesOfOtherDocs: string
  
}

export const UploadConfig = {
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
    ShowNamesOfOtherDocs: "false"
} as UploadPageConfig;
