import { MarkerType } from 'reactflow';
import * as mapping from '../data/werkstatt.json';


export const createSystemWorkobjectEdges = () => {
    let serviceWorkObjectEdges = [];
    mapping.systems.forEach((system) => {
        system.activities.forEach((activity) => {
            const newEdge = {
                id: `system_work_object_${activity.activity_id}`,
                mappingId: activity.activity_id,
                source: `system_${system.system_id}`,
                system: system.system_id,
                activity: activity.activity_id,
                type: 'smoothstep',
                target: `work_object_${activity.activity_id}`,
                name: activity.name,
                parametrization: {
                    path_variables: activity.endpoint.path_variables,
                    payload: activity.endpoint.payload,
                    request_parameter: activity.endpoint.request_parameter,
                    url_parameter: activity.endpoint.url_parameter
                },
                markerStart: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20
                },
                selected: false,
                label: "in"
            }
            serviceWorkObjectEdges.push(newEdge);
        })
    })
    return serviceWorkObjectEdges;
}

export const createWorkobjectActorEdges = () => {
    let workObjectActorEdges = [];
    mapping.systems.forEach((system) => {
        system.activities.forEach((activity) => {
            const newEdge = {
                id: `work_object_actor_${activity.activity_id}`,
                mappingId: activity.activity_id,
                name: activity.name,
                parametrization: { path_variables: activity.endpoint.path_variables, url_parameter: activity.endpoint.url_parameter, payload: activity.endpoint.payload, request_parameters: activity.endpoint.request_parameter },
                source: `work_object_${activity.activity_id}`,
                target: `actor_${activity.initiator}`,
                system: system.system_id,
                type: 'smoothstep',
                label: activity.action,
                selected: false,
                markerStart: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20
                }
            }
            workObjectActorEdges.push(newEdge);
        })
    })
    return workObjectActorEdges;
}