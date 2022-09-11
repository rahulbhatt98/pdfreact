import { DocStatusClientside } from "./DocStatus";
import { ILocalRepository } from "./ILocalRepository";

export function getLocalRepository (userKey: string) : ILocalRepository {

    const _saveProcessDataKey : string  = userKey + "_zanran_local_storage";

    //(docStatuses: DocStatusClientside[]) => void
    /*
    SetStatuses : (docStatuses: DocStatusClientside[]) => void;
    TryGetStatuses : () => DocStatusClientside[] | false ;
    */
    const setStatuses = (docStatuses: DocStatusClientside[]) => 
    {
        var processesInSaveFormatString = JSON.stringify(docStatuses);
        localStorage.setItem(_saveProcessDataKey, processesInSaveFormatString);
    };

    const tryGetStatuses  = () : DocStatusClientside[] | false => 
    {
        const savedProcessesAsJson = localStorage.getItem(_saveProcessDataKey);

		if (savedProcessesAsJson) {
			try {
				const savedProcesses: DocStatusClientside[] = JSON.parse(savedProcessesAsJson);

                return savedProcesses;
			}
			catch (err) {
				return false;
			}
		}
		else {
            return false;
		}
    };


    let localRep : ILocalRepository = 
    {  
        SetStatuses : setStatuses,
        TryGetStatuses : tryGetStatuses 
    };

    return localRep;

}