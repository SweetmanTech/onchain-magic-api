import { Logger } from "tslog"

const logger = new Logger()
logger.settings.hideLogPositionForProduction = true
logger.settings.stylePrettyLogs = true

const getLogger = (name: string, type: "json" | "pretty" | "hidden" = "pretty") =>
  logger.getSubLogger({ name, type })

export default getLogger
