//
// Setup the data-model for the chart.
//
var initialChartLayout = {
    "nodes": [
    {
        "name": "AND-7408",
        "id": 0,
        "x": 272,
        "y": 18,
        "width": 150,
        "inputTerminals": [
            {   "name": "1A"    },
            {   "name": "1B"    },
            {   "name": "1Y"    },
            {   "name": "2A"    },
            {   "name": "2B"    },
            {   "name": "2Y"    },
            {   "name": "GND"   }
        ],
        "outputTerminals": [
            {   "name": "Vcc"   },
            {   "name": "4B"    },
            {   "name": "4A"    },
            {   "name": "4Y"    },
            {   "name": "3B"    },
            {   "name": "3A"    },
            {   "name": "3Y"    }
        ]
    },
    {
        "name": "HSTI-NOT-7414",
        "id": 2,
        "x": 64,
        "y": 562,
        "width": 150,
        "inputTerminals": [
            {   "name": "1A"    },
            {   "name": "1Y"    },
            {   "name": "2A"    },
            {   "name": "2Y"    },
            {   "name": "3A"    },
            {   "name": "3Y"    },
            {   "name": "GND"   }
        ],
        "outputTerminals": [
            {   "name": "Vcc"   },
            {   "name": "6A"    },
            {   "name": "6Y"    },
            {   "name": "5A"    },
            {   "name": "5Y"    },
            {   "name": "4A"    },
            {   "name": "4Y"    }
        ]
    },
    {
        "name": "DFF-74175",
        "id": 1,
        "x": 457,
        "y": 379,
        "width": 150,
        "inputTerminals": [
            {   "name": "CLR"   },
            {   "name": "1Q"    },
            {   "name": "~1Q"   },
            {   "name": "1D"    },
            {   "name": "2D"    },
            {   "name": "~2Q"   },
            {   "name": "2Q"    },
            {   "name": "GND"   }
        ],
        "outputTerminals": [
            {   "name": "Vcc"   },
            {   "name": "4Q"    },
            {   "name": "~4Q"   },
            {   "name": "4D"    },
            {   "name": "3D"    },
            {   "name": "~3Q"   },
            {   "name": "3Q"    },
            {   "name": "CLK"   }
        ]
    },
    {
        "name": "NOR-7402",
        "id": 10,
        "x": 272,
        "y": 319,
        "inputTerminals": [
            {   "name": "1Y"    },
            {   "name": "1A"    },
            {   "name": "1B"    },
            {   "name": "2Y"    },
            {   "name": "2A"    },
            {   "name": "2B"    },
            {   "name": "GND"
            }
        ],
        "outputTerminals": [
            {   "name": "Vcc"   },
            {   "name": "4Y"    },
            {   "name": "4B"    },
            {   "name": "4A"    },
            {   "name": "3Y"    },
            {   "name": "3B"    },
            {   "name": "3A"    }
        ],
        "width": 150
    },
    {
        "name": "Switch",
        "id": 11,
        "x": 22,
        "y": 9,
        "inputTerminals": [
            {   "name": "1-Off"    },
            {   "name": "2-Off"    },
            {   "name": "3-Off"    },
            {   "name": "4-Off"    },
            {   "name": "5-Off"    },
            {   "name": "6-Off"    },
            {   "name": "7-Off"    },
            {   "name": "8-Off"    },
            {   "name": "9-Off"    },
            {   "name": "10-Off"    },
            {   "name": "11-Off"    },
            {   "name": "12-Off"
            }
        ],
        "outputTerminals": [
            {   "name": "1-ON"    },
            {   "name": "2-ON"    },
            {   "name": "3-ON"    },
            {   "name": "4-ON"    },
            {   "name": "5-ON"    },
            {   "name": "6-ON"    },
            {   "name": "7-ON"    },
            {   "name": "8-ON"    },
            {   "name": "9-ON"    },
            {   "name": "10-ON"    },
            {   "name": "11-ON"    },
            {   "name": "12-ON"
            }
        ],
        "width": 120
    },
    {
        "name": "Switch",
        "id": 11,
        "x": 648,
        "y": 336,
        "inputTerminals": [
            {   "name": "1-LED"     },
            {   "name": "2-LED"     },
            {   "name": "3-LED"     },
            {   "name": "4-LED"     },
            {   "name": "5-LED"     },
            {   "name": "6-LED"     },
            {   "name": "7-LED"     },
            {   "name": "8-LED"     },
            {   "name": "9-LED"     },
            {   "name": "10-LED"    },
            {   "name": "11-LED"    },
            {   "name": "12-LED"
            }
        ],
        "outputTerminals": [],
        "width": 120
    }
    ],
    "wires": [
        {
            "source": {
                "nodeID": 2,
                "terminalIndex": 6    },
            "dest": {
                "nodeID": 1,
                "terminalIndex": 7
            }
        }
    ]
};

/*var initialChartLayout = {

	nodes: [
		{
			name: "Example Node 1",
			id: 0,
			x: 0,
			y: 0,
			width: 350,
			inputTerminals: [
				{
					name: "A",
				},
				{
					name: "B",
				},
				{
					name: "C",
				},
			],
			outputTerminals: [
				{
					name: "A",
				},
				{
					name: "B",
				},
				{
					name: "C",
				},
			],
		},

		{
			name: "Example Node 2",
			id: 1,
			x: 400,
			y: 200,
			inputTerminals: [
				{
					name: "A",
				},
				{
					name: "B",
				},
				{
					name: "C",
				},
			],
			outputTerminals: [
				{
					name: "A",
				},
				{
					name: "B",
				},
				{
					name: "C",
				},
			],
		},

	],

	wires: [
		{
			source: {
				nodeID: 0,
				terminalIndex: 1,
			},

			dest: {
				nodeID: 1,
				terminalIndex: 2,
			},
		},


	]
};*/


