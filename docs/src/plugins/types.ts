export type Node = {
  lang: string;
  type: string;
  value: string;
  parent?: Node;
  children?: Node[];
  url?: string;
  // position: { start?: number, end?: number };
};
