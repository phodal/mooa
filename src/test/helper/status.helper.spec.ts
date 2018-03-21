import StatusHelper from '../../helper/status.helper'
import { StatusEnum } from '../../model/constants'

test('should be able to find app name', () => {
  let activeApps = StatusHelper.getActiveApps([
    {
      status: StatusEnum.SKIP_BECAUSE_BROKEN
    },
    {
      status: StatusEnum.MOUNTED
    }
  ])
  expect(activeApps).toEqual([{ status: 'MOUNTED' }])
})

test('should be able to find app name', () => {
  let activeApps = StatusHelper.getAppsToMount([
    {
      status: StatusEnum.MOUNTED
    },
    {
      status: StatusEnum.SKIP_BECAUSE_BROKEN
    },
    {
      status: StatusEnum.NOT_LOADED
    },
    {
      status: StatusEnum.LOADING_SOURCE_CODE
    },
    {
      status: StatusEnum.NOT_MOUNTED,
      activeWhen: (parms: any) => {
        return true
      }
    }
  ])
  expect(activeApps[0].status).toEqual('NOT_MOUNTED')
})
