<template>
  <code> the source</code>
</template>

<script>
const fs = require("fs");
import { rootPath } from "electron-root-path";
import path from "path";

export default {
  name: "Home",

  components: {},

  mounted() {
    console.log("----------------------------------------");
    let diagramFile = path.resolve(rootPath, "../../../src/diagrams/test.uxf");

    let file = fs.readFileSync(diagramFile, "utf8");
    console.log(file);
  },
};
</script>
