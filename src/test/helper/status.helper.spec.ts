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

test('should able to get app to unmount', () => {
  let activeApps = StatusHelper.getAppsToUnmount([
    {
      status: StatusEnum.MOUNTED,
      activeWhen: (parms: any) => {
        return true
      }
    },
    {
      status: StatusEnum.NOT_MOUNTED,
      activeWhen: (parms: any) => {
        return true
      }
    },
    {
      status: StatusEnum.MOUNTED,
      activeWhen: (parms: any) => {
        return false
      }
    }
  ])
  expect(activeApps[0].status).toEqual('MOUNTED')
})

test('should unable to get app to unload', () => {
  let activeApps = StatusHelper.getAppsToUnload()
  expect(activeApps).toEqual([])
})

test('should unable to get app to unload info', () => {
  let info = StatusHelper.getAppUnloadInfo('test')
  expect(info).toEqual(undefined)
})

test('should able get apps to load ', () => {
  let activeApps = StatusHelper.getAppsToLoad([
    {
      status: StatusEnum.LOADING_SOURCE_CODE,
      activeWhen: (parms: any) => {
        return true
      }
    }
  ])
  expect(activeApps[0].status).toEqual('LOADING_SOURCE_CODE')
})
