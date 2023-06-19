import { createActors, createSystems, createWorkobjects } from "./createNodes";
import { createSystemWorkobjectEdges, createWorkobjectActorEdges } from "./createEdges";

export function createInitialElements() {

    let initialNodes = [];
    let initialEgdes = [];

    let actorNodes = createActors();
    let systemNodes = createSystems();
    let workObjectNodes = createWorkobjects();

    let systemWorkObjectEdges = createSystemWorkobjectEdges(systemNodes, workObjectNodes)
    let workObjectActorEdges = createWorkobjectActorEdges();

    // Create the initial elements array which is sent to layouting function
    initialNodes = initialNodes.concat(systemNodes, actorNodes, workObjectNodes);
    initialEgdes = initialEgdes.concat(systemWorkObjectEdges, workObjectActorEdges);

    return [initialNodes, initialEgdes]
}