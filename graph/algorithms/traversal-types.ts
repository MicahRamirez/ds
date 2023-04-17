import type { Node, Edge } from "../graph";

export enum DiscoveryState {
  undiscovered = "undiscovered",
  discovered = "discovered",
  processed = "processed",
}
export enum EdgeType {
  tree = "Tree",
  back = "Back",
  cross = "Cross",
  forward = "Forward",
}
export type BFSOptions = {
  processVertex: (v: Node) => void;
  processEdge: (e: Edge) => void;
};
export type PathTree = Record<string, Node | null>;
export type NodeState = Record<string, DiscoveryState>;
export type ProcessEdgeOptions = {
  edgeState: DiscoveryState;
  pathTree: Record<string, Node>;
  from: string;
  edgeType: EdgeType;
};
