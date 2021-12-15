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
        name: 'TemperatureSensor',
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
            'bool getValue()',
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
        name: 'Diamond',
        color: 'white',
        extras: {
            type: 'testing'
        },
        ins: [],
        outs: []
    },
    {
        name: 'LabelEdit',
        color: 'white',
        extras: {
            type: 'testing'
        },
        ins: [],
        outs: []
    },
    {
        name: 'NodeEdit',
        color: 'white',
        extras: {
            type: 'testing'
        },
        ins: [],
        outs: []
    }
]