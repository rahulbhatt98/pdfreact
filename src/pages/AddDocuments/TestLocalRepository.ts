import { DocStatusClientside, StatusValues } from "./DocStatus";
import { ILocalRepository } from "./ILocalRepository";

export function getTestLocalRepository (userKey: string) : ILocalRepository {

    const _saveProcessDataKey : string  = userKey + "_zanran_local_storage";

    //(docStatuses: DocStatusClientside[]) => void
    /*
    SetStatuses : (docStatuses: DocStatusClientside[]) => void;
    TryGetStatuses : () => DocStatusClientside[] | false ;
    */
    const setStatuses = (docStatuses: DocStatusClientside[]) => 
    {
        // TODO Do nothing
        var processesInSaveFormatString = JSON.stringify(docStatuses);
        localStorage.setItem(_saveProcessDataKey, processesInSaveFormatString);
    };

    const tryGetStatuses  = () : DocStatusClientside[] | false => 
    {

        let savedStatuses: DocStatusClientside[] = [];

        const newsample1 : DocStatusClientside
            = {
                ClientsideId: "Tf-prcsng.pdf",
                ClientsideDocname: "Tf-prcsng.pdf",
                StartPage: null,
                EndPage: null,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 25,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "0 of 25 pages processed",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
        const newsample2 : DocStatusClientside
            = {
                ClientsideId: "Tf-prcsd-ing-not-strtd.pdf",
                ClientsideDocname: "Tf-prcsd-ing-not-strtd.pdf",
                StartPage: null,
                EndPage: null,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample3 : DocStatusClientside
            = {
                ClientsideId: "Tf-prcsd-ing-not-strtd.pdf",
                ClientsideDocname: "Tf-prcsd-ing-not-strtd.pdf",
                StartPage: 8,
                EndPage: 12,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample4 : DocStatusClientside
            = {
                ClientsideId: "Tf-in-q.pdf",
                ClientsideDocname: "Tf-in-q.pdf",
                StartPage: null,
                EndPage: null,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample6 : DocStatusClientside
            = {
                ClientsideId: "Tf-pre-q.pdf",
                ClientsideDocname: "Tf-pre-q.pdf",
                StartPage: null,
                EndPage: null,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample7 : DocStatusClientside
            = {
                ClientsideId: "Tf-bldg-op-fls.pdf",
                ClientsideDocname: "Tf-bldg-op-fls.pdf",
                StartPage: null,
                EndPage: null,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample8 : DocStatusClientside
            = {
                ClientsideId: "Tf-prcsd-ngstd.pdf",
                ClientsideDocname: "Tf-prcsd-ngstd.pdf",
                StartPage: null,
                EndPage: null,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample9 : DocStatusClientside
            = {
                ClientsideId: "Tf-Prcsd-ngstng.pdf",
                ClientsideDocname: "Tf-Prcsd-ngstng.pdf",
                StartPage: null,
                EndPage: null,
                ServersideDocname: "",
                Status: StatusValues.Ingesting,
                TotalPageCount: 25,
                PagesProcessed: 5,
                PercProcessed: 20,
                PositionInQueue: 0,
                ProgressMessage: "5 of 25 pages processed",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
                  
            const newsample11 : DocStatusClientside
            = {
                ClientsideId: "Tf-bldg-op-fls.pdf",
                ClientsideDocname: "Tf-bldg-op-fls.pdf",
                StartPage: 8,
                EndPage: 12,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample12 : DocStatusClientside
            = {
                ClientsideId: "Tf-in-q.pdf",
                ClientsideDocname: "Tf-in-q.pdf",
                StartPage: 8,
                EndPage: 12,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample13 : DocStatusClientside
            = {
                ClientsideId: "Tf-Prcsd-ngstng.pdf_8-12",
                ClientsideDocname: "Tf-Prcsd-ngstng.pdf_8-12",
                StartPage: 8,
                EndPage: 12,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
            const newsample14 : DocStatusClientside
            = {
                ClientsideId: "Tf.pdf",
                ClientsideDocname: "Tf.pdf",
                StartPage: 8,
                EndPage: 12,
                ServersideDocname: "",
                Status: StatusValues.Uploading,
                TotalPageCount: 0,
                PagesProcessed: 0,
                PercProcessed: 0,
                PositionInQueue: 0,
                ProgressMessage: "",
                DateTime: new Date('25 March 2022 00:00:00 GMT')
            }
         
        savedStatuses.push(newsample1)        
        savedStatuses.push(newsample2)        
        savedStatuses.push(newsample3)        
        savedStatuses.push(newsample4)        
        savedStatuses.push(newsample6)        
        savedStatuses.push(newsample7)        
        savedStatuses.push(newsample8)        
        savedStatuses.push(newsample9)        
        savedStatuses.push(newsample11)        
        savedStatuses.push(newsample12)        
        savedStatuses.push(newsample13)        
        savedStatuses.push(newsample14)        
        return savedStatuses;
    };


    let localRep : ILocalRepository = 
    {  
        SetStatuses : setStatuses,
        TryGetStatuses : tryGetStatuses 
    };

    return localRep;

}