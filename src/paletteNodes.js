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
    },
    {
        name: 'Arduino Leonardo',
        color: 'green',
        extras: {
            type: 'controller',
            analogPorts: 12,
            digitalPorts: 20,
        },
        ins: [],
        outs: [
            'setup()',
            'loop()'
        ]
    },
    {
        name: 'Arduino Flora',
        color: 'green',
        extras: {
            type: 'controller',
            analogPorts: 4,
            digitalPorts: 8,
        },
        ins: [],
        outs: [
            'setup()',
            'loop()'
        ]
    }, {
        name: 'Digital I/O',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        ins: [
            'void digitalWrite(int pin, int value)',
            'void pinMode(int pin, int mode)',
        ],
        outs: [
            'int digitalRead(int pin)',
        ]
    },
    {
        name: 'Analog I/O',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        ins: [
            'void analoglWrite(int pin, int value)',
            'void pinMode(int pin, int mode)',
            'void analogReference(int type)',
        ],
        outs: []
    },
    {
        name: 'Time',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        ins: [
            'void delay(int ms)',
            'void delayMicroseconds(int us)',
        ],
        outs: [
            'unsigned long micros()',
            'unsigned long millis()',
        ]
    },
    {
        name: 'Math',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        ins: [
            'void delay(int ms)',
        ],
        outs: [
            'int abs(int x)',
            'int constrain(int x, int a, int b)',
            'int map(int value, int fromLow, int fromHigh, int toLow, int toHigh)',
            'any? max(any x, any y)',
            'any? min(any x, any y)',
            'double pow(float base, float exponent)',
            'double sq(any x)',
            'double sqrt(any x)',
        ]
    },
    {
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
        name: 'CustomFunction',
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