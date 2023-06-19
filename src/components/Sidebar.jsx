import React, { useState } from 'react'
import Icon from '../nodes/nodeComponents/Icon';
import LoadTestMenu from './LoadTestMenu';
import { useEdges, useOnSelectionChange, useReactFlow, useStore } from 'reactflow';


export default function Sidebar(props) {

    const [edgeSelected, setEgdeSelected] = useState(false);
    const [selectedEdge, setSelectedEdge] = useState(null);
    const reactFlowInstance = useReactFlow();

    const selectionChange = useOnSelectionChange({
        onChange: ({ edges }) => {
            if (edges[0]) {

                setSelectedEdge(edges[0]);

                let relatedEdgesArray = reactFlowInstance.getEdges().filter((edge) => edge.name == edges[0].name);
                let unrelatedEdgesArray = reactFlowInstance.getEdges().filter((edge) => edge.name != edges[0].name);

                let newEdgeArray = []

                unrelatedEdgesArray.forEach((edge) => {
                    edge.animated = false;
                    edge.style = {}
                })

                relatedEdgesArray.forEach((edge) => {
                    edge.selected = true;
                    edge.animated = true;
                    edge.style = {
                        stroke: '#FF0072'
                    }
                })

                newEdgeArray = newEdgeArray.concat(unrelatedEdgesArray, relatedEdgesArray);
                reactFlowInstance.setEdges(newEdgeArray);
            }
            else {
                setSelectedEdge();
                let updatedEdgesArray = reactFlowInstance.getEdges()
                updatedEdgesArray.forEach((edge) => {
                    edge.animated = false;
                    edge.style = {

                    }
                });
                reactFlowInstance.setEdges(updatedEdgesArray);
            }
        }
    });

    return (
        <div className="sidebar">
            <div className='taskbar-container'>
                <button><div className="icon-domain-story-loadtest"></div></button>
                <button><div className="icon-domain-story-monitoring"></div></button>
                <button><div className="icon-domain-story-chaosexperiment"></div></button>
            </div>
            {selectedEdge ? <LoadTestMenu selectedEdge={selectedEdge} edges={props.edges} /> : null}
        </div>


    )
}
