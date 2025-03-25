
ngAfterViewInit() {
  setTimeout(() => {
    document.querySelector('ion-router-outlet')?.removeAttribute('aria-hidden');
  }, 500);
}




updatePDF(type, event, index) {
  const blob = this.base64ToBlob(this.baseURL, 'application/pdf');
  const url = URL.createObjectURL(blob);

  setTimeout(() => {
    const iframe = document.getElementById("IFrame") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = url;
    }
  }, 500);
}


.iframe-container {
  width: 100%;
  height: 100vh;  /* Full height for better mobile support */
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

