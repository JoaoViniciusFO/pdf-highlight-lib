import { Highlight, HighlightType } from './highlight.model';

export class PdfHighlightService {
  private types: HighlightType[] = [];

  constructor(types: HighlightType[]) {
    this.types = types;
  }

  applyHighlight(selection: Selection, pageElement: HTMLElement, highlight: Highlight) {
    const spans = this.getSpansFromSelection(selection, pageElement, highlight);
    spans.forEach(span => {
      const type = this.types.find(t => t.codHighlightType === highlight.highlightType);
      if (type) {
        span.setAttribute('class', type.desc);
        span.setAttribute('data-tooltip-user', highlight.nomeUsuario ?? '');
        span.setAttribute('data-seq-realce', String(highlight.idTextHighlight));
      }
    });
  }

  removeHighlight(idTextHighlight: string, root: HTMLElement) {
    const nodes = root.querySelectorAll(`[data-seq-realce="${idTextHighlight}"]`);
    nodes.forEach(n => {
      n.removeAttribute('class');
      n.removeAttribute('data-tooltip-user');
      n.removeAttribute('data-seq-realce');
    });
  }

  restoreHighlight(root: HTMLElement, highlight: Highlight) {
    const page = root.querySelector(`[data-page-number="${highlight.numPage}"]`);
    if (!page) return;

    const textLayer = page.querySelector('.textLayer');
    if (!textLayer) return;

    const spans = Array.from(textLayer.children).slice(
      highlight.numPosStart,
      highlight.numPosEnd + 1
    );

    spans.forEach(span => {
      const type = this.types.find(t => t.codHighlightType === highlight.highlightType);
      if (type) {
        span.setAttribute('class', type.desc);
        span.setAttribute('data-tooltip-user', highlight.nomeUsuario ?? '');
        span.setAttribute('data-seq-realce', String(highlight.idTextHighlight));
      }
    });
  }

  private getSpansFromSelection(selection: Selection, pageElement: HTMLElement, highlight: Highlight) {
    const textLayer = pageElement.querySelector('.textLayer');
    if (!textLayer) return [];

    const spans = Array.from(textLayer.children);
    return spans.slice(highlight.numPosStart, highlight.numPosEnd + 1);
  }
}