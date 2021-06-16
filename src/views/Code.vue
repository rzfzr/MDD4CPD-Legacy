<template>
  <!-- <prism language="c-like">{{ code }}</prism> -->

  <prism-editor
    class="my-editor"
    v-model="code"
    :highlight="highlighter"
    line-numbers
  ></prism-editor>
</template>

<script>
// const fs = require("fs");
// import { rootPath } from "electron-root-path";
// import path from "path";

// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  name: "Home",

  data: () => ({
    code: 'console.log("Hello World")',
  }),
  components: {
    PrismEditor,
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
  },

  mounted() {
    console.log("----------------------------------------");
    // let diagramFile = path.resolve(rootPath, "../../../src/diagrams/test.uxf");
    // let file = fs.readFileSync(diagramFile, "utf8");
    // this.code = file;
    // console.log(file);
  },
};
</script>

<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style> 