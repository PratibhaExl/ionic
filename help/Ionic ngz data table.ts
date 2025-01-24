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




.datatable-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}

.search-input {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
}

.pagination-controls {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.download-btn {
  display: flex;
  align-items: center;
}

.ion-icon {
  font-size: 18px;
  margin-left: 5px;
}








<div>
  <!-- Search -->
  <input
    type="text"
    placeholder="Search..."
    class="search-input"
    (input)="onSearch($event.target.value)"
  />

  <!-- Data Table -->
  <ngx-datatable
    class="material"
    [rows]="filteredRows"
    [headerHeight]="50"
    [footerHeight]="50"
    [rowHeight]="50"
    [scrollbarV]="false"
    [limit]="pageSize"
    [count]="rows.length"
    [offset]="currentPage - 1"
    (page)="setPage($event)"
  >
    <ngx-datatable-column name="File Name" prop="FileName" [width]="150"></ngx-datatable-column>
    <ngx-datatable-column name="Actions" [width]="100">
      <ng-template ngx-datatable-cell-template let-row="row">
        <ion-button fill="clear" color="primary" class="download-btn" (click)="onDownload(row)">
          <ion-icon name="download-outline"></ion-icon>
        </ion-button>
      </ng-template>
    </ngx-datatable-column>
  </ngx-datatable>
</div>




/* General Table Styling */
ngx-datatable.material {
  font-size: 14px;
  color: #333;
}

/* Search Input Styling */
.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Action Button Styling */
.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Pagination Styling */
.ngx-datatable-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Icon Styling */
ion-icon, mat-icon {
  font-size: 18px;
  vertical-align: middle;
          }




      setPage(event: any): void {
  this.currentPage = event.offset + 1;
  const start = event.offset * this.pageSize;
  const end = start + this.pageSize;
  this.filteredRows = this.rows.slice(start, end);
}


onSearch(searchText: string): void {
  this.filteredRows = this.rows.filter(row => 
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
}



      

      






      
    
