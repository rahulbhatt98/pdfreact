import { IDocRepository } from "./IDocRepository";
import { DocStatusesRequest } from "./DocStatus";
import { UploadPageConfig } from "./UploadPageConfig";

export function getDocRepository(config : UploadPageConfig) : IDocRepository
{
    let Config = config;
    
    var getStatusesFromRepository  = (statusesRequest: DocStatusesRequest, 
        onSuccessFn: (a: any) => void) => {

        var statusReqJson = JSON.stringify(statusesRequest);
    
        var url = Config.getStatusesUrl;
    
        var requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: statusReqJson
        };
    
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "/json-handler";
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json"); // ;charset=UTF-8
    
    
        xmlhttp.onload = (data) => {
            onSuccessFn(data);
        };
    
        xmlhttp.onerror = (rslt) => {
            throw "Error retrieving states from server";
        };
        xmlhttp.send(statusReqJson);
    
        return getStatusesFromRepository;
    }

    let docRepository : IDocRepository = 
        { getCallStatusesFn : 
            getStatusesFromRepository };
    
    
    return docRepository;
}

export function getDocRepositoryUsingFetch(config : UploadPageConfig) : IDocRepository
{
    let Config = config;
    
    var getStatusesFromRepository  = (statusesRequest: DocStatusesRequest, 
        onSuccessFn: (a: any) => void) => {

        var statusReqJson = JSON.stringify(statusesRequest);
    
        var url = Config.getStatusesUrl;
    
        var requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: statusReqJson
        };
    
        fetch(url, requestMetadata)
        	.then(res => res.json()).then(data => {
        		onSuccessFn(data);
        	}
        ).catch(function (error) {
            throw "Error retrieving results from server";
        	});
        return getStatusesFromRepository;
    
    }
    let docRepository : IDocRepository = 
        { getCallStatusesFn : 
            getStatusesFromRepository };
    
    
    return docRepository;
}

