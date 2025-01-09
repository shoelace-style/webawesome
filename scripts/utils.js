import childProcess from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Helpful directories
export const rootDir = dirname(__dirname);
export const distDir = join(rootDir, 'dist');
export const cdnDir = join(rootDir, 'dist-cdn');
export const docsDir = join(rootDir, 'docs');
export const siteDir = join(rootDir, '_site');

/**
 * Runs a script and returns a promise that resolves with the content of stdout when the script exits or rejects with
 * the content of stderr when the script exits with an error.
 */
export function runScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const child = childProcess.fork(scriptPath, args, { silent: true });
    let wasInvoked = false;
    let stderr = '';
    let stdout = '';

    child.on('error', err => {
      if (wasInvoked) {
        return;
      }

      wasInvoked = true;

      reject(err);
    });

    // Capture output
    child.stderr.on('data', data => (stderr += data));
    child.stdout.on('data', data => (stdout += data));

    // execute the callback once the process has finished running
    child.on('exit', code => {
      if (wasInvoked) {
        return;
      }

      wasInvoked = true;

      if (code === 0) {
        // The process exited normally
        resolve(stdout.trim());
      } else {
        // An error code was received
        reject(new Error(stderr));
      }

      child.unref();
    });
  });
}
