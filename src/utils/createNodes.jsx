import { getNodePositionWithOrigin, useReactFlow } from 'reactflow';
import * as mapping from '../data/werkstatt.json';

let actorNodes = [];
let systemNodes = [];
let workObjectNodes = [];

export const createActors = () => {
    actorNodes = [];
    const type = "iconNode";
    // Icon from the Icon-Set of Egon.io
    const icon = "Person";

    // Position is later set by dagre.js 
    let position = {
        x: 0,
        y: 0

    }

    // Get all actors from the mapping
    mapping.actors.forEach((actor) => {

        // Create Node with target-handle
        const newNode = {
            id: `actor_${actor.actor_id}`,
            type,
            position: {
                ...position
            },
            data: { label: `${actor.actor_name}`, icon: icon, handlePosition: "right", handleType: "target" }
        }
        actorNodes.push(newNode);

    });

    return actorNodes;
}

// Getting Systems
export const createSystems = () => {
    systemNodes = [];
    const type = "iconNode";
    const icon = "System";
    let position = {
        x: 200,
        y: 0
    }

    mapping.systems.forEach((system) => {
        const newNode = {
            id: `system_${system.system_id}`,
            type,
            position: {
                ...position
            },
            data: { label: `${system.name}`, icon: icon, handlePosition: "left", handleType: "source" }
        }
        systemNodes.push(newNode);
        position.y += 200;
    })

    return systemNodes;
}


// Getting Workobjects of Activitys
export const createWorkobjects = () => {
    workObjectNodes = [];
    const type = "iconNode";
    const icon = "Document";

    mapping.systems.forEach((mappingSystem) => {

        let position = {
            x: 100,
            y: -100
        }
        mappingSystem.activities.forEach((activity) => {
            const newNode = {
                id: `work_object_${activity.activity_id}`,
                type,
                position: {
                    ...position
                },
                data: { label: `${activity.workObject}`, icon: icon, handlePosition: "right", handleType: "target", secondHandleType: "source", secondHandlePosition: "left" }
            }
            workObjectNodes.push(newNode);
            position.y += 200;
        });
    });
    return workObjectNodes
}