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
      console.log(etree.getroot());
      console.log("---------------");

      let arduino = {};
      let components = [];
      let relations = [];
      let methods = [];
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
          console.log(line);
          if (line.includes("digitalPorts")) {
            digitalPorts = line.replace(/[^\d.]/g, "");
            console.log("------found", digitalPorts);
          } else if (line.includes("analogPorts")) {
            analogPorts = line.replace(/[^\d.]/g, "");
            console.log("------found", analogPorts);
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
        console.log("at", attributes);
        console.log("name", name);

        if (type == "method") {
          methods.push((methodText, group, coordinates));
        }

        if (type == "Arduino") {
          arduino.name = name;
          arduino.model = model;
          arduino.digitalPorts = digitalPorts;
          arduino.analogPorts = analogPorts;
          arduino.coordinates = coordinates;
          arduino.group = group;
        } else if (type == "relation") {
          let additional = element._children[3].text;
          relations.push({ name, additional, coordinates });
        } else {
          console.log("adding component, ", name);
          components.push({
            name,
            model,
            digitalPorts,
            analogPorts,
            lib,
            coordinates,
            group,
          });
        }

        console.log("--------------------------------------ended element");
      });
      this.code = file;

      console.log("relations", relations);
      console.log("methods", methods);
      console.log("arduino", arduino);
      console.log("components", components);
    },
  },

  mounted() {
    console.log("----------------------------------------");

    this.readUXF();
    // let arduino = {};

    // this.code += ("// Code generated for Arduino ", );
    // p('// with ', totalDigitalPorts, ' digital ports in total with ',
    //   digitalPorts, ' in use and ', totalDigitalPorts-digitalPorts, ' free')
    // p('// and  ', totalAnalogPorts, ' analog ports in total')

    // this.code += "void setup(){\n\n}\n";
    // this.code += "void loop(){\n\n}\n";
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