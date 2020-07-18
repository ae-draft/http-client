import { SystemException, ISystemException } from './systemException';

export interface IAjaxException extends ISystemException {
  serverErrorMsg: string | null;
}

export class AjaxException extends SystemException implements IAjaxException {
  serverErrorMsg: string | null;

  constructor(message: string, error?: Error, serverErrorMsg?: string) {
    super(message, error);

    this.serverErrorMsg = serverErrorMsg;
  }
}
