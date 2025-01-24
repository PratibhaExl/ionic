<ngx-datatable
  class="material dt-font-size"
  [rows]="filteredRows"
  [columns]="columns"
  [headerHeight]="50"
  [footerHeight]="50"
  [rowHeight]="50"
  [scrollbarV]="false"
  [limit]="pageSize"
  [count]="totalRecords"
  [offset]="currentPage - 1"
  (page)="setPage($event)"
>
  <!-- File Name Column -->
  <ngx-datatable-column name="File Name" prop="FileName" [width]="150"></ngx-datatable-column>
  
  <!-- File Path Column -->
  <ngx-datatable-column name="File Path" prop="FilePath" [width]="250"></ngx-datatable-column>
  
  <!-- Bucket Name Column -->
  <ngx-datatable-column name="Bucket Name" prop="BucketName" [width]="150"></ngx-datatable-column>
  
  <!-- NPN Column -->
  <ngx-datatable-column name="NPN" prop="NPN" [width]="100"></ngx-datatable-column>
  
  <!-- Actions Column -->
  <ngx-datatable-column name="Actions" [width]="100">
    <ng-template ngx-datatable-cell-template let-row="row">
      <ion-button
        fill="clear"
        color="primary"
        class="download-btn"
        (click)="onDownload(row)"
      >
        <ion-icon name="download-outline"></ion-icon>
      </ion-button>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>

<!-- Pagination Controls -->
<div class="pagination-controls">
  <ion-footer>
    <div class="footer-content">
      Total Rows: {{ totalRecords }}
    </div>
    <ngx-datatable-footer
      [pagerLeftArrowIcon]="'arrow-back'"
      [pagerRightArrowIcon]="'arrow-forward'"
      [pagerPreviousIcon]="'chevron-back'"
      [pagerNextIcon]="'chevron-forward'"
    ></ngx-datatable-footer>
  </ion-footer>
</div>
    
