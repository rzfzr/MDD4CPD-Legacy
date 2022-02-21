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
    }, {
        name: 'Arduino Nano',
        color: 'green',
        extras: {
            type: 'controller',
            analogPorts: 6,
            digitalPorts: 22,
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
        name: 'TwoWire Interface',
        color: 'blue',
        extras: {
            type: 'component',
            library: 'Wire.h'
        },
        ins: [
            'void begin()',
            'void beginTransmission()',
            'void setClock()',
            'void onReceive()',
            'void onRequest()'

        ],
        outs: [
            'byte requestFrom()',
            'byte endTransmission()',
            'byte write()',
            'byte available()',
            'byte read()'
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
        name: 'PWM Servo',
        color: 'orange',
        extras: {
            type: 'component',
            library: 'Adafruit_PWMServoDriver.h'
        },
        ins: [
            'void begin(uint8_t prescale=0)',
            'void sleep()',
            'void wakeup()',
            'void setExtClk(uint8_t prescale)',
            'void setPWMFreq(float freq)',
            'void setOutputMode(bool totempole)',
            'void setPWM(uint8_t num, uint16_t on, uint16_t off)',
            'void setPin(uint8_t num, uint16_t val, bool invert=false)',
            'void writeMicroseconds(uint8_t num, uint16_t Microseconds)',
            'void setOscillatorFrequency(uint32_t freq)',

        ],
        outs: [
            'uint8_t getPWM(uint8_t num)',
            'uint8_t readPrescale()',
            'uint32_t getOscillatorFrequency()',
        ]
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
        color: 'pink',
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
        color: 'pink',
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
        color: 'pink',
        extras: {
            type: 'constant'
        },
        ins: [],
        outs: [
            'int',
        ]
    }, {
        name: 'Constant Boolean',
        color: 'pink',
        extras: {
            type: 'constant'
        },
        ins: [],
        outs: [
            'bool',
        ]
    },
]