// inputTerminals --> leftPorts
// outputTerminals --> rightPorts
// chip_LED
// chip_AND
// chip_switch chip_SWITCH
// chip_HSTI_NOT
// chip_DFF 


var chip_AND = {
    "name": "AND-7408",
    "id": 0,
    "x": 272,
    "y": 18,
    "width": 150,
    "leftPorts": [
        {
            "name": "1A"
        },
        {
            "name": "1B"
        },
        {
            "name": "1Y"
        },
        {
            "name": "2A"
        },
        {
            "name": "2B"
        },
        {
            "name": "2Y"
        },
        {
            "name": "GND"
        }
    ],
    "rightPorts": [
        {
            "name": "Vcc"
        },
        {
            "name": "4B"
        },
        {
            "name": "4A"
        },
        {
            "name": "4Y"
        },
        {
            "name": "3B"
        },
        {
            "name": "3A"
        },
        {
            "name": "3Y"
        }
    ]
};
var chip_HSTI_NOT = {
    "name": "HSTI-NOT-7414",
    "id": 2,
    "x": 64,
    "y": 562,
    "width": 150,
    "leftPorts": [
        {
            "name": "1A"
        },
        {
            "name": "1Y"
        },
        {
            "name": "2A"
        },
        {
            "name": "2Y"
        },
        {
            "name": "3A"
        },
        {
            "name": "3Y"
        },
        {
            "name": "GND"
        }
    ],
    "rightPorts": [
        {
            "name": "Vcc"
        },
        {
            "name": "6A"
        },
        {
            "name": "6Y"
        },
        {
            "name": "5A"
        },
        {
            "name": "5Y"
        },
        {
            "name": "4A"
        },
        {
            "name": "4Y"
        }
    ]
};

var chip_DFF = {
    "name": "DFF-74175",
    "id": 1,
    "x": 457,
    "y": 379,
    "width": 150,
    "leftPorts": [
        {
            "name": "CLR"
        },
        {
            "name": "1Q"
        },
        {
            "name": "~1Q"
        },
        {
            "name": "1D"
        },
        {
            "name": "2D"
        },
        {
            "name": "~2Q"
        },
        {
            "name": "2Q"
        },
        {
            "name": "GND"
        }
    ],
    "rightPorts": [
        {
            "name": "Vcc"
        },
        {
            "name": "4Q"
        },
        {
            "name": "~4Q"
        },
        {
            "name": "4D"
        },
        {
            "name": "3D"
        },
        {
            "name": "~3Q"
        },
        {
            "name": "3Q"
        },
        {
            "name": "CLK"
        }
    ]
};
var chip_NOR = {
    "name": "NOR-7402",
    "id": 10,
    "x": 272,
    "y": 319,
    "leftPorts": [
        {
            "name": "1Y"
        },
        {
            "name": "1A"
        },
        {
            "name": "1B"
        },
        {
            "name": "2Y"
        },
        {
            "name": "2A"
        },
        {
            "name": "2B"
        },
        {
            "name": "GND"
        }
    ],
    "rightPorts": [
        {
            "name": "Vcc"
        },
        {
            "name": "4Y"
        },
        {
            "name": "4B"
        },
        {
            "name": "4A"
        },
        {
            "name": "3Y"
        },
        {
            "name": "3B"
        },
        {
            "name": "3A"
        }
    ],
    "width": 150
};
var chip_switch = {
    "name": "Switch",
    "id": 11,
    "x": 22,
    "y": 9,
    "leftPorts": [
        {
            "name": "1-Off"
        },
        {
            "name": "2-Off"
        },
        {
            "name": "3-Off"
        },
        {
            "name": "4-Off"
        },
        {
            "name": "5-Off"
        },
        {
            "name": "6-Off"
        },
        {
            "name": "7-Off"
        },
        {
            "name": "8-Off"
        },
        {
            "name": "9-Off"
        },
        {
            "name": "10-Off"
        },
        {
            "name": "11-Off"
        },
        {
            "name": "12-Off"
        }
    ],
    "rightPorts": [
        {
            "name": "1-ON"
        },
        {
            "name": "2-ON"
        },
        {
            "name": "3-ON"
        },
        {
            "name": "4-ON"
        },
        {
            "name": "5-ON"
        },
        {
            "name": "6-ON"
        },
        {
            "name": "7-ON"
        },
        {
            "name": "8-ON"
        },
        {
            "name": "9-ON"
        },
        {
            "name": "10-ON"
        },
        {
            "name": "11-ON"
        },
        {
            "name": "12-ON"
        }
    ],
    "width": 120
};
var chip_LED = {
    "name": "LED",
    "id": 11,
    "x": 648,
    "y": 336,
    "leftPorts": [
        {
            "name": "1-LED"
        },
        {
            "name": "2-LED"
        },
        {
            "name": "3-LED"
        },
        {
            "name": "4-LED"
        },
        {
            "name": "5-LED"
        },
        {
            "name": "6-LED"
        },
        {
            "name": "7-LED"
        },
        {
            "name": "8-LED"
        },
        {
            "name": "9-LED"
        },
        {
            "name": "10-LED"
        },
        {
            "name": "11-LED"
        },
        {
            "name": "12-LED"
        }
    ],
    "rightPorts": [],
    "width": 120
};

