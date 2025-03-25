
.iframe-container {
  width: 100%;
  height: 100vh; /* Full height for mobile */
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


import { ChangeDetectorRef, AfterViewInit } from '@angular/core';

constructor(private cdr: ChangeDetectorRef) {}

updatePDF(type, event, index) {
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

ngAfterViewInit() {
  setTimeout(() => {
    this.form.get('last')?.disable();
    this.cdr.detectChanges(); // Prevents NG0100 error
  });
}





