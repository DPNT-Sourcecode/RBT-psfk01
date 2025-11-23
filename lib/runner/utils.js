import * as TDL from "tdl-client-nodejs";
import {
  readFromConfigFile,
  readFromConfigFileWithDefault,
  isTrue,
} from "./credentials_config_file.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getConfig() {
  return TDL.ChallengeSessionConfig.forJourneyId(
    readFromConfigFile("tdl_journey_id"),
  )
    .withServerHostname(readFromConfigFile("tdl_hostname"))
    .withColours(
      isTrue(readFromConfigFileWithDefault("tdl_use_coloured_output", "true")),
    )
    .withRecordingSystemShouldBeOn(
      isTrue(readFromConfigFileWithDefault("tdl_require_rec", "true")),
    )
    .withWorkingDirectory(path.resolve(__dirname, "..", ".."));
}

export function getRunnerConfig() {
  return new TDL.ImplementationRunnerConfig()
    .setRequestQueueName(readFromConfigFile("tdl_request_queue_name"))
    .setResponseQueueName(readFromConfigFile("tdl_response_queue_name"))
    .setHostname(readFromConfigFile("tdl_hostname"));
}

export default {
  getConfig,
  getRunnerConfig,
};
