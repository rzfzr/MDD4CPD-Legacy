<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate color="primary" height="25"></v-progress-linear>

    <prism-editor
      class="my-editor"
      v-model="code"
      :highlight="highlighter"
      line-numbers
      style="min-height: 100vh"
    ></prism-editor>
    <br />
    <prism-editor class="my-editor" v-model="uxf" :highlight="highlighter" line-numbers></prism-editor>
  </div>
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
    uxf: "",
    arduino: {
      methods: [],
    },
    components: [],
    relations: [],
    methods: [],
    decisions: [],
    file: "",
    loading: true,
  }),
  components: {
    PrismEditor,
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages.clike); //returns html
    },

    readUXF() {
      let file = fs.readFileSync(this.file, "utf8");
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
            model = lib = line.replace("model", "").replace(" ", "").replace("=", "");
          } else if (line.includes("Arduino")) {
            type = "Arduino";
          } else if (line.includes("method")) {
            type = "method";
          } else if (line.includes("relation")) {
            type = "relation";
          } else if (line.includes("decision")) {
            type = "decision";
          } else if (line.includes("component")) {
            type = "component";
          }
        });
        let name = attributes[0].replace("//", "");

        if (type == "method") {
          this.methods.push({ methodText, group, coordinates, type });
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
          // } else if (type == "component") {
          this.components.push({
            name,
            model,
            digitalPorts,
            analogPorts,
            lib,
            coordinates,
            group,
            methods: [],
            type,
          });
        }
        // else if (type == "decision") {
        //   this.decisions.push({
        //     name,
        //     model,
        //     digitalPorts,
        //     analogPorts,
        //     lib,
        //     coordinates,
        //     group,
        //     methods: [],
        //     type,
        //   });
        // }

        this.uxf = file;
      });
    },
    addMethodsToComponents() {
      this.methods.forEach((method) => {
        this.components.forEach((component) => {
          if (parseInt(method.group) == parseInt(component.group)) {
            method.parentName = component.name;
            component.methods.push(method);
          }
        });
        if (method.group == this.arduino.group) {
          method.parentName = this.arduino.name;
          this.arduino.methods.push(method);
        }
      });
    },

    addInfoToRelations() {
      this.relations.forEach((relation) => {
        let additional = relation.additional.split(";");
        // console.log(additional);
        let xF = parseInt(additional[0]); //from and to
        let yF = parseInt(additional[1]);
        let xT = parseInt(additional[2]);
        let yT = parseInt(additional[3]);
        let w = parseInt(relation.coordinates["w"]);
        let h = parseInt(relation.coordinates["h"]);
        let x1 = parseInt(relation.coordinates["x"]) + xF;
        let y1 = parseInt(relation.coordinates["y"]) + yF;
        let x2 = parseInt(relation.coordinates["x"]) + w - (w - xT);
        let y2 = parseInt(relation.coordinates["y"]) + h - (h - yT);

        // console.log("trying to add", x1, y1, x2, y2, relation);
        this.addElementsToRelation(this.getElementAtPosition(x1, y1), this.getElementAtPosition(x2, y2), relation);
      });
    },

    addElementsToRelation(from, to, relation) {
      console.log("adding Elements to Relation:", from, to, relation);
      this.relations.forEach((child) => {
        if (child == relation) {
          from.parentName = to.name;
          child.fromElement = from;
          child.toElement = to;
        }
      });
    },

    getElementAtPosition(x, y) {
      let element = null;
      this.components.forEach((component) => {
        if (!element) element = checkBoundaries(x, y, component);
        this.methods.forEach((method) => {
          if (!element) element = checkBoundaries(x, y, method);
        });
      });
      if (!element) element = checkBoundaries(x, y, this.arduino);
      this.arduino.methods.forEach((method) => {
        if (!element) element = checkBoundaries(x, y, method);
      });
      console.log("Looking for element at position:", x, y, "founding element:", element);
      return element;

      function checkBoundaries(x, y, element) {
        let x1 = parseInt(element.coordinates["x"]);
        let y1 = parseInt(element.coordinates["y"]);
        let x2 = parseInt(x1) + parseInt(element.coordinates["w"]);
        let y2 = parseInt(y1) + parseInt(element.coordinates["h"]);
        const range = (min, max) => {
          const arr = Array(max - min + 1)
            .fill(0)
            .map((_, i) => i + min);
          return arr;
        };
        let horizontal = range(x1, x2 + 1);
        let vertical = range(y1, y2 + 1);
        if (horizontal.includes(x) && vertical.includes(y)) {
          // console.log("returning element at ", x, y, element);
          return element;
        }
      }
    },

    getToElements(method) {
      //method == element?
      let elements = [];
      this.relations.forEach((relation) => {
        if (relation.fromElement == method) {
          elements.push(relation.toElement);
        }
      });
      return elements;
    },

    generateCode() {
      let generateDecision = (element) => {
        console.log("GeneratingDecision for ", element.name, element);
        element.methods.forEach((method) => {
          p(method.methodText, "{\n");

          this.getToElements(method).forEach((toElement) => {
            console.log("getToElements:", method, toElement);

            let relation = this.relations.find((rel) => rel.toElement == toElement);

            console.log("method, ", method);
            console.log("toElement, ", toElement);
            console.log("relation, ", relation);
            if (toElement.name && (toElement.name.includes("if") || toElement.name.includes("while")) && relation) {
              const conditionText = toElement.name.includes("if") ? "if" : "while"; //todo add more

              // let value = toElement.methodText;

              let value = this.relations.find(
                (relation) => relation.fromElement.name == toElement.name && relation.name == "Value"
              ).toElement.methodText;

              console.log("---------------------------------------value: ", value);

              let ifTrues = this.relations.filter(
                (relation) => relation.fromElement.name == toElement.name && relation.name == "True"
              );

              let ifFalses = this.relations.filter(
                (relation) => relation.fromElement.name == toElement.name && relation.name == "False"
              );

              let condition = toElement.name.replace("if", "").replace("while", "").replace(" ", "");

              p(conditionText, " (", value, " ", condition, "){ \n");

              ifTrues.forEach((ifTrue) => {
                p(ifTrue.toElement.name || ifTrue.toElement.parentName, ";");
              });

              p("}");
              ifFalses.forEach((ifFalse) => {
                p("else {");
                p(ifFalse.toElement.name || ifFalse.toElement.parentName, ";");
              });

              p("}");
            } else {
              p(toElement.methodText, ";");
              p("\n}");
            }
          });
        });
      };

      let p = (...message) => {
        message.forEach((m) => {
          this.code += m;
        });
        this.code += "\n";
      };
      let usedDigital = 0;
      let usedAnalog = 0;
      let usedLibraries = [];

      this.components.forEach((component) => {
        usedDigital += parseInt(component.digitalPorts);
        usedAnalog += parseInt(component.analogPorts);
        console.log(component);

        if (component.type == "component") usedLibraries.push(component.name);
      });

      usedLibraries.forEach((lib) => {
        p("#include <" + lib + ".h>");
      });
      p("// Code generated for Arduino ", this.arduino.model);
      p(
        "// with ",
        this.arduino.digitalPorts,
        " digital ports in total with ",
        usedDigital,
        " in use and ",
        this.arduino.digitalPorts - usedDigital,
        " free"
      );
      p(
        "// and ",
        this.arduino.analogPorts,
        " analog ports in total with ",
        usedAnalog,
        " in use and ",
        this.arduino.analogPorts - usedAnalog,
        " free"
      );

      generateDecision(this.arduino);
    },

    formatCode() {
      let code = [];
      let level = 0;
      let tab = "    ";
      this.code.split("\n").forEach((line) => {
        if (line.includes("}")) {
          level--;
        }
        code.push(tab.repeat(level) + line);
        if (line.includes("{")) {
          level++;
        }
      });
      this.code = code.join("\n");
    },

    setup() {
      this.readUXF();
      this.addMethodsToComponents();
      this.addInfoToRelations();
      this.generateCode();
      this.formatCode();
      this.loading = false;

      console.log(this.components);
      console.log(this.arduino);
      console.log(this.methods);
      console.log(this.relations);
    },
    startWatching() {
      fs.watch(this.file, () => {
        console.log("File changed!");
        this.loading = true;
        this.components = [];
        this.arduino = {
          methods: [],
        };
        this.relations = [];
        this.methods = [];
        this.code = "";
        this.uxf = "";

        this.setup();
      });
    },
  },

  mounted() {
    console.log("mounted");
    this.file = path.resolve(rootPath, "../../../src/diagrams/test.uxf");
    this.setup();
    this.startWatching();
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