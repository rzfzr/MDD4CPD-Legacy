import paletteNodes from "../paletteNodes";

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import './go.css';  // contains .diagram-component CSS
import { Visibility } from "@material-ui/icons";

// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const myDiagram = $(go.Diagram,
        {
            "undoManager.isEnabled": true,
            layout: $(go.TreeLayout,
                { // this only lays out in trees nodes connected by "generalization" links
                    angle: 90,
                    path: go.TreeLayout.PathSource,  // links go from child to parent
                    setsPortSpot: false,  // keep Spot.AllSides for link connection spot
                    setsChildPortSpot: false,  // keep Spot.AllSides
                    // nodes not connected by "generalization" links are laid out horizontally
                    arrangement: go.TreeLayout.ArrangementHorizontal,


                })
        });

    // show visibility or access as a single character at the beginning of each property or method
    function convertVisibility(v: any) {
        switch (v) {
            case "public": return "+";
            case "private": return "-";
            case "protected": return "#";
            case "package": return "~";
            default: return v;
        }
    }

    // the item template for properties
    var propertyTemplate =
        $(go.Panel, "Horizontal",
            // property visibility/access
            $(go.TextBlock,
                { isMultiline: false, editable: false, width: 12 },
                new go.Binding("text", "visibility", convertVisibility)),
            // property name, underlined if scope=="class" to indicate static property
            $(go.TextBlock,
                { isMultiline: false, editable: true },
                new go.Binding("text", "name").makeTwoWay(),
                new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
            // property type, if known
            $(go.TextBlock, "",
                new go.Binding("text", "type", t => t ? ": " : "")),
            $(go.TextBlock,
                { isMultiline: false, editable: true },
                new go.Binding("text", "type").makeTwoWay()),
            // property default value, if any
            $(go.TextBlock,
                { isMultiline: false, editable: false },
                new go.Binding("text", "default", s => s ? " = " + s : ""))
        );

    // the item template for methods
    var methodTemplate =
        $(go.Panel, "Horizontal",
            // method visibility/access
            $(go.TextBlock,
                { isMultiline: false, editable: false, width: 12 },
                new go.Binding("text", "visibility", convertVisibility)),
            // method name, underlined if scope=="class" to indicate static method
            $(go.TextBlock,
                { isMultiline: false, editable: true },
                new go.Binding("text", "name").makeTwoWay(),
                new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
            // method parameters
            $(go.TextBlock, "()",
                // this does not permit adding/editing/removing of parameters via inplace edits
                new go.Binding("text", "parameters", function (parr) {
                    var s = "(";
                    for (var i = 0; i < parr.length; i++) {
                        var param = parr[i];
                        if (i > 0) s += ", ";
                        s += param.name + ": " + param.type;
                    }
                    return s + ")";
                })),
            // method return type, if any
            $(go.TextBlock, "",
                new go.Binding("text", "type", t => t ? ": " : "")),
            $(go.TextBlock,
                { isMultiline: false, editable: true },
                new go.Binding("text", "type").makeTwoWay())
        );

    // this simple template does not have any buttons to permit adding or
    // removing properties or methods, but it could!
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            {
                locationSpot: go.Spot.Center,
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides
            },
            $(go.Shape, { fill: "lightyellow" }),
            $(go.Panel, "Table",
                { defaultRowSeparatorStroke: "black" },
                // header
                $(go.TextBlock,
                    {
                        row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                        font: "bold 12pt sans-serif",
                        isMultiline: false, editable: true
                    },
                    new go.Binding("text", "name").makeTwoWay()),
                // properties
                $(go.TextBlock, "Properties",
                    { row: 1, font: "italic 10pt sans-serif" },
                    new go.Binding("visible", "visible", v => !v).ofObject("PROPERTIES")),
                $(go.Panel, "Vertical", { name: "PROPERTIES" },
                    new go.Binding("itemArray", "properties"),
                    {
                        row: 1, margin: 3, stretch: go.GraphObject.Fill,
                        defaultAlignment: go.Spot.Left, background: "lightyellow",
                        itemTemplate: propertyTemplate
                    }
                ),
                $("PanelExpanderButton", "PROPERTIES",
                    { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
                    new go.Binding("visible", "properties", arr => arr.length > 0)),
                // methods
                $(go.TextBlock, "Methods",
                    { row: 2, font: "italic 10pt sans-serif" },
                    new go.Binding("visible", "visible", v => !v).ofObject("METHODS")),
                $(go.Panel, "Vertical", { name: "METHODS" },
                    new go.Binding("itemArray", "methods"),
                    {
                        row: 2, margin: 3, stretch: go.GraphObject.Fill,
                        defaultAlignment: go.Spot.Left, background: "lightyellow",
                        itemTemplate: methodTemplate
                    }
                ),
                $("PanelExpanderButton", "METHODS",
                    { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
                    new go.Binding("visible", "methods", arr => arr.length > 0))
            )
        );

    function convertIsTreeLink(r: string) {
        return r === "generalization";
    }

    function convertFromArrow(r: any) {
        switch (r) {
            case "generalization": return "";
            default: return "";
        }
    }

    function convertToArrow(r: any) {
        switch (r) {
            case "generalization": return "Triangle";
            case "aggregation": return "StretchedDiamond";
            default: return "";
        }
    }

    myDiagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.Orthogonal },
            new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
            $(go.Shape),
            $(go.Shape, { scale: 1.3, fill: "white" },
                new go.Binding("fromArrow", "relationship", convertFromArrow)),
            $(go.Shape, { scale: 1.3, fill: "white" },
                new go.Binding("toArrow", "relationship", convertToArrow))
        );


    myDiagram.model = new go.GraphLinksModel(
        {
            linkKeyProperty: 'key',
            copiesArrays: true,
            copiesArrayObjects: true,
        });

    return myDiagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes: any) {
    alert('GoJS model changed!');
}

