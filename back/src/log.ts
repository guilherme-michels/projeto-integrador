import Log, { LogLevel } from '@wa/log';

class LogConfig {
  constructor() {
    Log.setLevel(LogLevel.TRACE, LogLevel.TRACE);
    Log.setObjectPrint(true);
    Log.setConsolePrint(false);
    Log.setPathPrint(false);
  }
}

export default LogConfig;
