export const enum MaaMsg {
  Invalid = 'Invalid',

  /*
    {
        id: number,
        path: [string, resource path]
    }
*/
  Resource_StartLoading = 'Resource.StartLoading',
  Resource_LoadingCompleted = 'Resource.LoadingCompleted',
  Resource_LoadingError = 'Resource.LoadingFailed',

  /*
    {
        uuid: string
    }
*/
  Controller_UUIDGot = 'Controller.UUIDGot',
  /* {} */
  Controller_UUIDGetFailed = 'Controller.UUIDGetFailed',

  /*
    {
        resolution: {
            width: number,
            height: number
        }
    }
*/
  Controller_ResolutionGot = 'Controller.ResolutionGot',
  /* {} */
  Controller_ResolutionGetFailed = 'Controller.ResolutionGetFailed',

  /* {} */
  Controller_ScreencapInited = 'Controller.ScreencapInited',
  Controller_ScreencapInitFailed = 'Controller.ScreencapInitFailed',
  Controller_TouchInputInited = 'Controller.TouchinputInited',
  Controller_TouchInputInitFailed = 'Controller.TouchinputInitFailed',

  /* {
        uuid: string,
        resolution: {
            width: number,
            height: number
        }
} */
  Controller_ConnectSuccess = 'Controller.ConnectSuccess',
  /* {
*      "why": string
} */
  Controller_ConnectFailed = 'Controller.ConnectFailed',

  /*
   * {
   *    id: number
   * }
   */
  Controller_Action_Started = 'Controller.Action.Started',
  Controller_Action_Completed = 'Controller.Action.Completed',
  Controller_Action_Failed = 'Controller.Action.Failed',
  // Controller_Action_Stopped = 'Controller.Action.Stopped',

  /*
    {
        id: number,
        uuid: [string, controller id],
        hash: [string, resource hash]
    }
*/
  Task_Started = 'Task.Started',
  Task_Completed = 'Task.Completed',
  Task_Failed = 'Task.Failed',
  Task_Stopped = 'Task.Stopped',

  /*
    {
        id: number,
        entry: string,
        name: string,
        uuid: string,
        hash: string,
        recognition: object,
        run_times: number,
        last_time: string,
        status: string
    }
*/
  Task_Focus_Hit = 'Task.Focus.Hit',
  Task_Focus_Runout = 'Task.Focus.Runout',
  Task_Focus_Completed = 'Task.Focus.Completed'
}
