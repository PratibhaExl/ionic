

npm install ng2-pdf-viewer


ionic generate component PdfViewerModal


import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.scss'],
})
export class PdfViewerModalComponent {
  @Input() pdfSrc!: string; // PDF URL or base64 data

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  customAction() {
    console.log('Custom action triggered');
  }

  continueAction() {
    console.log('Continue button clicked');
    this.modalCtrl.dismiss();
  }
}

html
  
<ion-content>
  <div class="modal-container">
    <!-- Left Side Buttons -->
    <div class="left-buttons">
      <ion-button (click)="customAction()">Action 1</ion-button>
      <ion-button (click)="customAction()">Action 2</ion-button>
    </div>

    <!-- PDF Viewer -->
    <div class="pdf-viewer">
      <pdf-viewer [src]="pdfSrc" [show-all]="true" style="display: block;"></pdf-viewer>
    </div>

    <!-- Bottom Continue Button -->
    <div class="bottom-buttons">
      <ion-button expand="full" (click)="continueAction()">Continue</ion-button>
    </div>
  </div>
</ion-content>


css

  .modal-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.left-buttons {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pdf-viewer {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.bottom-buttons {
  padding: 10px;
  text-align: center;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .left-buttons {
    left: 5px;
    top: 10px;
    flex-direction: row;
  }
}


calling 

async openPdfModal() {
    const modal = await this.modalCtrl.create({
      component: PdfViewerModalComponent,
      componentProps: { pdfSrc: this.pdfUrl },
      cssClass: 'fullscreen-modal'
    });
    await modal.present();
  }



.fullscreen-modal {
  --height: 100%;
  --width: 100%;
}






///ng2 end 

//embed star

<ion-col sizeLg="9" sizeMd="9" sizeXs="12">
  <div class="embed-container">
    <embed id="PDFEmbed" type="application/pdf" width="100%" height="750px">
  </div>
</ion-col>

 ngAfterViewInit() {
  setTimeout(() => this.updatePDF(), 500);
}

updatePDF() {
  const blob = this.base64ToBlob(this.baseURL, 'application/pdf');
  const url = URL.createObjectURL(blob);

  setTimeout(() => {
    const embed = document.getElementById("PDFEmbed") as HTMLEmbedElement;
    if (embed) {
      embed.src = url;
    }
  }, 500);
}
 

.embed-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

embed {
  width: 100%;
  height: 100%;
  border: none;
}


/////embed 
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



fixAriaHidden() {
  setTimeout(() => {
    const routerOutlet = document.querySelector('ion-router-outlet');
    if (routerOutlet?.getAttribute('aria-hidden') === 'true') {
      routerOutlet.removeAttribute('aria-hidden');
    }
  }, 500);





