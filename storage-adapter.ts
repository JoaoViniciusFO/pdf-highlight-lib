import { Highlight } from './highlight.model';
import { Observable } from 'rxjs';

export interface HighlightStorageAdapter {
  saveHighlight(highlight: Highlight): Observable<Highlight>;
  deleteHighlight(idTextHighlight: number): Observable<void>;
  fetchHighlights(): Observable<Highlight[]>;
}