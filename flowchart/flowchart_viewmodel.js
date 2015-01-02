
//
// Global accessor.
//
var flowchart = {

};

// Module.
(function () {

/*
	// vertical placement/Y value of node name label
	flowchart.defaultLabelHeight = function() { return 25;}

	// horizontal offset to add to label x position
	flowchart.defaultLabelOffset = function() { return 20;}

*/
	//
	// Width of a node.
	//
	flowchart.defaultNodeWidth = 150; // 250

	//
	// Amount of space reserved for displaying the node's name.
	//
	flowchart.nodeNameHeight = 40;

	//
	// Height of a terminal in a node.
	//
	flowchart.terminalHeight = 20; //flowchart.connectorHeight = 20; //35;

	//
	// Compute the Y coordinate of a terminal, given its index.
	//
	flowchart.computeTerminalY = function (terminalIndex) {
		return flowchart.nodeNameHeight + (terminalIndex * flowchart.terminalHeight);
	}

	//
	// Compute the position of a terminal in the graph.
	//
	flowchart.computeTerminalPos = function (node, terminalIndex, inputTerminal) {
		return {
			x: node.x() + (inputTerminal ? 0 : node.width ? node.width : flowchart.defaultNodeWidth),
			y: node.y() + flowchart.computeTerminalY(terminalIndex),
		};
	};


	// ------------------------------------------------------------
	//
	// View model for a terminal. (nee connector)
	//
	flowchart.TerminalViewModel = function (terminalDataModel, x, y, parentNode) {

		this.data = terminalDataModel;
		this._parentNode = parentNode;
		this._x = x;
		this._y = y;

		// The name of the terminal.
		this.name = function () { return this.data.name; }

		// X coordinate of the terminal.
		this.x = function () { return this._x; };

		// Y coordinate of the terminal.
		this.y = function () { return this._y; };

		// The parent node that the terminal is attached to.
		this.parentNode = function () {	return this._parentNode; };
	};

	//
	// Create view model for a list of data models.
	//
	var createTerminalsViewModel = function (terminalDataModels, x, parentNode) {
		var viewModels = [];

		if (terminalDataModels) {
			for (var i = 0; i < terminalDataModels.length; ++i) {
				var terminalViewModel = 
					new flowchart.TerminalViewModel(terminalDataModels[i], x, flowchart.computeTerminalY(i), parentNode);
				viewModels.push(terminalViewModel);
			}
		}

		return viewModels;
	};


	// ------------------------------------------------------------
	//
	// View model for a node.
	//
	flowchart.NodeViewModel = function (nodeDataModel) {


		//
		//
		//

		// vertical placement/Y value of node name label
		this.defaultLabelHeight = function () { return 25; };

		// horizontal offset to add to label x position
		this.defaultLabelOffset = function() { return 20; };

		this.cornerRad = function() { return 10; };

		//
		//
		//


		this.data = nodeDataModel;

		// Set the default width value of the node
		if (!this.data.width || this.data.width < 0) {
			this.data.width = flowchart.defaultNodeWidth;
		}
		this.inputTerminals = createTerminalsViewModel(this.data.inputTerminals, 0, this);
		this.outputTerminals = createTerminalsViewModel(this.data.outputTerminals, this.data.width, this);

		// Set to true when the node is selected.
		this._selected = false;


		// Name of the node.
		this.name = function () { return this.data.name || ""; };

		// X coordinate of the node.
		this.x = function () { return this.data.x; };

		// Y coordinate of the node.
		this.y = function () { return this.data.y; };

		// Width of the node.
		this.width = function () { return this.data.width; }

		//
		// Height of the node.
		//
		this.height = function () {
			var numTerminals =
				Math.max(
					this.inputTerminals.length, 
					this.outputTerminals.length);
			return flowchart.computeTerminalY(numTerminals);
		}

		// Select the node.
		this.select = function () { this._selected = true; };

		// Deselect the node.
		this.deselect = function () { this._selected = false; };

		// Toggle the selection state of the node.
		this.toggleSelected = function () {
			this._selected = !this._selected;
		};

		// Returns true if the node is selected.
		this.selected = function () { return this._selected; };

		//
		// Internal function to add a terminal.
		this._addTerminal = function (terminalDataModel, x, terminalsDataModel, terminalsViewModel) {
			var terminalViewModel = 
				new flowchart.TerminalViewModel(terminalDataModel, x, 
						flowchart.computeTerminalY(terminalsViewModel.length), this);

			terminalsDataModel.push(terminalDataModel);

			// Add to node's view model.
			terminalsViewModel.push(terminalViewModel);
		}

		//
		// Add an input terminal to the node.
		this.addInputTerminal = function (terminalDataModel) {

			if (!this.data.inputTerminals) {
				this.data.inputTerminals = [];
			}
			this._addTerminal(terminalDataModel, 0, this.data.inputTerminals, this.inputTerminals);
		};

		//
		// Add an ouput terminal to the node.
		this.addOutputTerminal = function (terminalDataModel) {

			if (!this.data.outputTerminals) {
				this.data.outputTerminals = [];
			}
			this._addTerminal(terminalDataModel, this.data.width, this.data.outputTerminals, this.outputTerminals);
		};
	};

	// 
	// Wrap the nodes data-model in a view-model.
	var createNodesViewModel = function (nodesDataModel) {
		var nodesViewModel = [];

		if (nodesDataModel) {
			for (var i = 0; i < nodesDataModel.length; ++i) {
				nodesViewModel.push(new flowchart.NodeViewModel(nodesDataModel[i]));
			}
		}

		return nodesViewModel;
	};


	// ------------------------------------------------------------
	//
	// View model for a connection.
	//
	flowchart.ConnectionViewModel = function (connectionDataModel, sourceTerminal, destTerminal) {

		this.data = connectionDataModel;
		this.source = sourceTerminal;
		this.dest = destTerminal;

		// Set to true when the connection is selected.
		this._selected = false;

		this.sourceCoordX = function () { 
			return this.source.parentNode().x() + this.source.x();
		};

		this.sourceCoordY = function () { 
			return this.source.parentNode().y() + this.source.y();
		};

		this.sourceCoord = function () {
			return {
				x: this.sourceCoordX(),
				y: this.sourceCoordY()
			};
		}

		this.sourceTangentX = function () { 
			return flowchart.computeConnectionSourceTangentX(this.sourceCoord(), this.destCoord());
		};

		this.sourceTangentY = function () { 
			return flowchart.computeConnectionSourceTangentY(this.sourceCoord(), this.destCoord());
		};

		this.destCoordX = function () { 
			return this.dest.parentNode().x() + this.dest.x();
		};

		this.destCoordY = function () { 
			return this.dest.parentNode().y() + this.dest.y();
		};

		this.destCoord = function () {
			return {
				x: this.destCoordX(),
				y: this.destCoordY()
			};
		}

		this.destTangentX = function () { 
			return flowchart.computeConnectionDestTangentX(this.sourceCoord(), this.destCoord());
		};

		this.destTangentY = function () { 
			return flowchart.computeConnectionDestTangentY(this.sourceCoord(), this.destCoord());
		};

		// Select the connection.
		this.select = function () { this._selected = true; };

		// Deselect the connection.
		this.deselect = function () { this._selected = false; };

		// Toggle the selection state of the connection.
		this.toggleSelected = function () {
			this._selected = !this._selected;
		};

		// Returns true if the connection is selected.
		this.selected = function () { return this._selected; };
	};


	// ------------------------------------------------------------
	//
	// Helper function.
	//
	var computeConnectionTangentOffset = function (pt1, pt2) {
		return (pt2.x - pt1.x) / 2;	
	}

	//
	// Compute the tangent for the bezier curve.
	flowchart.computeConnectionSourceTangentX = function (pt1, pt2) {
		return pt1.x + computeConnectionTangentOffset(pt1, pt2);
	};

	//
	// Compute the tangent for the bezier curve.
	flowchart.computeConnectionSourceTangentY = function (pt1, pt2) {
		return pt1.y;
	};

	//
	// Compute the tangent for the bezier curve.
	flowchart.computeConnectionSourceTangent = function(pt1, pt2) {
		return {
			x: flowchart.computeConnectionSourceTangentX(pt1, pt2),
			y: flowchart.computeConnectionSourceTangentY(pt1, pt2),
		};
	};

	//
	// Compute the tangent for the bezier curve.
	flowchart.computeConnectionDestTangentX = function (pt1, pt2) {
		return pt2.x - computeConnectionTangentOffset(pt1, pt2);
	};

	//
	// Compute the tangent for the bezier curve.
	flowchart.computeConnectionDestTangentY = function (pt1, pt2) {
		return pt2.y;
	};

	//
	// Compute the tangent for the bezier curve.
	flowchart.computeConnectionDestTangent = function(pt1, pt2) {
		return {
			x: flowchart.computeConnectionDestTangentX(pt1, pt2),
			y: flowchart.computeConnectionDestTangentY(pt1, pt2),
		};
	};


	// ------------------------------------------------------------
	//
	// View model for the chart.
	//
	flowchart.ChartViewModel = function (chartDataModel) {

		//
		// Find a specific node within the chart.
		//
		this.findNode = function (nodeID) {

			for (var i = 0; i < this.nodes.length; ++i) {
				var node = this.nodes[i];
				if (node.data.id == nodeID) {
					return node;
				}
			}

			throw new Error("Failed to find node " + nodeID);
		};

		//
		// Find a specific input terminal within the chart.
		//
		this.findInputTerminal = function (nodeID, terminalIndex) {

			var node = this.findNode(nodeID);

			if (!node.inputTerminals || node.inputTerminals.length <= terminalIndex) {
				throw new Error("Node " + nodeID + " has invalid input terminals.");
			}

			return node.inputTerminals[terminalIndex];
		};

		//
		// Find a specific output terminal within the chart.
		//
		this.findOutputTerminal = function (nodeID, terminalIndex) {

			var node = this.findNode(nodeID);

			if (!node.outputTerminals || node.outputTerminals.length <= terminalIndex) {
				throw new Error("Node " + nodeID + " has invalid output terminals.");
			}

			return node.outputTerminals[terminalIndex];
		};

		//
		// Create a view model for connection from the data model.
		//
		this._createConnectionViewModel = function(connectionDataModel) {

			var sourceTerminal = this.findOutputTerminal(connectionDataModel.source.nodeID, connectionDataModel.source.terminalIndex);
			var destTerminal = this.findInputTerminal(connectionDataModel.dest.nodeID, connectionDataModel.dest.terminalIndex);			
			return new flowchart.ConnectionViewModel(connectionDataModel, sourceTerminal, destTerminal);
		}

		// 
		// Wrap the connections data-model in a view-model.
		//
		this._createConnectionsViewModel = function (connectionsDataModel) {

			var connectionsViewModel = [];

			if (connectionsDataModel) {
				for (var i = 0; i < connectionsDataModel.length; ++i) {
					connectionsViewModel.push(this._createConnectionViewModel(connectionsDataModel[i]));
				}
			}

			return connectionsViewModel;
		};

		// Reference to the underlying data.
		this.data = chartDataModel;

		// Create a view-model for nodes.
		this.nodes = createNodesViewModel(this.data.nodes);

		// Create a view-model for connections.
		this.connections = this._createConnectionsViewModel(this.data.connections);

		//
		// Create a view model for a new connection.
		//
		this.createNewConnection = function (startTerminal, endTerminal) {

			var connectionsDataModel = this.data.connections;
			if (!connectionsDataModel) {
				connectionsDataModel = this.data.connections = [];
			}

			var connectionsViewModel = this.connections;
			if (!connectionsViewModel) {
				connectionsViewModel = this.connections = [];
			}

			var startNode = startTerminal.parentNode();
			var startTerminalIndex = startNode.outputTerminals.indexOf(startTerminal);
			var startTerminalType = 'output';
			if (startTerminalIndex == -1) {
				startTerminalIndex = startNode.inputTerminals.indexOf(startTerminal);
				startTerminalType = 'input';
				if (startTerminalIndex == -1) {
					throw new Error("Failed to find source terminal within either inputTerminals or outputTerminals of source node.");
				}
			}

			var endNode = endTerminal.parentNode();
			var endTerminalIndex = endNode.inputTerminals.indexOf(endTerminal);
			var endTerminalType = 'input';
			if (endTerminalIndex == -1) {
				endTerminalIndex = endNode.outputTerminals.indexOf(endTerminal);
				endTerminalType = 'output';
				if (endTerminalIndex == -1) {
					throw new Error("Failed to find dest terminal within inputTerminals or outputTerminals of dest node.");
				}
			}

			if (startTerminalType == endTerminalType) {
				throw new Error("Failed to create connection. Only output to input connections are allowed.")
			}

			if (startNode == endNode) {
				throw new Error("Failed to create connection. Cannot link a node with itself.")
			}

			var startNode = {
				nodeID: startNode.data.id,
				terminalIndex: startTerminalIndex,
			}

			var endNode = {
				nodeID: endNode.data.id,
				terminalIndex: endTerminalIndex,
			}

			var connectionDataModel = {
				source: startTerminalType == 'output' ? startNode : endNode,
				dest: startTerminalType == 'output' ? endNode : startNode,
			};
			connectionsDataModel.push(connectionDataModel);

			var outputTerminal = startTerminalType == 'output' ? startTerminal : endTerminal;
			var inputTerminal = startTerminalType == 'output' ? endTerminal : startTerminal;

			var connectionViewModel = new flowchart.ConnectionViewModel(connectionDataModel, outputTerminal, inputTerminal);
			connectionsViewModel.push(connectionViewModel);
		};

		//
		// Add a node to the view model.
		//
		this.addNode = function (nodeDataModel) {
			if (!this.data.nodes) {
				this.data.nodes = [];
			}

			// Update the data model.
			this.data.nodes.push(nodeDataModel);

			// Update the view model.
			this.nodes.push(new flowchart.NodeViewModel(nodeDataModel));		
		}

		//
		// Select all nodes and connections in the chart.
		this.selectAll = function () {

			var nodes = this.nodes;
			for (var i = 0; i < nodes.length; ++i) {
				var node = nodes[i];
				node.select();
			}

			var connections = this.connections;
			for (var i = 0; i < connections.length; ++i) {
				var connection = connections[i];
				connection.select();
			}			
		}

		//
		// Deselect all nodes and connections in the chart.
		this.deselectAll = function () {

			var nodes = this.nodes;
			for (var i = 0; i < nodes.length; ++i) {
				var node = nodes[i];
				node.deselect();
			}

			var connections = this.connections;
			for (var i = 0; i < connections.length; ++i) {
				var connection = connections[i];
				connection.deselect();
			}
		};

		//
		// Update the location of the node and its terminals.
		//
		this.updateSelectedNodesLocation = function (deltaX, deltaY) {

			var selectedNodes = this.getSelectedNodes();

			for (var i = 0; i < selectedNodes.length; ++i) {
				var node = selectedNodes[i];
				node.data.x += deltaX;
				node.data.y += deltaY;
			}
		};

		//
		// Handle mouse click on a particular node.
		//
		this.handleNodeClicked = function (node, ctrlKey) {

			if (ctrlKey) {
				node.toggleSelected();
			}
			else {
				this.deselectAll();
				node.select();
			}

			// Move node to the end of the list so it is rendered after all the other.
			// This is the way Z-order is done in SVG.

			var nodeIndex = this.nodes.indexOf(node);
			if (nodeIndex == -1) {
				throw new Error("Failed to find node in view model!");
			}
			this.nodes.splice(nodeIndex, 1);
			this.nodes.push(node);			
		};

		//
		// Handle mouse down on a connection.
		//
		this.handleConnectionMouseDown = function (connection, ctrlKey) {

			if (ctrlKey) {
				connection.toggleSelected();
			}
			else {
				this.deselectAll();
				connection.select();
			}
		};

		//
		// Delete all nodes and connections that are selected.
		//
		this.deleteSelected = function () {

			var newNodeViewModels = [];
			var newNodeDataModels = [];

			var deletedNodeIds = [];

			//
			// Sort nodes into:
			//		nodes to keep vs. nodes to delete.
			//		
			for (var nodeIndex = 0; nodeIndex < this.nodes.length; ++nodeIndex) {

				var node = this.nodes[nodeIndex];
				if (!node.selected()) {
					// Only retain non-selected nodes.
					newNodeViewModels.push(node);
					newNodeDataModels.push(node.data);
				}
				else {
					// Keep track of nodes that were deleted, so their connections can also
					// be deleted.
					deletedNodeIds.push(node.data.id);
				}
			}

			var newConnectionViewModels = [];
			var newConnectionDataModels = [];

			//
			// Remove connections that are selected.
			// Also remove connections for nodes that have been deleted.
			//
			for (var connectionIndex = 0; connectionIndex < this.connections.length; ++connectionIndex) {

				var connection = this.connections[connectionIndex];				
				if (!connection.selected() &&
					deletedNodeIds.indexOf(connection.data.source.nodeID) === -1 &&
					deletedNodeIds.indexOf(connection.data.dest.nodeID) === -1)
				{
					//
					// The nodes this connection is attached to, where not deleted,
					// so keep the connection.
					//
					newConnectionViewModels.push(connection);
					newConnectionDataModels.push(connection.data);
				}
			}

			//
			// Update nodes and connections.
			//
			this.nodes = newNodeViewModels;
			this.data.nodes = newNodeDataModels;
			this.connections = newConnectionViewModels;
			this.data.connections = newConnectionDataModels;
		};

		//
		// Select nodes and connections that fall within the selection rect.
		//
		this.applySelectionRect = function (selectionRect) {

			this.deselectAll();

			for (var i = 0; i < this.nodes.length; ++i) {
				var node = this.nodes[i];
				if (node.x() >= selectionRect.x && 
					node.y() >= selectionRect.y && 
					node.x() + node.width() <= selectionRect.x + selectionRect.width &&
					node.y() + node.height() <= selectionRect.y + selectionRect.height)
				{
					// Select nodes that are within the selection rect.
					node.select();
				}
			}

			for (var i = 0; i < this.connections.length; ++i) {
				var connection = this.connections[i];
				if (connection.source.parentNode().selected() &&
					connection.dest.parentNode().selected())
				{
					// Select the connection if both its parent nodes are selected.
					connection.select();
				}
			}

		};

		//
		// Get the array of nodes that are currently selected.
		//
		this.getSelectedNodes = function () {
			var selectedNodes = [];

			for (var i = 0; i < this.nodes.length; ++i) {
				var node = this.nodes[i];
				if (node.selected()) {
					selectedNodes.push(node);
				}
			}

			return selectedNodes;
		};

		//
		// Get the array of connections that are currently selected.
		//
		this.getSelectedConnections = function () {
			var selectedConnections = [];

			for (var i = 0; i < this.connections.length; ++i) {
				var connection = this.connections[i];
				if (connection.selected()) {
					selectedConnections.push(connection);
				}
			}

			return selectedConnections;
		};
		

	};

})();
