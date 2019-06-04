const { createEnvs } = require("./");

describe("createEnvs", () => {
  it("returns an empty object if given an empty object", () => {
    expect(Object.keys(createEnvs({})).length).toBe(0);
  });

  it("formats the values correctly", () => {
    const data = {
      meta: {
        password: "123",
        username: "user"
      },
      DB_URL: "mongo://${meta::password}:${meta::username}/whatever"
    };

    const envs = createEnvs(data);

    expect(envs.DB_URL).toEqual("mongo://123:user/whatever");
  });

  it("does not return non string values", () => {
    const data = {
      meta: {
        complex: true
      }
    };

    const envs = createEnvs(data);
    expect(Object.keys(envs).length).toBe(0);
  });
});