// render function...
export default function ModelsPage() {

    let nodedata: any[] = []

    nodedata.push(
        { key: -1, name: 'MicroController' }
    )


    paletteNodes.forEach((node, index) => {

        // let extras: any[] = Object.entries(node.extras)
        let methods: any[] = []

        node.ins?.forEach(method => {
            methods.push({ name: method, visibility: 'public' })
        });
        node.outs?.forEach(method => {
            methods.push({ name: method, visibility: 'public' })
        });


        nodedata.push(
            {
                key: index,
                name: node.name,
                methods: methods
                // properties:
            }
        )

    });



    let linkdata: any[] = []

    paletteNodes.forEach((node, index) => {
        if (node.extras.type === 'controller') {
            linkdata.push({ key: index, from: index, to: -1, relationship: "generalization" })
        }
    });


    // let nodedata = [
    //     {
    //         key: 1,
    //         name: "BankAccount",
    //         properties: [
    //             { name: "owner", type: "String", visibility: "public" },
    //             { name: "balance", type: "Currency", visibility: "public", default: "0" }
    //         ],
    //         methods: [
    //             { name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },
    //             { name: "withdraw", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
    //         ]
    //     },
    //     {
    //         key: 11,
    //         name: "Person",
    //         properties: [
    //             { name: "name", type: "String", visibility: "public" },
    //             { name: "birth", type: "Date", visibility: "protected" }
    //         ],
    //         methods: [
    //             { name: "getCurrentAge", type: "int", visibility: "public" }
    //         ]
    //     },
    //     {
    //         key: 12,
    //         name: "Student",
    //         properties: [
    //             { name: "classes", type: "List", visibility: "public" }
    //         ],
    //         methods: [
    //             { name: "attend", parameters: [{ name: "class", type: "Course" }], visibility: "private" },
    //             { name: "sleep", visibility: "private" }
    //         ]
    //     },
    //     {
    //         key: 13,
    //         name: "Professor",
    //         properties: [
    //             { name: "classes", type: "List", visibility: "public" }
    //         ],
    //         methods: [
    //             { name: "teach", parameters: [{ name: "class", type: "Course" }], visibility: "private" }
    //         ]
    //     },
    //     {
    //         key: 14,
    //         name: "Course",
    //         properties: [
    //             { name: "name", type: "String", visibility: "public" },
    //             { name: "description", type: "String", visibility: "public" },
    //             { name: "professor", type: "Professor", visibility: "public" },
    //             { name: "location", type: "String", visibility: "public" },
    //             { name: "times", type: "List", visibility: "public" },
    //             { name: "prerequisites", type: "List", visibility: "public" },
    //             { name: "students", type: "List", visibility: "public" }
    //         ]
    //     }
    // ];







    return (
        <ReactDiagram
            initDiagram={initDiagram}
            divClassName='diagram-component'
            nodeDataArray={nodedata}
            linkDataArray={linkdata}
        // onModelChange={handleModelChange}
        />
    );
}