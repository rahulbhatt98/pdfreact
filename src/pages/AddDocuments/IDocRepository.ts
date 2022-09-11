import { DocStatusesRequest } from "./DocStatus";

export interface IDocRepository {
    getCallStatusesFn: (
		statusesRequest: DocStatusesRequest,
		onSuccessFn: (a: any) => void
		) => void;

}
