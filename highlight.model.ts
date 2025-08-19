export interface Highlight {
  idTextHighlight?: number;
  numPage: number;
  numPosStart: number;
  numPosEnd: number;
  highlightType: string;
  nomeUsuario?: string;
}

export interface HighlightType {
  codHighlightType: string;
  desc: string; // ex.: "highlight-yellow"
}