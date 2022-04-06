// eslint-disable-next-line import/no-anonymous-default-export
export default [{
    name: 'Arduino Uno',
    color: 'green',
    extras: {
        type: 'controller',
        analogPorts: 6,
        digitalPorts: 14,
    },
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
        outs: [
            'setup()',
            'loop()'
        ]
    },
    {
        name: 'Port',
        color: 'pink',
        extras: {
            value: '0',
            group: 'value',
            type: 'port',
            hasUsages: true,
            hasPortType: true,
            portType: 'Digital',
            returnType: 'int',
            selectableOptions: Array.from(Array(100).keys()).map(x => x.toString()),
            hasValue: true,
        },
        ins: [
            'in'
        ],
        outs: [
            'out',
        ]
    },
    {
        name: 'Parameter(s)',
        color: 'pink',
        extras: {
            group: 'value',
            type: 'parameter',
            hasUsages: true,
            hasReturnType: true,
            value: '0',
            hasValue: true,
        },
        ins: [
            'in'
        ],
        outs: [
            'out',
        ]
    },
    {
        name: 'Variable(s)',
        color: 'pink',
        extras: {
            group: 'value',
            type: 'variable',
            name: 'var',
            hasUsages: true,
            hasReturnType: true,
            hasUsername: true,
            hasValue: true,
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    },
    {
        name: 'Constant(s)',
        color: 'pink',
        extras: {
            group: 'value',
            type: 'constant',
            name: 'con',
            hasUsages: true,
            hasReturnType: true,
            hasUsername: true,
            hasValue: true,
        },
        ins: [
            'in'
        ],
        outs: [
            'out',
        ]
    },
    {
        name: 'Function',
        extras: {
            type: 'logic',
            value: 'foo',
            hasUsages: true,
            hasReturnType: true,
            // hasUsername: true,
            hasValue: true,
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
            type: 'logic',
            selectableOptions: ['==', '!=', '<', '>', '<=', '>=', '<=>'],
            value: '=='
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
        name: 'Digital I/O',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        methods: [
            'void digitalWrite(int pin, int value)',
            'void pinMode(int pin, int mode)',
            'int digitalRead(int pin)',
        ]
    },
    {
        name: 'Analog I/O',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        methods: [
            'void analoglWrite(int pin, int value)',
            'void pinMode(int pin, int mode)',
            'void analogReference(int type)',

        ]
    },
    {
        name: 'Time',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        methods: [
            'void delay(int ms)',
            'void delayMicroseconds(int us)',
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
        methods: [
            'void delay(int ms)',
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
        name: 'Trigonometry',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        methods: [
            'double cos(float rad)',
            'double sin(float rad)',
            'double tan(float rad)',
        ]
    },
    {
        name: 'Random Numbers',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        methods: [
            'void randomSeed(long seed)',
            'long random(? max)',
            'long random(? min, ? max)',
        ]
    },
    {
        name: 'Zero, Due & MKR Family',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        methods: [
            'void analogReadResolution(bits bits)',
            'void analogWriteResolution(bits bits)',
        ]
    },
    {
        name: 'Advanced I/O',
        color: 'cyan',
        extras: {
            type: 'built-in'
        },
        methods: [
            'void noTone(int pin)',
            'unsigned long pulseIn(int pin, int value)',
            'unsigned long pulseIn(int pin, int value,unsigned long timeout)',
            'unsigned long pulseInLong(int pin, int value)',
            'unsigned long pulseInLong(int pin, int value,unsigned long timeout)',
            'byte shiftIn(int dataPin, int clockPin, int bitOrder)',
            'void shiftOut(int dataPin, int clockPin, int bitOrder, byte value)',
            'void tone(int pin, unsigned int frequency)',
            'void tone(int pin, unsigned int frequency, unsigned long duration)',
        ]
    },
    {
        name: 'true',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description:<div><code>true</code> is often said to be defined as 1, which is correct, but true has a wider definition. Any integer which is non-zero is true, in a Boolean sense. So -1, 2 and -200 are all defined as true, too, in a Boolean sense.</div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    }, {
        name: 'false',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link:'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description:<div><code>false</code> is the easier of the two to define. false is defined as 0 (zero).</div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    }, {
        name: 'HIGH',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description: <div>
                <div>
                    <p>The meaning of <code>HIGH</code> (in reference to a pin) is somewhat different depending on whether a pin is set to an <code>INPUT</code> or <code>OUTPUT</code>. When a pin is configured as an <code>INPUT</code> with <code><a>pinMode()</a></code>, and read with <code><a>digitalRead()</a></code>, the Arduino (ATmega) will report <code>HIGH</code> if:</p>
                </div>
                <div>
                    <ul>
                        <li>
                            <p>a voltage greater than 3.0V is present at the pin (5V boards)</p>
                        </li>
                        <li>
                            <p>a voltage greater than 2.0V is present at the pin (3.3V boards)</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>A pin may also be configured as an INPUT with <a><code>pinMode()</code></a>, and subsequently made HIGH with <code><a>digitalWrite()</a></code>. This will enable the internal 20K pullup resistors, which will <em>pull up</em> the input pin to a <code>HIGH</code> reading unless it is pulled <code>LOW</code> by external circuitry. This can be done alternatively by passing <code>INPUT_PULLUP</code> as argument to the <a><code>pinMode()</code></a> function, as explained in more detail in the section "Defining Digital Pins modes: INPUT, INPUT_PULLUP, and OUTPUT" further below.</p>
                </div>
                <div>
                    <p>When a pin is configured to OUTPUT with <a><code>pinMode()</code></a>, and set to <code>HIGH</code> with <a><code>digitalWrite()</code></a>, the pin is at:</p>
                </div>
                <div>
                    <ul>
                        <li>
                            <p>5 volts (5V boards)</p>
                        </li>
                        <li>
                            <p>3.3 volts (3.3V boards)</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>In this state it can source current, e.g. light an LED that is connected through a series resistor to ground.</p>
                </div></div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    },  {
        name: 'LOW',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description: <div><div>
                <p>The meaning of <code>LOW</code> also has a different meaning depending on whether a pin is set to <code>INPUT</code> or <code>OUTPUT</code>. When a pin is configured as an <code>INPUT</code> with <a><code>pinMode()</code></a>, and read with <a><code>digitalRead()</code></a>, the Arduino (ATmega) will report LOW if:</p>
            </div>
                <div>
                    <ul>
                        <li>
                            <p>a voltage less than 1.5V is present at the pin (5V boards)</p>
                        </li>
                        <li>
                            <p>a voltage less than 1.0V (Approx) is present at the pin (3.3V boards)</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>When a pin is configured to <code>OUTPUT</code> with <a><code>pinMode()</code></a>, and set to <code>LOW</code> with <a><code>digitalWrite()</code></a>, the pin is at 0 volts (both 5V and 3.3V boards). In this state it can sink current, e.g. light an LED that is connected through a series resistor to +5 volts (or +3.3 volts).</p>
                </div></div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    }, {
        name: 'INPUT',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description: <div><div>
                <p>Arduino (ATmega) pins configured as <code>INPUT</code> with <a><code>pinMode()</code></a> are said to be in a <em>high-impedance</em> state. Pins configured as <code>INPUT</code> make extremely small demands on the circuit that they are sampling, equivalent to a series resistor of 100 Megohms in front of the pin. This makes them useful for reading a sensor.</p>
            </div>
                <div>
                    <p>If you have your pin configured as an <code>INPUT</code>, and are reading a switch, when the switch is in the open state the input pin will be "floating", resulting in unpredictable results. In order to assure a proper reading when the switch is open, a pull-up or pull-down resistor must be used. The purpose of this resistor is to pull the pin to a known state when the switch is open. A 10 K ohm resistor is usually chosen, as it is a low enough value to reliably prevent a floating input, and at the same time a high enough value to not draw too much current when the switch is closed. See the <a>Digital Read Serial</a> tutorial for more information.</p>
                </div>
                <div>
                    <p>If a pull-down resistor is used, the input pin will be <code>LOW</code> when the switch is open and <code>HIGH</code> when the switch is closed.</p>
                </div>
                <div>
                    <p>If a pull-up resistor is used, the input pin will be <code>HIGH</code> when the switch is open and <code>LOW</code> when the switch is closed.</p>
                </div></div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    }, {
        name: 'INPUT_PULLUP',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description: <div><div>
                <p>The ATmega microcontroller on the Arduino has internal pull-up resistors (resistors that connect to power internally) that you can access. If you prefer to use these instead of external pull-up resistors, you can use the <code>INPUT_PULLUP</code> argument in <a><code>pinMode()</code></a>.</p>
            </div>
                <div>
                    <p>See the <a>Input Pullup Serial</a> tutorial for an example of this in use.</p>
                </div>
                <div>
                    <p>Pins configured as inputs with either <code>INPUT</code> or <code>INPUT_PULLUP</code> can be damaged or destroyed if they are connected to voltages below ground (negative voltages) or above the positive power rail (5V or 3V).</p>
                </div></div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    }, {
        name: 'OUTPUT',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description: <div><div>
            <p>Pins configured as <code>OUTPUT</code> with <a><code>pinMode()</code></a> are said to be in a <em>low-impedance</em> state. This means that they can provide a substantial amount of current to other circuits. ATmega pins can source (provide current) or sink (absorb current) up to 40 mA (milliamps) of current to other devices/circuits. This makes them useful for powering LEDs because LEDs typically use less than 40 mA. Loads greater than 40 mA (e.g. motors) will require a transistor or other interface circuitry.</p>
        </div>
        <div>
            <p>Pins configured as outputs can be damaged or destroyed if they are connected to either the ground or positive power rails.</p>
        </div></div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    },{
        name: 'LED_BUILTIN',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description: <div>
                Most Arduino boards have a pin connected to an on-board LED in series with a resistor. The constant <code>LED_BUILTIN</code> is the number of the pin to which the on-board LED is connected. Most boards have this LED connected to digital pin 13.</div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    },
    {
        name: 'TwoWire Interface',
        color: 'blue',
        extras: {
            type: 'component',
            library: 'Wire.h'
        },
        methods: [
            'void begin()',
            'void beginTransmission()',
            'void setClock()',
            'void onReceive()',
            'void onRequest()',
            'byte requestFrom()',
            'byte endTransmission()',
            'byte write()',
            'byte available()',
            'byte read()'
        ]
    },
    {
        name: 'PWM Servo',
        color: 'orange',
        extras: {
            type: 'component',
            library: 'Adafruit_PWMServoDriver.h'
        },
        methods: [
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
            library: 'Servo.h',
            link: 'arduino.cc/reference/en/libraries/servo/'
        },
        methods: [
            'uint8_t attach(int pin)',
            'uint8_t attach(int pin, int min, int max)',
            'void detach()',
            'void write(int value)',
            'void writeMicroseconds(int value)',
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
        methods: [
            'Stepper(int, int, int)',
            'Stepper(int, int, int, int, int)',
            'Stepper(int, int, int, int, int, int)',
            'void setSpeed(long whatSpeed)',
            'void step(int number_of_steps)',
            'int version(void)',
        ]
    },
]