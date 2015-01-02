
//
// Define the 'app' module.
//
angular.module('app', ['flowChart', ])

//
// Simple service to create a prompt.
//
.factory('prompt', function () {

	/* Uncomment the following to test that the prompt service is working as expected.
	return function () {
		return "Test!";
	}
	*/

	// Return the browsers prompt function.
	return prompt;
})

//
// Application controller.
//
.controller('AppCtrl', ['$scope', 'prompt', function AppCtrl ($scope, prompt) {

	// Code for the delete key.
	var deleteKeyCode = 46;

	// Code for control key.
	var ctrlKeyCode = 65;

	// Set to true when the ctrl key is down.
	var ctrlDown = false;

	// Code for A key.
	var aKeyCode = 17;

	// Code for esc key.
	var escKeyCode = 27;

	// Selects the next node id.
	var nextNodeID = 10;

	//
	// Setup the data-model for the chart.
	// moved to an external file - chart-data.js
	//
	var chartDataModel = initialChartLayout;

	//
	// Event handler for key-down on the flowchart.
	$scope.keyDown = function (evt) {

		if (evt.keyCode === ctrlKeyCode) {
			ctrlDown = true;
			evt.stopPropagation();
			evt.preventDefault();
		}
	};

	//
	// Event handler for key-up on the flowchart.
	$scope.keyUp = function (evt) {

		// Delete key --> Deleted selected [chart] elements
		if (evt.keyCode === deleteKeyCode) {
			$scope.chartViewModel.deleteSelected();
		}

		// Ctrl + A --> Select All
		if (evt.keyCode == aKeyCode && ctrlDown) {
			$scope.chartViewModel.selectAll();
		}

		// Escape --> Deselect All
		if (evt.keyCode == escKeyCode) {
			$scope.chartViewModel.deselectAll();
		}

		// Ctrl key is released (for multi-key shortcuts, like ctrl+a)
		if (evt.keyCode === ctrlKeyCode) {
			ctrlDown = false;
			evt.stopPropagation();
			evt.preventDefault();
		}
	};

	//
	// Add a new node to the chart.
	//
	$scope.addNewNode = function () {

		var nodeName = prompt("Enter a node name:", "New node");
		if (!nodeName) {
			return;
		}

		// MOVE TEMPLATE FOR NEW NODE EXTERNAL........todo
		// Setup the data-model for the chart.
		// moved to an external file - chart-data.js
		//

		//
		// Template for a new node.
		//
		var newNodeDataModel = {
			name: nodeName,
			id: nextNodeID++,
			x: 0,
			y: 0,
			inputTerminals: [
			{
				name: "X"
			},
			{
				name: "Y"
			},
			{
				name: "Z"
			}
			],
			outputTerminals: [ 
			{
				name: "1"
			},
			{
				name: "2"
			},
			{
				name: "3"
			}
			],
		};

		$scope.chartViewModel.addNode(newNodeDataModel);
	};

	//
	// Add an input terminal to selected nodes.
	//
	$scope.addNewInputTerminal = function () {
		var terminalName = prompt("Enter a terminal name:", "New terminal");
		if (!terminalName) {
			return;
		}

		var selectedNodes = $scope.chartViewModel.getSelectedNodes();
		for (var i = 0; i < selectedNodes.length; ++i) {
			var node = selectedNodes[i];
			node.addInputTerminal({
				name: terminalName,
			});
		}
	};

	//
	// Add an output terminal to selected nodes.
	//
	$scope.addNewOutputTerminal = function () {
		var terminalName = prompt("Enter a terminal name:", "New terminal");
		if (!terminalName) {
			return;
		}

		var selectedNodes = $scope.chartViewModel.getSelectedNodes();
		for (var i = 0; i < selectedNodes.length; ++i) {
			var node = selectedNodes[i];
			node.addOutputTerminal({
				name: terminalName,
			});
		}
	};

	//
	// Delete selected nodes and wires.
	//
	$scope.deleteSelected = function () {
		$scope.chartViewModel.deleteSelected();
	};

	//
	// Create the view-model for the chart and attach to the scope.
	//
	$scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);
}])
;
