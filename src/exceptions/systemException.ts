export interface ISystemException {
  message: string | Event;
  getErrorProps(): object;
  getStringifyErrorProps(): string;
}

interface IAdditionalProps {
  url?: string;
  lineNo?: number;
  columnNo?: number;
}

export class SystemException implements ISystemException {
  message: string | Event;
  protected error: Error;
  protected additionalProps: IAdditionalProps;
  protected platform: string;
  protected userAgent: string;
  protected location: Location;
  protected dateTime: Date;

  /**
   * @param message To human readable error message
   * @param error The error object
   */
  constructor(message: string | Event, error?: Error, additionalProps?: IAdditionalProps) {
    this.message = message;
    this.error = error;
    this.additionalProps = additionalProps;

    this.init();
  }

  getErrorProps(): object {
    const errorProps = {};
    Object.getOwnPropertyNames(this).forEach((item) => {
      errorProps[item] = this[item];
    });
    return errorProps;
  }

  getStringifyErrorProps(): string {
    return JSON.stringify(this);
  }

  private init(): void {
    this.getEnvironmentInfo();
    this.getDateTime();

    this.consoleLogging();
    this.getErrorProps();
    this.getStringifyErrorProps();
  }

  private getEnvironmentInfo(): void {
    this.platform = navigator.platform;
    this.userAgent = navigator.userAgent;
    this.location = window.location;
  }

  private getDateTime(): void {
    this.dateTime = new Date();
  }

  private consoleLogging(): void {
    if (
      !!console &&
      typeof console.log === 'function' &&
      typeof console.error === 'function' &&
      typeof console.group === 'function'
    ) {
      console.group(`Error: ${this.message}`);
      console.error(this.message);
      if (this.error) {
        console.log('Error: ', this.error);
      }
      console.groupEnd();
    }
  }
}
