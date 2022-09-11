import { IDocRepository } from "./IDocRepository";
import { DocStatusesRequest, DocStatusesResponse, DocStatusFromServer, DocStatusResponse, RequestedDocStateResponse, SpecUserDocStateResponse, StatusValues } from "./DocStatus";
import { UploadPageConfig } from "./UploadPageConfig";

export function getTestDocRepository(config : UploadPageConfig) : IDocRepository
{
    let Config = config;
    
    var getStatusesFromRepository  = (statusesRequest: DocStatusesRequest, 
        onSuccessFn: (a: any) => void) => {

        // NOTE: This will need to be updated as the responses are changed
        let statusesFromServer: RequestedDocStateResponse[] = [];

        const newsample1 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-prcsng.pdf",
                Status: StatusValues.Processing,
                TotalPageCount: 25,
                PagesProcessed: 5,
                PercProcessed: 20,
                PositionInQueue: 0,
                ProgressMessage: "5 of 25 pages processed"
            }
         
            const newsample2 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-prcsd-ing-not-strtd.pdf",
                Status: StatusValues.Ingesting,
                TotalPageCount: 0,
                PagesProcessed: 25,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "0 of 25 pages processed"
            }
            const newsample3 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-prcsd-ing-not-strtd.pdf",
                Status: StatusValues.Ingesting,
                TotalPageCount: 8,
                PagesProcessed: 12,
                PercProcessed: 0,
                ProgressMessage: "",
                PositionInQueue: 0,
            }
            const newsample4 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-in-q.pdf",
                Status: StatusValues.InQueue,
                // NOTE: Need to add page count
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: ""
            }
            const newsample6 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-pre-q.pdf",
                Status: StatusValues.InQueue, // TODO Make this prequeue
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                ProgressMessage: "",
                PositionInQueue: 0
            }
            const newsample7 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-bldg-op-fls.pdf",
                Status: StatusValues.Processing, // TODO Put in building OP files
                TotalPageCount: 20,
                PagesProcessed: 20,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: ""
            }
            const newsample8 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-prcsd-ngstd.pdf",
                Status: StatusValues.Processed,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: ""
            }
            const newsample9 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-Prcsd-ngstng.pdf",
                Status: StatusValues.Ingesting,
                TotalPageCount: 25,
                PagesProcessed: 5,
                PercProcessed: 20,
                PositionInQueue: 0,
                ProgressMessage: "5 of 25 pages processed"
            }
            const newsample11 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-bldg-op-fls.pdf", // TODO Add this back
                Status: StatusValues.Processing,
                TotalPageCount: 20,
                PagesProcessed: 20,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: ""
            }
            const newsample12 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-in-q.pdf",
                Status: StatusValues.InQueue,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 5,
                ProgressMessage: ""
            }
            const newsample13 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf-Prcsd-ngstng.pdf",
                Status: StatusValues.Ingesting,
                TotalPageCount: 20,
                PagesProcessed: 8,
                PercProcessed: 40,
                PositionInQueue: 0,
                ProgressMessage: "8 of 20 pages processed"
           }
            const newsample14 : RequestedDocStateResponse
            = {
                ClientsideId: "Tf.pdf",
                Status: StatusValues.Uploading,
                PagesProcessed: 8,
                TotalPageCount: 12,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: ""
            }

        statusesFromServer.push(newsample1)
        statusesFromServer.push(newsample2)        
        statusesFromServer.push(newsample3)        
        statusesFromServer.push(newsample4)        
        statusesFromServer.push(newsample6)        
        statusesFromServer.push(newsample7)        
        statusesFromServer.push(newsample8)        
        statusesFromServer.push(newsample9)        
        statusesFromServer.push(newsample11)        
        statusesFromServer.push(newsample12)        
        statusesFromServer.push(newsample13)        
        statusesFromServer.push(newsample14)        

        let unrequestedStatuses : SpecUserDocStateResponse[] = [];

        let otherUserStatuses : DocStatusResponse[] = [];
    
        let detectedDuplicatesClientsideIds : string[] = [];

        var response : DocStatusesResponse = 
        {
            RequestedStatuses : statusesFromServer,
            UnrequestedStatuses : unrequestedStatuses,
            OtherUserStatuses : otherUserStatuses,
            DetectedDuplicatesClientsideIds : detectedDuplicatesClientsideIds
        }

        onSuccessFn(response);
    
        return getStatusesFromRepository;
    }
    let docRepository : IDocRepository = 
        { getCallStatusesFn : 
            getStatusesFromRepository };
    
    return docRepository;
}

