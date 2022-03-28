import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
} from '@angular/core';
import {calculatePaginationStart} from "../../utils/pagination/calculate-pagination-start";

export interface PaginationEvent {
  startForBackend: number
  start: number
  rows: number
}

interface SelectOption {
  value: number,
  disabled: boolean
  selected: boolean
}

/**
 * Пагинатор
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  currentPage = 1;
  rowsDisplay = 0;
  computedRowsList?: SelectOption[];
  pagesTotal = 0

  @Input()
  start = 0
  @Input()
  rows?: number
  @Input()
  numFound?: number
  @Input()
  pagesDisplayNormalization = 1;
  @Input()
  rowsList = [
    10, 15, 30, 50, 100, 500
  ]

  @Output()
  paginationEvent = new EventEmitter<PaginationEvent>()

  onRowsChange() {
    const rows = Number(this.rowsDisplay);
    this.onPaginationChange(
      0,
      rows,
    );
  }

  currentPageChange() {
    const {currentPage, pagesTotal} = this;
    if (currentPage < 1) {
      this.currentPage = 1;
    }
    if (currentPage > pagesTotal) {
      this.currentPage = pagesTotal;
    }
    this.calculateCurrentPage()
    this.onPaginationChange(
      Number(this.start),
      Number(this.rowsDisplay),
    );
  }

  onPaginationChange(start: number, rows: number) {
    this.paginationEvent.emit({
      startForBackend: calculatePaginationStart({start, rows, numFound: Number(this.numFound)}),
      start,
      rows,
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const pagesDisplayNormalization = changes['pagesDisplayNormalization'] ?
      changes['pagesDisplayNormalization'].currentValue
      : this.pagesDisplayNormalization;

    const start = changes['start'] ? changes['start'].currentValue : this.start;
    const rows = changes['rows'] ? changes['rows'].currentValue : this.rows;
    const numFound = changes['numFound'] ? changes['numFound'].currentValue : this.numFound;
    const rowsList = changes['rowsList'] ? changes['rowsList'].currentValue : this.rowsList;

    if (rowsList) {
      this.computedRowsList = rowsList?.map((option: number) => ({
        selected: rows == option,
        value: option,
        // disabled: PaginationComponent.isOptionDisabled(option, numFound)
      }))
    }
    this.currentPage = start + pagesDisplayNormalization
    this.rowsDisplay = Number(this.rows)
    this.calculatePagesTotal()
  }

  private calculatePagesTotal() {
    const {numFound, rows} = this;
    this.pagesTotal = Math.ceil(Number(numFound) / Number(rows))
  }

  private calculateCurrentPage() {
    this.start = Number(this.currentPage) - this.pagesDisplayNormalization;
  }

  // private static isOptionDisabled(option: number, numFound: number) {
  //   return isNaN(numFound) ? false : option > numFound
  // }
}
