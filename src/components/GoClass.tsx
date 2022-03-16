import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import './go.css';

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
    myDiagram.nodeTemplateMap.add("Start",
        $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Circle",
                {
                    fill: "#52ce60", /* green */
                    stroke: null,
                    portId: "",
                    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                    toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                    cursor: "pointer"
                }),
            $(go.TextBlock, "Start",
                {
                    font: "bold 16pt helvetica, bold arial, sans-serif",
                    stroke: "whitesmoke"
                })
        )
    );

    myDiagram.nodeTemplateMap.add("End",
        $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Circle",
                {
                    fill: "maroon",
                    stroke: null,
                    portId: "",
                    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                    toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                    cursor: "pointer"
                }),
            $(go.Shape, "Circle", { fill: null, desiredSize: new go.Size(65, 65), strokeWidth: 2, stroke: "whitesmoke" }),
            $(go.TextBlock, "End",
                {
                    font: "bold 16pt helvetica, bold arial, sans-serif",
                    stroke: "whitesmoke"
                })
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


export default function GoClass(props: { nodedata: any, linkdata: any }) {
    console.log(props);

    return (
        <ReactDiagram
            initDiagram={initDiagram}
            divClassName='diagram-component'
            nodeDataArray={props.nodedata}
            linkDataArray={props.linkdata}
        />
    );
}