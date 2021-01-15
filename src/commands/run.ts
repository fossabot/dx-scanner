/* eslint-disable no-process-env */
import cli from 'cli-ux';
import { sync as commandExistsSync } from 'command-exists';
import 'reflect-metadata';
import { debugLog } from '../detectors/utils';
import { createRootContainer } from '../inversify.config';
import { ErrorFactory } from '../lib/errors/ErrorFactory';
import { logfile } from '../lib/logfile';
import { CLIArgs } from '../model';
import { Scanner, ScannerUtils } from '../scanner';

export default class Run {
  static async run(path = process.cwd(), cmd: CLIArgs): Promise<void> {
    if (!commandExistsSync('git')) {
      const msg =
        "'git' command dependency not installed. See https://git-scm.com/book/en/v2/Getting-Started-Installing-Git for installation instructions";
      cli.warn(msg);
      logfile.log('warning: ' + msg);
      return;
    }
    logfile.getSecrets(cmd.authorization, cmd.apiToken);
    debugLog('cli')(cmd);
    const scanPath = path;

    const { json, details, fail } = cmd;
    let { authorization } = cmd;
    const { apiToken, apiUrl } = cmd;

    const hrstart = process.hrtime();

    cli.action.start(`Scanning URI: ${scanPath}`);

    const container = createRootContainer({
      uri: scanPath,
      auth: authorization,
      json,
      details,
      fail,
      recursive: cmd.recursive,
      ci: cmd.ci,
      fix: cmd.fix,
      fixPattern: cmd.fixPattern,
      html: cmd.html,
      apiToken,
      apiUrl,
    });
    const scanner = container.get(Scanner);

    let scanResult = await scanner.scan();

    // needsAuth and cmd.ci are both true if the credentials are invalid either due to 401 or 403
    if (scanResult.needsAuth && cmd.ci) {
      throw ErrorFactory.newAuthorizationError('Invalid Authorization Credentials!');
    }

    if (scanResult.needsAuth && !cmd.ci) {
      if (scanResult.isOnline) {
        authorization = await ScannerUtils.promptAuthorization(scanPath, scanResult);
      }

      const container = createRootContainer({
        uri: scanPath,
        auth: authorization,
        json,
        details,
        fail,
        recursive: cmd.recursive,
        ci: cmd.ci,
        fix: cmd.fix,
        fixPattern: cmd.fixPattern,
        html: cmd.html,
        apiToken,
        apiUrl,
      });
      const scanner = container.get(Scanner);

      scanResult = await scanner.scan({ determineRemote: false });
    }
    cli.action.stop();

    const hrend = process.hrtime(hrstart);

    const msg = `Scan duration ${hrend[0]}s.`;
    logfile.log(msg);
    cli.log(msg);

    if (scanResult.shouldExitOnEnd) {
      process.exit(1);
    }
  }
}
