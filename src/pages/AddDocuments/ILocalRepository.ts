import { DocStatusClientside } from "./DocStatus";

export interface ILocalRepository {

    SetStatuses : (docStatuses: DocStatusClientside[]) => void;
    TryGetStatuses : () => DocStatusClientside[] | false ;

		//localStorage.setItem(this._saveProcessDataKey, processesInSaveFormatString);

    // getCallStatusesFn: (
		// statusesRequest: DocStatusesRequest,
		// onSuccessFn: (a: any) => void
		// ) => void;
}
