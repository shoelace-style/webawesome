// Notices use console.log: the docs build holds back console.warn unless the build fails.
const SUMMARY_LIMIT = 130;
const newestReleaseHeading = /^## (\d+\.\d+\.\d+)\s*$/m;
const summaryComment = /<!--\s*summary:\s*([\s\S]*?)\s*-->/;

function sectionUnder(markdown, version) {
  const heading = new RegExp(`^## ${version.replaceAll('.', '\\.')}[ \\t]*$`, 'm');
  const headingMatch = heading.exec(markdown);
  if (!headingMatch) return '';

  const rest = markdown.slice(headingMatch.index + headingMatch[0].length);
  const nextHeadingIndex = rest.search(/^## /m);
  return nextHeadingIndex === -1 ? rest : rest.slice(0, nextHeadingIndex);
}

function summaryUnder(markdown, version) {
  const summaryMatch = summaryComment.exec(sectionUnder(markdown, version));
  return summaryMatch ? summaryMatch[1] : null;
}

function findNewestRelease(markdown) {
  const version = newestReleaseHeading.exec(markdown)[1];
  const [major, minor, patch] = version.split('.');

  let summary = summaryUnder(markdown, version);
  if (!summary && patch !== '0') {
    summary = summaryUnder(markdown, `${major}.${minor}.0`);
  }

  return { version, summary };
}

function shortVersion(version) {
  const [major, minor, patch] = version.split('.');
  return patch === '0' ? `${major}.${minor}` : version;
}

// 11ty only unwraps `default` when it is the module's sole export, so nothing else is exported here.
export default {
  eleventyComputed: {
    description: data => {
      const { version, summary } = findNewestRelease(data.page.rawInput);

      if (!summary) {
        const [major, minor] = version.split('.');
        console.log(`[changelog] ${version} has no summary line; using the fallback description.`);
        return `What's new in Web Awesome ${major}.${minor}, plus every release before it.`;
      }

      if (summary.length > SUMMARY_LIMIT) {
        console.log(`[changelog] ${version} summary is ${summary.length} characters; keep it under ${SUMMARY_LIMIT}.`);
      }

      return summary;
    },
    ogTitle: data => `Version ${shortVersion(findNewestRelease(data.page.rawInput).version)}`,
  },
};
