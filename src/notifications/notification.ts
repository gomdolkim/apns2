import { Priority } from "./constants/priority.js"
import { PushType } from "./constants/push-type.js"

export { PushType, Priority }

export interface NotificationOptions {
  type?: PushType
  alert?: string | { title: string; subtitle?: string; body: string }
  badge?: number
  expiration?: number | Date
  sound?: string | CriticalAlertSoundPayload
  category?: string
  data?: Record<string, unknown>
  contentAvailable?: boolean
  priority?: Priority
  topic?: string
  collapseId?: string
  threadId?: string
  aps?: Record<string, unknown>
  mutableContent?: boolean
}

export interface ApnsPayload {
  aps: Record<string, unknown>
  [key: string]: unknown
}

export interface CriticalAlertSoundPayload {
  critical: 0 | 1
  name?: string
  volume?: number
}

export class Notification {
  readonly deviceToken: string
  readonly options: NotificationOptions

  constructor(deviceToken: string, options?: NotificationOptions) {
    this.deviceToken = deviceToken
    this.options = options ?? {}
  }

  get pushType(): PushType {
    return this.options.type ?? PushType.alert
  }

  get priority(): Priority {
    return this.options.priority ?? Priority.immediate
  }

  buildApnsOptions() {
    return this.options;
  }
}
