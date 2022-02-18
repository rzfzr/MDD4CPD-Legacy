// eslint-disable-next-line import/no-anonymous-default-export
export default [{
        name: 'Arduino Uno',
        color: 'green',
        extras: {
            type: 'controller',
            analogPorts: 6,
            digitalPorts: 14,
        },
        ins: [],
        outs: [
            'setup()',
            'loop()'
        ]
    },
    {
        name: 'Arduino Mega',
        color: 'green',
        extras: {
            type: 'controller',
            analogPorts: 16,
            digitalPorts: 54,
        },
        ins: [],
        outs: [
            'setup()',
            'loop()'
        ]
    }, {
        name: 'Digital Port',
        color: 'white',
        extras: {
            type: 'port'
        },
        ins: [],
        outs: [
            'port',
        ]
    }, {
        name: 'Analog Port',
        color: 'white',
        extras: {
            type: 'port'
        },
        ins: [],
        outs: [
            'port',
        ]
    },
    {
        name: 'Function',
        extras: {
            type: 'logic'
        },
        color: 'grey',
        outs: [
            'call',
        ],
        ins: [
            'trigger',
        ]
    }, {
        name: 'Condition',
        extras: {
            type: 'logic'
        },
        color: 'grey',
        outs: [
            'True',
            'False'
        ],
        ins: [
            'trigger',
            'x',
            'y'
        ]
    },
    {
        name: 'Loop',
        extras: {
            type: 'logic'
        },
        color: 'grey',
        outs: [
            'True',
            'False'
        ],
        ins: [
            'startValue',
            'stopValue'
        ]
    },
    {
        name: 'Led',
        color: 'red',
        extras: {
            type: 'component',
            library: 'Setter.h'
        },
        ins: [
            'setValue()'
        ],
        outs: []

    },
    {
        name: 'Temperature Sensor',
        color: 'blue',
        extras: {
            type: 'component',
            library: 'Getter.h'
        },
        ins: [],
        outs: [
            'getValue()'
        ]
    },
    {
        name: 'Button',
        color: 'blue',
        extras: {
            type: 'component',
            library: 'Getter.h'
        },
        ins: [
            'setValue(bool)'
        ],
        outs: []
    },
    {
        name: 'Servo',
        color: 'orange',
        extras: {
            type: 'component',
            library: 'Servo.h'
        },
        ins: [
            'void detach()',
            'void write(int)',
            'void writeMicroseconds(int)',
        ],
        outs: [
            'uint8_t attach(int)',
            'uint8_t attach(int, int, int)',
            'int read()',
            'int readMicroseconds()',
            'bool attached()',
        ]
    },
    {
        name: 'Stepper',
        color: 'orange',
        extras: {
            type: 'component',
            library: 'Stepper.h'
        },
        ins: [
            'Stepper(int, int, int)',
            'Stepper(int, int, int, int, int)',
            'Stepper(int, int, int, int, int, int)',
            'void setSpeed(long whatSpeed)',
            'void step(int number_of_steps)',
        ],
        outs: [
            'int version(void)',
        ]
    },
    {
        name: 'Variable Integer',
        color: 'purple',
        extras: {
            type: 'variable'
        },
        ins: [
            'void setValue(int)',
        ],
        outs: [
            'int getValue()',
        ]
    },
    {
        name: 'Variable Boolean',
        color: 'purple',
        extras: {
            type: 'variable'
        },
        ins: [
            'void setValue(bool)',
        ],
        outs: [
            'bool',
        ]
    },
    {
        name: 'Constant Integer',
        color: 'purple',
        extras: {
            type: 'variable'
        },
        ins: [],
        outs: [
            'int',
        ]
    }, {
        name: 'Constant Boolean',
        color: 'purple',
        extras: {
            type: 'variable'
        },
        ins: [],
        outs: [
            'bool',
        ]
    },
    {
        name: 'ThermoServo',
        color: 'white',
        extras: {
            type: 'diagram',
            diagram: {
                "id": "d6b5717e-2da5-4f3a-9d8c-3ace0ec6f282",
                "offsetX": 282.5965420081967,
                "offsetY": -1.8605532786886627,
                "zoom": 110.00000000000003,
                "gridSize": 0,
                "layers": [{
                    "id": "95b8e5fd-5c97-444f-bf41-4336c9183141",
                    "type": "diagram-links",
                    "isSvg": true,
                    "transformed": true,
                    "models": {
                        "07eb34b6-ba24-43cd-809d-13132e33da51": {
                            "id": "07eb34b6-ba24-43cd-809d-13132e33da51",
                            "type": "default",
                            "selected": false,
                            "source": "df05ca88-a562-4d4c-9ac6-3351ac43760e",
                            "sourcePort": "7e465aa4-d0f3-443c-8b36-3ca4ee008db5",
                            "target": "512bc35e-9c08-498f-995c-d05f0629761c",
                            "targetPort": "af8d3171-365c-49e7-8ed9-f150fe82e172",
                            "points": [{
                                "id": "47994ec8-c991-4825-a29b-61ec993e5350",
                                "type": "point",
                                "x": 344.78177029969225,
                                "y": 209.69108306384467
                            }, {
                                "id": "796b3738-ce95-43d4-a628-33511fa02937",
                                "type": "point",
                                "x": 373.5681112320696,
                                "y": 356.3373563172386
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "11ff809f-c2aa-431d-a557-d2728d947406": {
                            "id": "11ff809f-c2aa-431d-a557-d2728d947406",
                            "type": "default",
                            "selected": false,
                            "source": "512bc35e-9c08-498f-995c-d05f0629761c",
                            "sourcePort": "af8d3171-365c-49e7-8ed9-f150fe82e172",
                            "target": "49d7e112-0f62-440a-990a-a30d71039672",
                            "targetPort": "53d975ee-bdca-4a40-9282-f4c29491f5b8",
                            "points": [{
                                "id": "cb21f57c-5a25-47ca-b296-7abac16ff601",
                                "type": "point",
                                "x": 373.5681112320696,
                                "y": 356.3373563172386
                            }, {
                                "id": "0ef07a28-eda6-4aad-8909-11ed44a98604",
                                "type": "point",
                                "x": 393.57685626921244,
                                "y": 513.6255243019981
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "70add750-063f-4dc5-a67f-a8c14fab60c1": {
                            "id": "70add750-063f-4dc5-a67f-a8c14fab60c1",
                            "type": "default",
                            "selected": false,
                            "source": "df05ca88-a562-4d4c-9ac6-3351ac43760e",
                            "sourcePort": "be658169-ab18-4a43-86d1-70bd53418c8d",
                            "target": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                            "targetPort": "6803560d-cf97-47f6-8ef6-51f22409db16",
                            "points": [{
                                "id": "b77d1881-35bd-48da-b02b-959004872078",
                                "type": "point",
                                "x": 344.78177029969225,
                                "y": 225.69108656586187
                            }, {
                                "id": "b3ab152f-3176-4c80-aa4f-71382b1f85b1",
                                "type": "point",
                                "selected": false,
                                "x": 346.01716188524597,
                                "y": 271.6229508196721
                            }, {
                                "id": "4129d80b-8b7f-4424-90c1-c6ca1858c44c",
                                "type": "point",
                                "selected": false,
                                "x": 100.11552254098359,
                                "y": 283.4262295081968
                            }, {
                                "id": "9cb55657-c602-4e7a-8d38-398f80d8ccef",
                                "type": "point",
                                "selected": false,
                                "x": 43.066342213114766,
                                "y": 319.81967213114757
                            }, {
                                "id": "baa37b37-4e6d-4106-9799-1e146ed586b2",
                                "type": "point",
                                "x": 88.95413358094245,
                                "y": 358.3155857774076
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "fb8c0a43-5bf4-48e6-81d4-a368a5075dd6": {
                            "id": "fb8c0a43-5bf4-48e6-81d4-a368a5075dd6",
                            "type": "default",
                            "selected": false,
                            "source": "4fa142c2-b229-4294-be53-e35f2244affc",
                            "sourcePort": "5d42ad8c-05da-4623-a573-447cfd67f313",
                            "target": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                            "targetPort": "21c74953-b688-4c2a-8c36-32a7dc485d86",
                            "points": [{
                                "id": "23b0e7ee-14ee-4959-8bda-b20174ab7af4",
                                "type": "point",
                                "x": 24.442624951972277,
                                "y": 339.627301325563
                            }, {
                                "id": "a56e2c41-2fdf-41a3-9936-ce5cf8874c20",
                                "type": "point",
                                "x": 88.95413358094245,
                                "y": 374.31558177510226
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "84078498-b460-40ec-88f8-50f7e0a3d07d": {
                            "id": "84078498-b460-40ec-88f8-50f7e0a3d07d",
                            "type": "default",
                            "selected": false,
                            "source": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                            "sourcePort": "65ad99a6-a95e-4d8a-9a10-0b0837d57677",
                            "target": "b7620813-1d70-4ec9-963d-0de893381809",
                            "targetPort": "7b3fd1de-cfd1-45d3-b5d9-43139f9c591d",
                            "points": [{
                                "id": "76798d61-83d7-458a-b228-2437806d7e34",
                                "type": "point",
                                "x": 192.04791559938494,
                                "y": 358.31558577740714
                            }, {
                                "id": "1c072e78-9c55-4cdb-a6fb-eab25523dcbb",
                                "type": "point",
                                "selected": false,
                                "x": 245.6892930327869,
                                "y": 357.1967213114754
                            }, {
                                "id": "4397b5e1-aaec-4038-b0bd-19b2b351e532",
                                "type": "point",
                                "selected": false,
                                "x": 249.17662537257826,
                                "y": 421.98062593144556
                            }, {
                                "id": "2ca8ce88-0cf6-4b47-932a-b7dd7b8ec1ea",
                                "type": "point",
                                "x": 37.236174036244776,
                                "y": 474.3847316054044
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "47994c2c-7089-457e-852b-8840a735f92b": {
                            "id": "47994c2c-7089-457e-852b-8840a735f92b",
                            "type": "default",
                            "selected": false,
                            "source": "b7620813-1d70-4ec9-963d-0de893381809",
                            "sourcePort": "7b3fd1de-cfd1-45d3-b5d9-43139f9c591d",
                            "target": "49d7e112-0f62-440a-990a-a30d71039672",
                            "targetPort": "4d27e2bc-1ed7-4a25-809b-5f39309a5dbe",
                            "points": [{
                                "id": "97f0f35c-1437-4334-b234-bc7d7f3ecffc",
                                "type": "point",
                                "x": 37.236174036244776,
                                "y": 474.3847316054044
                            }, {
                                "id": "7043f7f0-76b8-4c1f-81f5-9c78810f2f72",
                                "type": "point",
                                "x": 94.85811427382139,
                                "y": 529.6255202996922
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "ff2344b3-09b0-458e-b229-dc8416a0db3c": {
                            "id": "ff2344b3-09b0-458e-b229-dc8416a0db3c",
                            "type": "default",
                            "selected": false,
                            "source": "d9469763-8e16-493a-ace1-5beb2a9143d0",
                            "sourcePort": "c67f8fa3-b522-42e0-8e73-363c0afbab50",
                            "target": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                            "targetPort": "70460e22-0d44-4ec5-b440-018f7ed7e89e",
                            "points": [{
                                "id": "1fda732e-1f4b-4f33-a350-ff7eecde5acc",
                                "type": "point",
                                "x": -7.278176229508219,
                                "y": 418.2205510373978
                            }, {
                                "id": "41d295bd-c704-4034-adf5-d3ccc91b9c2e",
                                "type": "point",
                                "x": 88.95413358094243,
                                "y": 390.3155777727967
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        }
                    }
                }, {
                    "id": "ce83d161-802f-41ec-89e7-2abbc3dcd9d9",
                    "type": "diagram-nodes",
                    "isSvg": false,
                    "transformed": true,
                    "models": {
                        "df05ca88-a562-4d4c-9ac6-3351ac43760e": {
                            "id": "df05ca88-a562-4d4c-9ac6-3351ac43760e",
                            "type": "default",
                            "selected": false,
                            "extras": {
                                "type": "controller",
                                "analogPorts": 6,
                                "digitalPorts": 14
                            },
                            "x": 279.1319159836066,
                            "y": 177.1967213114754,
                            "ports": [{
                                "id": "7e465aa4-d0f3-443c-8b36-3ca4ee008db5",
                                "type": "default",
                                "x": 337.2817702996929,
                                "y": 202.19108306384462,
                                "name": "setup()",
                                "alignment": "right",
                                "parentNode": "df05ca88-a562-4d4c-9ac6-3351ac43760e",
                                "links": ["07eb34b6-ba24-43cd-809d-13132e33da51"],
                                "in": false,
                                "label": "setup()"
                            }, {
                                "id": "be658169-ab18-4a43-86d1-70bd53418c8d",
                                "type": "default",
                                "x": 337.2817702996929,
                                "y": 218.19107906153928,
                                "name": "loop()",
                                "alignment": "right",
                                "parentNode": "df05ca88-a562-4d4c-9ac6-3351ac43760e",
                                "links": ["70add750-063f-4dc5-a67f-a8c14fab60c1"],
                                "in": false,
                                "label": "loop()"
                            }],
                            "name": "Arduino Uno",
                            "color": "green",
                            "portsInOrder": [],
                            "portsOutOrder": ["7e465aa4-d0f3-443c-8b36-3ca4ee008db5", "be658169-ab18-4a43-86d1-70bd53418c8d"]
                        },
                        "49d7e112-0f62-440a-990a-a30d71039672": {
                            "id": "49d7e112-0f62-440a-990a-a30d71039672",
                            "type": "default",
                            "selected": false,
                            "extras": {
                                "type": "component",
                                "library": "Servo.h"
                            },
                            "x": 85.36142418032786,
                            "y": 481.1311475409836,
                            "ports": [{
                                "id": "53d975ee-bdca-4a40-9282-f4c29491f5b8",
                                "type": "default",
                                "x": 386.0768562692119,
                                "y": 506.1255243019972,
                                "name": "uint8_t attach(int)",
                                "alignment": "right",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": ["11ff809f-c2aa-431d-a557-d2728d947406"],
                                "in": false,
                                "label": "uint8_t attach(int)"
                            }, {
                                "id": "d4b088ed-ea94-475d-a316-a9a0da22422e",
                                "type": "default",
                                "x": 386.0768562692119,
                                "y": 522.1255202996921,
                                "name": "uint8_t attach(int, int, int)",
                                "alignment": "right",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": [],
                                "in": false,
                                "label": "uint8_t attach(int, int, int)"
                            }, {
                                "id": "eb6eee34-ae1a-4047-9827-3655e7bde42e",
                                "type": "default",
                                "x": 386.0768562692119,
                                "y": 538.1255162973868,
                                "name": "int read()",
                                "alignment": "right",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": [],
                                "in": false,
                                "label": "int read()"
                            }, {
                                "id": "8987ac73-e6f0-4536-a15f-5be603b35094",
                                "type": "default",
                                "x": 386.0768562692119,
                                "y": 554.1255122950819,
                                "name": "int readMicroseconds()",
                                "alignment": "right",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": [],
                                "in": false,
                                "label": "int readMicroseconds()"
                            }, {
                                "id": "79f1f51a-4e03-4b59-ba50-c3923359f440",
                                "type": "default",
                                "x": 386.0768562692119,
                                "y": 570.1255082927768,
                                "name": "bool attached()",
                                "alignment": "right",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": [],
                                "in": false,
                                "label": "bool attached()"
                            }, {
                                "id": "478ef04c-9381-4214-a8b0-b5cab2de9868",
                                "type": "default",
                                "x": 87.35811427382158,
                                "y": 506.1255243019972,
                                "name": "void detach()",
                                "alignment": "left",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": [],
                                "in": true,
                                "label": "void detach()"
                            }, {
                                "id": "4d27e2bc-1ed7-4a25-809b-5f39309a5dbe",
                                "type": "default",
                                "x": 87.35811427382158,
                                "y": 522.1255202996921,
                                "name": "void write(int)",
                                "alignment": "left",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": ["47994c2c-7089-457e-852b-8840a735f92b"],
                                "in": true,
                                "label": "void write(int)"
                            }, {
                                "id": "3f61b0dd-3ced-402a-b20a-74db2ff0b592",
                                "type": "default",
                                "x": 87.35811427382158,
                                "y": 538.1255162973868,
                                "name": "void writeMicroseconds(int)",
                                "alignment": "left",
                                "parentNode": "49d7e112-0f62-440a-990a-a30d71039672",
                                "links": [],
                                "in": true,
                                "label": "void writeMicroseconds(int)"
                            }],
                            "name": "Servo",
                            "color": "orange",
                            "portsInOrder": ["478ef04c-9381-4214-a8b0-b5cab2de9868", "4d27e2bc-1ed7-4a25-809b-5f39309a5dbe", "3f61b0dd-3ced-402a-b20a-74db2ff0b592"],
                            "portsOutOrder": ["53d975ee-bdca-4a40-9282-f4c29491f5b8", "d4b088ed-ea94-475d-a316-a9a0da22422e", "eb6eee34-ae1a-4047-9827-3655e7bde42e", "8987ac73-e6f0-4536-a15f-5be603b35094", "79f1f51a-4e03-4b59-ba50-c3923359f440"]
                        },
                        "512bc35e-9c08-498f-995c-d05f0629761c": {
                            "id": "512bc35e-9c08-498f-995c-d05f0629761c",
                            "type": "MyEditable",
                            "selected": false,
                            "extras": {
                                "type": "port"
                            },
                            "x": 269.2958504098361,
                            "y": 317.8524590163934,
                            "ports": [{
                                "id": "af8d3171-365c-49e7-8ed9-f150fe82e172",
                                "type": "default",
                                "x": 366.06811123206967,
                                "y": 348.8373563172385,
                                "name": "port",
                                "alignment": "right",
                                "parentNode": "512bc35e-9c08-498f-995c-d05f0629761c",
                                "links": ["07eb34b6-ba24-43cd-809d-13132e33da51", "11ff809f-c2aa-431d-a557-d2728d947406"],
                                "in": false,
                                "label": "port"
                            }],
                            "name": "Digital Port",
                            "color": "white",
                            "portsInOrder": [],
                            "portsOutOrder": ["af8d3171-365c-49e7-8ed9-f150fe82e172"],
                            "content": "1"
                        },
                        "6ced9206-ae32-4b05-8853-71d9a11c2dfe": {
                            "id": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                            "type": "MyEditable",
                            "selected": false,
                            "extras": {
                                "type": "logic"
                            },
                            "x": 79.45978483606555,
                            "y": 319.81967213114757,
                            "ports": [{
                                "id": "65ad99a6-a95e-4d8a-9a10-0b0837d57677",
                                "type": "default",
                                "x": 184.54791559938494,
                                "y": 350.81558577740714,
                                "name": "True",
                                "alignment": "right",
                                "parentNode": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                                "links": ["84078498-b460-40ec-88f8-50f7e0a3d07d"],
                                "in": false,
                                "label": "True"
                            }, {
                                "id": "f2e4e772-5d44-4a2b-bc82-bcedd7145ef1",
                                "type": "default",
                                "x": 184.54791559938494,
                                "y": 366.81558177510203,
                                "name": "False",
                                "alignment": "right",
                                "parentNode": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                                "links": [],
                                "in": false,
                                "label": "False"
                            }, {
                                "id": "6803560d-cf97-47f6-8ef6-51f22409db16",
                                "type": "default",
                                "x": 81.45413358094243,
                                "y": 350.81558577740714,
                                "name": "trigger",
                                "alignment": "left",
                                "parentNode": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                                "links": ["70add750-063f-4dc5-a67f-a8c14fab60c1"],
                                "in": true,
                                "label": "trigger"
                            }, {
                                "id": "21c74953-b688-4c2a-8c36-32a7dc485d86",
                                "type": "default",
                                "x": 81.45413358094243,
                                "y": 366.81558177510203,
                                "name": "x",
                                "alignment": "left",
                                "parentNode": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                                "links": ["fb8c0a43-5bf4-48e6-81d4-a368a5075dd6"],
                                "in": true,
                                "label": "x"
                            }, {
                                "id": "70460e22-0d44-4ec5-b440-018f7ed7e89e",
                                "type": "default",
                                "x": 81.45413358094243,
                                "y": 382.8155777727967,
                                "name": "y",
                                "alignment": "left",
                                "parentNode": "6ced9206-ae32-4b05-8853-71d9a11c2dfe",
                                "links": ["ff2344b3-09b0-458e-b229-dc8416a0db3c"],
                                "in": true,
                                "label": "y"
                            }],
                            "name": "Condition",
                            "color": "grey",
                            "portsInOrder": ["6803560d-cf97-47f6-8ef6-51f22409db16", "21c74953-b688-4c2a-8c36-32a7dc485d86", "70460e22-0d44-4ec5-b440-018f7ed7e89e"],
                            "portsOutOrder": ["65ad99a6-a95e-4d8a-9a10-0b0837d57677", "f2e4e772-5d44-4a2b-bc82-bcedd7145ef1"],
                            "content": ">="
                        },
                        "b7620813-1d70-4ec9-963d-0de893381809": {
                            "id": "b7620813-1d70-4ec9-963d-0de893381809",
                            "type": "MyEditable",
                            "selected": false,
                            "extras": {
                                "type": "variable"
                            },
                            "x": -103.49103483606554,
                            "y": 435.88524590163934,
                            "ports": [{
                                "id": "7b3fd1de-cfd1-45d3-b5d9-43139f9c591d",
                                "type": "default",
                                "x": 29.736174036244776,
                                "y": 466.8847316054055,
                                "name": "int",
                                "alignment": "right",
                                "parentNode": "b7620813-1d70-4ec9-963d-0de893381809",
                                "links": ["84078498-b460-40ec-88f8-50f7e0a3d07d", "47994c2c-7089-457e-852b-8840a735f92b"],
                                "in": false,
                                "label": "int"
                            }],
                            "name": "Constant Integer",
                            "color": "purple",
                            "portsInOrder": [],
                            "portsOutOrder": ["7b3fd1de-cfd1-45d3-b5d9-43139f9c591d"],
                            "content": "10"
                        },
                        "4fa142c2-b229-4294-be53-e35f2244affc": {
                            "id": "4fa142c2-b229-4294-be53-e35f2244affc",
                            "type": "MyEditable",
                            "selected": false,
                            "extras": {
                                "type": "variable"
                            },
                            "x": -116.27792008196724,
                            "y": 301.13114754098353,
                            "ports": [{
                                "id": "5d42ad8c-05da-4623-a573-447cfd67f313",
                                "type": "default",
                                "x": 16.942624951972277,
                                "y": 332.1273013255633,
                                "name": "int",
                                "alignment": "right",
                                "parentNode": "4fa142c2-b229-4294-be53-e35f2244affc",
                                "links": ["fb8c0a43-5bf4-48e6-81d4-a368a5075dd6"],
                                "in": false,
                                "label": "int"
                            }],
                            "name": "Constant Integer",
                            "color": "purple",
                            "portsInOrder": [],
                            "portsOutOrder": ["5d42ad8c-05da-4623-a573-447cfd67f313"],
                            "content": "25"
                        },
                        "d9469763-8e16-493a-ace1-5beb2a9143d0": {
                            "id": "d9469763-8e16-493a-ace1-5beb2a9143d0",
                            "type": "default",
                            "selected": false,
                            "extras": {
                                "type": "component",
                                "library": "Getter.h"
                            },
                            "x": -108.4090676229508,
                            "y": 385.72131147540983,
                            "ports": [{
                                "id": "c67f8fa3-b522-42e0-8e73-363c0afbab50",
                                "type": "default",
                                "x": -14.778176229508219,
                                "y": 410.72055103739723,
                                "name": "getValue()",
                                "alignment": "right",
                                "parentNode": "d9469763-8e16-493a-ace1-5beb2a9143d0",
                                "links": ["ff2344b3-09b0-458e-b229-dc8416a0db3c"],
                                "in": false,
                                "label": "getValue()"
                            }],
                            "name": "TemperatureSensor",
                            "color": "blue",
                            "portsInOrder": [],
                            "portsOutOrder": ["c67f8fa3-b522-42e0-8e73-363c0afbab50"]
                        }
                    }
                }]
            }
        }
    }, {
        name: 'Single',
        color: 'white',
        extras: {
            type: 'diagram',
            diagram: {
                "id": "ef62da61-e1e0-4ac7-afb2-703ca4fb01a1",
                "offsetX": 0,
                "offsetY": 0,
                "zoom": 100,
                "gridSize": 0,
                "layers": [{
                    "id": "017b9bfb-6d1f-491e-8558-3b6232bf89d1",
                    "type": "diagram-links",
                    "isSvg": true,
                    "transformed": true,
                    "models": {
                        "60953129-55d1-4b8c-90b8-3b5a1a2f9813": {
                            "id": "60953129-55d1-4b8c-90b8-3b5a1a2f9813",
                            "type": "default",
                            "selected": false,
                            "source": "b3c810a9-65b1-474b-868b-0565a6b1e4ed",
                            "sourcePort": "4f79fef6-0094-49f5-a3ef-b6eb305bb07c",
                            "target": "c4d9126f-08e8-4e4a-ab48-1c453a864b3c",
                            "targetPort": "a0b5b58c-adab-4ba8-af1f-680aa5eae0af",
                            "points": [{
                                "id": "72e3e0af-cfb1-4c73-98b1-5c74f33e8382",
                                "type": "point",
                                "x": 236.640625,
                                "y": 127.5
                            }, {
                                "id": "35245d16-99d2-4da3-81c8-4fd9e686d06f",
                                "type": "point",
                                "x": 256.265625,
                                "y": 260.5
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "cea8d59f-e0ee-47f1-ae33-8c54b1d47c56": {
                            "id": "cea8d59f-e0ee-47f1-ae33-8c54b1d47c56",
                            "type": "default",
                            "selected": false,
                            "source": "c4d9126f-08e8-4e4a-ab48-1c453a864b3c",
                            "sourcePort": "a0b5b58c-adab-4ba8-af1f-680aa5eae0af",
                            "target": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                            "targetPort": "f7d82be0-7c73-494b-8f01-8b4aa8b56f76",
                            "points": [{
                                "id": "855e837c-7740-4400-a78e-d7ad81bec37e",
                                "type": "point",
                                "x": 256.265625,
                                "y": 260.5
                            }, {
                                "id": "f9626f8a-6808-49d6-be7b-f09051ee043c",
                                "type": "point",
                                "x": 484.234375,
                                "y": 355.5
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        }
                    }
                }, {
                    "id": "e7421b15-ad31-441a-8a63-9416311d3fdc",
                    "type": "diagram-nodes",
                    "isSvg": false,
                    "transformed": true,
                    "models": {
                        "b3c810a9-65b1-474b-868b-0565a6b1e4ed": {
                            "id": "b3c810a9-65b1-474b-868b-0565a6b1e4ed",
                            "type": "default",
                            "extras": {
                                "type": "controller",
                                "analogPorts": 6,
                                "digitalPorts": 14
                            },
                            "x": 170.984375,
                            "y": 95,
                            "ports": [{
                                "id": "4f79fef6-0094-49f5-a3ef-b6eb305bb07c",
                                "type": "default",
                                "x": 229.140625,
                                "y": 120,
                                "name": "setup()",
                                "alignment": "right",
                                "parentNode": "b3c810a9-65b1-474b-868b-0565a6b1e4ed",
                                "links": ["60953129-55d1-4b8c-90b8-3b5a1a2f9813"],
                                "in": false,
                                "label": "setup()"
                            }, {
                                "id": "c3074eed-81aa-4265-89e4-b8a9e85dafa9",
                                "type": "default",
                                "x": 229.140625,
                                "y": 136,
                                "name": "loop()",
                                "alignment": "right",
                                "parentNode": "b3c810a9-65b1-474b-868b-0565a6b1e4ed",
                                "links": [],
                                "in": false,
                                "label": "loop()"
                            }],
                            "name": "Arduino Uno",
                            "color": "green",
                            "portsInOrder": [],
                            "portsOutOrder": ["4f79fef6-0094-49f5-a3ef-b6eb305bb07c", "c3074eed-81aa-4265-89e4-b8a9e85dafa9"]
                        },
                        "c4d9126f-08e8-4e4a-ab48-1c453a864b3c": {
                            "id": "c4d9126f-08e8-4e4a-ab48-1c453a864b3c",
                            "type": "MyEditable",
                            "selected": true,
                            "extras": {
                                "type": "port"
                            },
                            "x": 151.984375,
                            "y": 222,
                            "ports": [{
                                "id": "a0b5b58c-adab-4ba8-af1f-680aa5eae0af",
                                "type": "default",
                                "x": 248.765625,
                                "y": 253,
                                "name": "port",
                                "alignment": "right",
                                "parentNode": "c4d9126f-08e8-4e4a-ab48-1c453a864b3c",
                                "links": ["60953129-55d1-4b8c-90b8-3b5a1a2f9813", "cea8d59f-e0ee-47f1-ae33-8c54b1d47c56"],
                                "in": false,
                                "label": "port"
                            }],
                            "name": "Digital Port",
                            "color": "white",
                            "portsInOrder": [],
                            "portsOutOrder": ["a0b5b58c-adab-4ba8-af1f-680aa5eae0af"],
                            "content": "1"
                        },
                        "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7": {
                            "id": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                            "type": "default",
                            "extras": {
                                "type": "component",
                                "library": "Servo.h"
                            },
                            "x": 182.984375,
                            "y": 323,
                            "ports": [{
                                "id": "f7d82be0-7c73-494b-8f01-8b4aa8b56f76",
                                "type": "default",
                                "x": 476.734375,
                                "y": 348,
                                "name": "uint8_t attach(int)",
                                "alignment": "right",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": ["cea8d59f-e0ee-47f1-ae33-8c54b1d47c56"],
                                "in": false,
                                "label": "uint8_t attach(int)"
                            }, {
                                "id": "084a1f94-55c5-4d0d-8a85-9742bd356f48",
                                "type": "default",
                                "x": 476.734375,
                                "y": 368.5,
                                "name": "uint8_t attach(int, int, int)",
                                "alignment": "right",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": [],
                                "in": false,
                                "label": "uint8_t attach(int, int, int)"
                            }, {
                                "id": "932f4c42-3dc5-4d1a-b011-9bea84ffc1cc",
                                "type": "default",
                                "x": 476.734375,
                                "y": 389,
                                "name": "int read()",
                                "alignment": "right",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": [],
                                "in": false,
                                "label": "int read()"
                            }, {
                                "id": "e87b2720-4147-4c67-881b-50a2527e49c5",
                                "type": "default",
                                "x": 476.734375,
                                "y": 405,
                                "name": "int readMicroseconds()",
                                "alignment": "right",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": [],
                                "in": false,
                                "label": "int readMicroseconds()"
                            }, {
                                "id": "beb0d0fa-3c4d-4a15-af9b-32da42bc70d8",
                                "type": "default",
                                "x": 476.734375,
                                "y": 421,
                                "name": "bool attached()",
                                "alignment": "right",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": [],
                                "in": false,
                                "label": "bool attached()"
                            }, {
                                "id": "b9667a7b-6558-4138-abb5-7e5c1925ac5b",
                                "type": "default",
                                "x": 184.984375,
                                "y": 348,
                                "name": "void detach()",
                                "alignment": "left",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": [],
                                "in": true,
                                "label": "void detach()"
                            }, {
                                "id": "b579c8ee-adae-463b-828a-327d8103fac2",
                                "type": "default",
                                "x": 184.984375,
                                "y": 364,
                                "name": "void write(int)",
                                "alignment": "left",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": [],
                                "in": true,
                                "label": "void write(int)"
                            }, {
                                "id": "28138d29-0c5b-4212-95fb-666f3f4ea9b6",
                                "type": "default",
                                "x": 184.984375,
                                "y": 384.5,
                                "name": "void writeMicroseconds(int)",
                                "alignment": "left",
                                "parentNode": "9c72dd1a-65bb-47e0-a3a7-eb39a695aff7",
                                "links": [],
                                "in": true,
                                "label": "void writeMicroseconds(int)"
                            }],
                            "name": "Servo",
                            "color": "orange",
                            "portsInOrder": ["b9667a7b-6558-4138-abb5-7e5c1925ac5b", "b579c8ee-adae-463b-828a-327d8103fac2", "28138d29-0c5b-4212-95fb-666f3f4ea9b6"],
                            "portsOutOrder": ["f7d82be0-7c73-494b-8f01-8b4aa8b56f76", "084a1f94-55c5-4d0d-8a85-9742bd356f48", "932f4c42-3dc5-4d1a-b011-9bea84ffc1cc", "e87b2720-4147-4c67-881b-50a2527e49c5", "beb0d0fa-3c4d-4a15-af9b-32da42bc70d8"]
                        }
                    }
                }]
            }
        }
    }, {
        name: 'Dual',
        color: 'white',
        extras: {
            type: 'diagram',
            diagram: {
                "id": "6dff789f-db7f-4f24-be03-28997ed43786",
                "offsetX": 129,
                "offsetY": -9,
                "zoom": 100,
                "gridSize": 0,
                "layers": [{
                    "id": "957e1e25-857a-4363-b9b8-790d0b41110f",
                    "type": "diagram-links",
                    "isSvg": true,
                    "transformed": true,
                    "models": {
                        "bd112d94-6c36-42a0-893c-6beb273131b5": {
                            "id": "bd112d94-6c36-42a0-893c-6beb273131b5",
                            "type": "default",
                            "selected": false,
                            "source": "8ebe7d92-a203-4ea4-b059-7efdddb4da22",
                            "sourcePort": "e3cbc1b1-c387-4aff-812d-3ca5296aa7ec",
                            "target": "70aa1cdf-17b9-4561-9c3e-51a1d5b1f349",
                            "targetPort": "d4f254e0-dc17-4450-ad07-1c49937cd9ca",
                            "points": [{
                                "id": "b37f001b-0f31-4452-86f3-e7c65a54b05b",
                                "type": "point",
                                "x": 134.640625,
                                "y": 162.5
                            }, {
                                "id": "b00141dd-ea09-4ec6-862a-f6b54c7c250f",
                                "type": "point",
                                "x": 150.265625,
                                "y": 362.5
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "1bf7388c-43a8-49f3-a61d-f4ac47e304b5": {
                            "id": "1bf7388c-43a8-49f3-a61d-f4ac47e304b5",
                            "type": "default",
                            "selected": false,
                            "source": "70aa1cdf-17b9-4561-9c3e-51a1d5b1f349",
                            "sourcePort": "d4f254e0-dc17-4450-ad07-1c49937cd9ca",
                            "target": "75081baf-1bf6-49d0-ac15-43432e468aec",
                            "targetPort": "e689be08-63fc-4aaf-95d1-4a2eb32bb6f7",
                            "points": [{
                                "id": "ad49ae6a-dab5-4797-97e1-22db353bbc71",
                                "type": "point",
                                "x": 150.265625,
                                "y": 362.5
                            }, {
                                "id": "005518b2-8ddd-4ed9-935f-a4771906406f",
                                "type": "point",
                                "x": 236.265625,
                                "y": 502.5
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        },
                        "a795a318-edd5-48e3-b9d1-941c3b278347": {
                            "id": "a795a318-edd5-48e3-b9d1-941c3b278347",
                            "type": "default",
                            "selected": false,
                            "source": "75081baf-1bf6-49d0-ac15-43432e468aec",
                            "sourcePort": "e689be08-63fc-4aaf-95d1-4a2eb32bb6f7",
                            "target": "e526d93a-9272-4f58-9513-994d36004791",
                            "targetPort": "8a5c2fbc-29c7-47b4-9d9a-82035187d90a",
                            "points": [{
                                "id": "4333421a-5a5b-48d8-9491-bf10afc9d253",
                                "type": "point",
                                "x": 236.265625,
                                "y": 502.5
                            }, {
                                "id": "6050c60f-fa3f-4ea3-9aa1-07d8dbea185f",
                                "type": "point",
                                "x": 287.203125,
                                "y": 644.5
                            }],
                            "labels": [],
                            "width": 3,
                            "color": "gray",
                            "curvyness": 50,
                            "selectedColor": "rgb(0,192,255)"
                        }
                    }
                }, {
                    "id": "70070360-f166-4432-9563-40c58f4b37d3",
                    "type": "diagram-nodes",
                    "isSvg": false,
                    "transformed": true,
                    "models": {
                        "8ebe7d92-a203-4ea4-b059-7efdddb4da22": {
                            "id": "8ebe7d92-a203-4ea4-b059-7efdddb4da22",
                            "type": "default",
                            "extras": {
                                "type": "controller",
                                "analogPorts": 6,
                                "digitalPorts": 14
                            },
                            "x": 68.984375,
                            "y": 130,
                            "ports": [{
                                "id": "e3cbc1b1-c387-4aff-812d-3ca5296aa7ec",
                                "type": "default",
                                "x": 127.140625,
                                "y": 155,
                                "name": "setup()",
                                "alignment": "right",
                                "parentNode": "8ebe7d92-a203-4ea4-b059-7efdddb4da22",
                                "links": ["bd112d94-6c36-42a0-893c-6beb273131b5"],
                                "in": false,
                                "label": "setup()"
                            }, {
                                "id": "cfeff148-524d-45a8-a5e2-776f0381b056",
                                "type": "default",
                                "x": 127.140625,
                                "y": 171,
                                "name": "loop()",
                                "alignment": "right",
                                "parentNode": "8ebe7d92-a203-4ea4-b059-7efdddb4da22",
                                "links": [],
                                "in": false,
                                "label": "loop()"
                            }],
                            "name": "Arduino Uno",
                            "color": "green",
                            "portsInOrder": [],
                            "portsOutOrder": ["e3cbc1b1-c387-4aff-812d-3ca5296aa7ec", "cfeff148-524d-45a8-a5e2-776f0381b056"]
                        },
                        "70aa1cdf-17b9-4561-9c3e-51a1d5b1f349": {
                            "id": "70aa1cdf-17b9-4561-9c3e-51a1d5b1f349",
                            "type": "MyEditable",
                            "selected": false,
                            "extras": {
                                "type": "port"
                            },
                            "x": 45.984375,
                            "y": 324,
                            "ports": [{
                                "id": "d4f254e0-dc17-4450-ad07-1c49937cd9ca",
                                "type": "default",
                                "x": 142.765625,
                                "y": 355,
                                "name": "port",
                                "alignment": "right",
                                "parentNode": "70aa1cdf-17b9-4561-9c3e-51a1d5b1f349",
                                "links": ["bd112d94-6c36-42a0-893c-6beb273131b5", "1bf7388c-43a8-49f3-a61d-f4ac47e304b5"],
                                "in": false,
                                "label": "port"
                            }],
                            "name": "Digital Port",
                            "color": "white",
                            "portsInOrder": [],
                            "portsOutOrder": ["d4f254e0-dc17-4450-ad07-1c49937cd9ca"],
                            "content": "1"
                        },
                        "75081baf-1bf6-49d0-ac15-43432e468aec": {
                            "id": "75081baf-1bf6-49d0-ac15-43432e468aec",
                            "type": "MyEditable",
                            "selected": false,
                            "extras": {
                                "type": "port"
                            },
                            "x": 131.984375,
                            "y": 464,
                            "ports": [{
                                "id": "e689be08-63fc-4aaf-95d1-4a2eb32bb6f7",
                                "type": "default",
                                "x": 228.765625,
                                "y": 495,
                                "name": "port",
                                "alignment": "right",
                                "parentNode": "75081baf-1bf6-49d0-ac15-43432e468aec",
                                "links": ["1bf7388c-43a8-49f3-a61d-f4ac47e304b5", "a795a318-edd5-48e3-b9d1-941c3b278347"],
                                "in": false,
                                "label": "port"
                            }],
                            "name": "Digital Port",
                            "color": "white",
                            "portsInOrder": [],
                            "portsOutOrder": ["e689be08-63fc-4aaf-95d1-4a2eb32bb6f7"],
                            "content": "3"
                        },
                        "e526d93a-9272-4f58-9513-994d36004791": {
                            "id": "e526d93a-9272-4f58-9513-994d36004791",
                            "type": "default",
                            "selected": false,
                            "extras": {
                                "type": "component",
                                "library": "Servo.h"
                            },
                            "x": -21.015625,
                            "y": 596,
                            "ports": [{
                                "id": "cc9e6e33-748a-4084-9ea1-30641e78c5b7",
                                "type": "default",
                                "x": 279.703125,
                                "y": 621,
                                "name": "uint8_t attach(int)",
                                "alignment": "right",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": [],
                                "in": false,
                                "label": "uint8_t attach(int)"
                            }, {
                                "id": "8a5c2fbc-29c7-47b4-9d9a-82035187d90a",
                                "type": "default",
                                "x": 279.703125,
                                "y": 637,
                                "name": "uint8_t attach(int, int, int)",
                                "alignment": "right",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": ["a795a318-edd5-48e3-b9d1-941c3b278347"],
                                "in": false,
                                "label": "uint8_t attach(int, int, int)"
                            }, {
                                "id": "55ea420d-ad10-4add-89fb-ebfee46d4c84",
                                "type": "default",
                                "x": 279.703125,
                                "y": 653,
                                "name": "int read()",
                                "alignment": "right",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": [],
                                "in": false,
                                "label": "int read()"
                            }, {
                                "id": "eeae8792-9784-413b-913f-1d4951ade7ed",
                                "type": "default",
                                "x": 279.703125,
                                "y": 669,
                                "name": "int readMicroseconds()",
                                "alignment": "right",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": [],
                                "in": false,
                                "label": "int readMicroseconds()"
                            }, {
                                "id": "258a047c-95ef-43bf-9d6b-ba10e8caa69e",
                                "type": "default",
                                "x": 279.703125,
                                "y": 685,
                                "name": "bool attached()",
                                "alignment": "right",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": [],
                                "in": false,
                                "label": "bool attached()"
                            }, {
                                "id": "0ccf904b-23b6-40ff-a726-a64fadeffdcf",
                                "type": "default",
                                "x": -19.015625,
                                "y": 621,
                                "name": "void detach()",
                                "alignment": "left",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": [],
                                "in": true,
                                "label": "void detach()"
                            }, {
                                "id": "c3b6e94c-c470-476f-be81-2695881afd37",
                                "type": "default",
                                "x": -19.015625,
                                "y": 637,
                                "name": "void write(int)",
                                "alignment": "left",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": [],
                                "in": true,
                                "label": "void write(int)"
                            }, {
                                "id": "7771f65a-e690-4027-8566-644c7408424f",
                                "type": "default",
                                "x": -19.015625,
                                "y": 653,
                                "name": "void writeMicroseconds(int)",
                                "alignment": "left",
                                "parentNode": "e526d93a-9272-4f58-9513-994d36004791",
                                "links": [],
                                "in": true,
                                "label": "void writeMicroseconds(int)"
                            }],
                            "name": "Servo",
                            "color": "orange",
                            "portsInOrder": ["0ccf904b-23b6-40ff-a726-a64fadeffdcf", "c3b6e94c-c470-476f-be81-2695881afd37", "7771f65a-e690-4027-8566-644c7408424f"],
                            "portsOutOrder": ["cc9e6e33-748a-4084-9ea1-30641e78c5b7", "8a5c2fbc-29c7-47b4-9d9a-82035187d90a", "55ea420d-ad10-4add-89fb-ebfee46d4c84", "eeae8792-9784-413b-913f-1d4951ade7ed", "258a047c-95ef-43bf-9d6b-ba10e8caa69e"]
                        }
                    }
                }]
            }
        }
    }
]