module.exports = {
  default: {
    require: [
      "steps/**/*.ts",
      "hooks/**/*.ts",
      "fixtures/**/*.ts"
    ],
    requireModule: ["ts-node/register"]
  }
};