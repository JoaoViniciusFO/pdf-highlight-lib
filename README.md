# pdf-highlight-lib

A lightweight Angular directive library to enable **text highlighting inside PDFs** rendered with [`ngx-extended-pdf-viewer`](https://github.com/stephanrauh/ngx-extended-pdf-viewer).  

---

## 🚀 Features

- Select and highlight text inside PDFs
- Supports multiple highlight types (yellow, green, underline, etc.)
- Works seamlessly with `ngx-extended-pdf-viewer`
- Easy integration with Angular apps
- Configurable highlight types and styles

---

## 🚀 Usages
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfHighlightModule } from 'ngx-pdf-highlight';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxExtendedPdfViewerModule,
    PdfHighlightModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```
<!-- app.component.html -->
<ngx-extended-pdf-viewer
  [src]="'/assets/sample.pdf'"
  [textLayer]="true"
  appPdfHighlight
  [types]="highlightTypes"
  (highlightCreated)="onHighlightCreated($event)">
</ngx-extended-pdf-viewer>
```

```
import { Component } from '@angular/core';
import { Highlight, HighlightType } from 'ngx-pdf-highlight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  highlightTypes: HighlightType[] = [
    { codHighlightType: 'highlight-yellow', desc: 'Yellow Highlight' },
    { codHighlightType: 'highlight-green', desc: 'Green Highlight' },
    { codHighlightType: 'underline-red', desc: 'Red Underline' }
  ];

  onHighlightCreated(highlight: Highlight) {
    console.log('New Highlight:', highlight);
    // Example: save highlight to backend
    // this.http.post('/api/highlights', highlight).subscribe();
  }
}
```

```
export interface Highlight {
  idTextHighlight?: number;
  numPage: number;
  numPosStart: number;
  numPosEnd: number;
  highlightType: string;
  user?: string;
}

export interface HighlightType {
  codHighlightType: string;
  desc: string; // ex.: "highlight-yellow"
}
```

```
.highlight-yellow {
  background-color: yellow;
}

.highlight-green {
  background-color: lightgreen;
}

.underline-red {
  text-decoration: underline;
  text-decoration-color: red;
}
```

```
this.storage.fetchHighlights().subscribe(highlights => {
  highlights.forEach(h => {
    this.pdfHighlightService.restoreHighlight(pdfElement, h);
  });
});
```