import PropertiesReader from "properties-reader";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readRawValue(key) {
  var properties = readPropertiesFile();
  var value = properties.getRaw(key);
  if (value) {
    value = value.replace(/\\=/g, "=");
  }
  return value;
}

export function readFromConfigFile(key) {
  var value = readRawValue(key);
  if (value === null) {
    throw {
      name: "ConfigNotFoundException",
      message: 'The "credentials.config" file does not contain key ' + key,
    };
  }
  return value;
}

export function readFromConfigFileWithDefault(key, defaultValue) {
  var value = readRawValue(key);
  return value !== null ? value : defaultValue;
}

export function isTrue(value) {
  return value.toString() === "true";
}

//~~~~
function readPropertiesFile() {
  var pathToPropertiesFile = path.resolve(
    __dirname,
    "..",
    "..",
    "config",
    "credentials.config",
  );
  try {
    return PropertiesReader(pathToPropertiesFile);
  } catch (e) {
    throw {
      name: "ConfigNotFoundException",
      message:
        'The "credentials.config" has not been found. Please download from challenge page. (Reason: "' +
        e.message +
        '")',
    };
  }
}

export default {
  readFromConfigFile,
  readFromConfigFileWithDefault,
  isTrue,
};
