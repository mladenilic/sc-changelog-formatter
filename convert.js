const ucfirst = function (s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

module.exports = function (line) {
  let matches = line.match(/[##|###] (Unreleased):*/i);
  if (matches && matches.length > 1) {
    line = `## [${ucfirst(matches[1])}]`;
  }

  matches = line.match(/[##|###] (ADDED|CHANGED|DEPRECATED|REMOVED|FIXED|SECURITY):*/i);
  if (matches && matches.length > 1) {
    line = `### ${ucfirst(matches[1])}`;
  }

  matches = line.match(/[##|###] (\d{1,3}\.\d{1,3}\.\d{1,3}\S*) (?:-|—|–) (\d{4}\-\d{2}\-\d{2})/i);
  if (matches && matches.length > 2) {
    line = `## [${matches[1]}] - ${matches[2]}`;
  }

  return line;
}
