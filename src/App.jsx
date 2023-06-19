import React, { useState, useRef, useCallback, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'reactflow/dist/style.css'
import { Background, Controls, ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow'
import Taskbar from './components/Taskbar'
import NamePanel from './components/NamePanel'
import Sidebar from './components/Sidebar'
import IconNode from './nodes/IconNode'
import { createActors, createSystems, createWorkobjects } from './utils/createNodes'

import { createSystemWorkobjectEdges, createWorkobjectActorEdges } from './utils/createEdges'
import { createInitialElements } from './utils/createInitialElements'
import { getLayoutedElements } from './utils/layoutElements'



function App() {

  // create the initial nodes and edges from the mapping
  const [initialNodes, initialEgdes] = createInitialElements();

  // Add the custom node-type IconNode
  const nodeTypes = useMemo(() => ({ iconNode: IconNode }), []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  // Use dagre.js to layout the elements, to render a nice graph
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEgdes
  );

  // Create the node- and edge-states  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <div className="root" style={{ height: '100%' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            fitView
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={setReactFlowInstance}
            connectionLineType="straight"
            nodeTypes={nodeTypes}
          >
            {/* <Taskbar /> */}
            {/* <NamePanel /> */}
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar nodes={nodes} edges={edges} />
      </ReactFlowProvider >
    </div >
  )
}

export default App
