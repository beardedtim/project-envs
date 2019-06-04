# Project Envs

## Usage

```javascript
const { writeEnvs, formatEnvs, createEnvs } = require("@mck-p/project-envs");

/* Given some object */
const data = {
  /*
      That can have meta keys
      or other data that you need
      to write your envs. These
      do not get written to env,
      they are only here for meta/
      resolving data
  */
  other: {
    turtle: "face"
  },
  // This will create SERVICE_NAME: "RESOURCES_SERVICE"
  SERVICE_NAME: "RESOURCES_SERVICE",
  // This will create SERVICE_FULL_NAME: "face:RESOURCES_SERVICE::FULL"
  SERVICE_FULL_NAME: "${other::turtle}:${SERVICE_NAME}::FULL"
};

const formattedEnvs = formatEnvs(createEnvs(data));
/* 
    ["SERVICE_NAME=RESOURCES_SERVICE", "SERVICE_FULL_NAME=face:RESOURCE_SERVICE::FULL"]
*/

writeEnvs(formattedEnvs, __dirname + "/.env").then(() => {
  /*
    .env written as

      SERVICE_NAME=RESOURCES_SERVICE
      SERVICE_FULL_NAME=face:RESROUCE_SERVICE::FULL

  */
});
```
