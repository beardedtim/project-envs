const { promises } = require("fs");

const { writeFile } = promises;

const getPath = (path, data) =>
  path.split("::").reduce((a, c) => a && a[c], data);

const createEnvs = data => {
  const result = {};
  // For each key in this block
  for (const [key, value] of Object.entries(data)) {
    // we can only handle string values right now
    if (typeof value !== "string") {
      continue;
    }

    let currentValue = value;

    do {
      currentValue = currentValue.replace(/\$\{(.*?)\}/, match => {
        // We remove the `${` at the beginning and the
        // `}` at the end
        const value = match.slice(2, -1);

        // We try to get the value from
        return getPath(value, result) || getPath(value, data);
      });
    } while (/\$\{(.*?)\}/.test(currentValue));

    result[key] = currentValue;
  }

  return result;
};

const formatEnvs = envs =>
  Object.keys(envs).reduce((a, c) => a.concat(`${c}=${envs[c]}`), []);

const writeEnvs = (formatted, path = "./.env") =>
  writeFile(path, formatted.join("\n"));

module.exports = {
  createEnvs,
  formatEnvs,
  writeEnvs
};
