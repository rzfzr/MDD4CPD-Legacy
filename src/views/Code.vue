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
const fs = require("fs");

const et = require("elementtree");

import { rootPath } from "electron-root-path";
import path from "path";

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
    code: "",
    arduino: {
      methods: [],
    },
    components: [],
    relations: [],
    methods: [],
  }),
  components: {
    PrismEditor,
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages.clike); //returns html
    },

    readUXF() {
      let diagramFile = path.resolve(
        rootPath,
        "../../../src/diagrams/test.uxf"
      );
      let file = fs.readFileSync(diagramFile, "utf8");
      let etree = et.parse(file);
      // console.log(etree.getroot());
      // console.log("---------------");

      etree.findall("element").forEach((element) => {
        let coordinates = {};
        // console.log(element._children, element._children[1]._children);
        coordinates["x"] = element._children[1]._children[0].text;
        coordinates["y"] = element._children[1]._children[1].text;
        coordinates["w"] = element._children[1]._children[2].text;
        coordinates["h"] = element._children[1]._children[3].text;
        let attributes = element._children[2].text.split(/\r\n|\r|\n/);
        let digitalPorts = 0;
        let analogPorts = 0;
        let methodText = "none";
        let group = 0;
        let lib = "none";
        let model = "none";
        let type = "none";
        attributes.forEach((line) => {
          // console.log(line);
          if (line.includes("digitalPorts")) {
            digitalPorts = line.replace(/[^\d.]/g, "");
          } else if (line.includes("analogPorts")) {
            analogPorts = line.replace(/[^\d.]/g, "");
          } else if (line.includes("group")) {
            group = line.replace(/[^\d.]/g, "");
          } else if (line.includes(")")) {
            methodText = line;
          } else if (line.includes("lib")) {
            lib = line.replace("lib", "").replace(" ", "").replace("=", "");
          } else if (line.includes("model")) {
            model = lib = line
              .replace("model", "")
              .replace(" ", "")
              .replace("=", "");
          } else if (line.includes("Arduino")) {
            type = "Arduino";
          } else if (line.includes("method")) {
            type = "method";
          } else if (line.includes("relation")) {
            type = "relation";
          }
        });
        let name = attributes[0].replace("//", "");

        if (type == "method") {
          this.methods.push({ methodText, group, coordinates });
        }

        if (type == "Arduino") {
          this.arduino.name = name;
          this.arduino.model = model;
          this.arduino.digitalPorts = digitalPorts;
          this.arduino.analogPorts = analogPorts;
          this.arduino.coordinates = coordinates;
          this.arduino.group = group;
        } else if (type == "relation") {
          let additional = element._children[3].text;
          this.relations.push({ name, additional, coordinates });
        } else {
          this.components.push({
            name,
            model,
            digitalPorts,
            analogPorts,
            lib,
            coordinates,
            group,
            methods: [],
          });
        }

        console.log("--------------------------------------ended element");
      });
      this.code = file;
    },
    addMethodsToComponents() {
      this.methods.forEach((method) => {
        this.components.forEach((component) => {
          console.log(method.group, component.group);

          if (parseInt(method.group) == parseInt(component.group)) {
            method.parentName = component.name;
            component.methods.push(method);
          }
          if (method.group == this.arduino.group) {
            method.parentName = this.arduino.name;
            this.arduino.methods.push(method);
          }
        });
      });
    },
  },

  mounted() {
    console.log("----------------------------------------");

    this.readUXF();
    this.addMethodsToComponents();
    console.log(this.methods);
    console.log(this.components);
    // this.addInfoToRelations();
    // this.printAll();
    // this.generateCode();
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