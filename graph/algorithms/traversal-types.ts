import type { Node, Edge } from "../graph";

export enum DiscoveryState {
  undiscovered = "undiscovered",
  discovered = "discovered",
  processed = "processed",
}
export type BFSOptions = {
  processVertex: (v: Node) => void;
  processEdge: (e: Edge) => void;
};
export type PathTree = Record<string, Node | null>;
