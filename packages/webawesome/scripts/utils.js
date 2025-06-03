import childProcess from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Helpful directories
// These are all functions because process.env can sometimes get evaluated in a weird order, so this lazy evals.
export const getRootDir = () => process.env.ROOT_DIR || dirname(__dirname);
export const getDistDir = () => process.env.DIST_DIR || join(getRootDir(), 'dist');
export const getCdnDir = () => process.env.CDN_DIR || join(getRootDir(), 'dist-cdn');
export const getDocsDir = () => process.env.DOCS_DIR || join(getRootDir(), 'docs');
export const getSiteDir = () => process.env.SITE_DIR || join(getRootDir(), '_site');
export const getEleventyConfigPath = () => process.env.ELEVENTY_CONFIG_PATH || join(getDocsDir(), '.eleventy.js');

/**
 * Runs a script and returns a promise that resolves with the content of stdout when the script exits or rejects with
 * the content of stderr when the script exits with an error.
 */
export function runScript(scriptPath, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = childProcess.fork(scriptPath, args, { silent: true, ...options });
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
