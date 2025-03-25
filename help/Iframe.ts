
.iframe-container {
  width: 100%;
  height: 100vh; /* Ensures full height */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.responsive-iframe {
  width: 100%;
  height: 100%;
  border: none;
}


import { AfterViewInit, Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.html',
  styleUrls: ['./your-component.css']
})
export class YourComponent implements AfterViewInit {
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.updatePDF();
    }, 500);
  }

  updatePDF() {
    const blob = this.base64ToBlob(this.baseURL, 'application/pdf');
    const url = URL.createObjectURL(blob);

    setTimeout(() => {
      const iframe = document.getElementById("IFrame") as HTMLIFrameElement;
      if (iframe) {
        iframe.src = url;
        this.cdr.detectChanges(); // Ensures UI updates correctly
      }
    }, 500);
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: mimeType });
  }
}



ngAfterViewInit() {
  setTimeout(() => {
    this.removeAriaHidden();
    this.updatePDF();
  }, 500);
}

removeAriaHidden() {
  setTimeout(() => {
    document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
      el.removeAttribute('aria-hidden');
    });
  }, 500);
}

updatePDF() {
  const blob = this.base64ToBlob(this.baseURL, 'application/pdf');
  const url = URL.createObjectURL(blob);

  setTimeout(() => {
    const iframe = document.getElementById("IFrame") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = '';
      iframe.offsetHeight; // Force reflow
      iframe.src = url;
    }
  }, 500);
}









