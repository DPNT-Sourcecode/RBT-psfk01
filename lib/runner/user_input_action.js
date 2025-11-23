import Promise from "promise";
import readline from "node:readline";

const readFromConsole = function () {
  return new Promise(function (resolve) {
    var consoleIn = readline.createInterface({
      input: process.stdin,
    });
    consoleIn.question("", function (answer) {
      resolve(answer);
      consoleIn.close();
      process.stdin.destroy();
    });
  });
};

function UserInputAction(args) {
  this._args = args;
}

UserInputAction.prototype.get = function () {
  var self = this;

  return self._args.length > 0
    ? Promise.resolve(self._args[0])
    : readFromConsole();
};

export default UserInputAction;
