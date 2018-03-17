import { StatusEnum } from '../model/constants'
import { reasonableTime } from '../helper/timeouts'
import { mooaLog } from '../helper/app.helper'

export async function toMountPromise(app: any) {
  if (app.status !== StatusEnum.NOT_MOUNTED) {
    return app
  }

  try {
    mooaLog('Mounting application', app.name, app.status)
    await reasonableTime(
      app.mount(),
      `Mounting application '${app.name}'`,
      app.timeouts.mount
    )
    app.status = StatusEnum.MOUNTED
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN
    throw new Error(err)
  }

  return app
}
