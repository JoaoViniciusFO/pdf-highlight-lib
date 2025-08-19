import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { Highlight, HighlightType } from './highlight.model';

@Directive({
  selector: '[appPdfHighlight]',
})
export class PdfHighlightDirective {
  @Output() highlightCreated = new EventEmitter<Highlight>();

  constructor(private el: ElementRef) {}

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const selection = window.getSelection();

    if (!selection || selection.toString().trim() === '') {
      return;
    }

    const startSpan = selection.focusNode?.parentElement;
    const finalSpan = selection.anchorNode?.parentElement;
    const page =
      selection.focusNode?.parentElement?.offsetParent?.['offsetParent'];

    if (!startSpan || !finalSpan || !page) {
      return;
    }

    const spanList = Array.from(
      page.children[1].children // all rendered PDF element span 
    );

    const indexSpan1 =
      spanList.indexOf(startSpan) === -1
        ? spanList.indexOf(finalSpan)
        : spanList.indexOf(startSpan);

    const indexSpan2 =
      spanList.indexOf(finalSpan) === -1
        ? spanList.indexOf(startSpan)
        : spanList.indexOf(finalSpan);

    const numPage = parseInt(page.getAttribute('data-page-number')!, 10);

    const highlight: Highlight = {
      numPage: numPage,
      numPosStart: Math.min(indexSpan1, indexSpan2),
      numPosEnd: Math.max(indexSpan1, indexSpan2),
      highlightType: 'highlight-yellow', // default value setup by user
    };

    this.highlightCreated.emit(highlight);

    this.applyHighlight((spanList as Element[]), highlight);
  }

  private applyHighlight(listaSpan: Element[], highlight: Highlight) {
    for (let i = highlight.numPosStart; i <= highlight.numPosEnd; i++) {
      const span = listaSpan[i] as HTMLElement;
      if (span) {
        span.classList.add(highlight.highlightType);
      }
    }
  }
}