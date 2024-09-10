import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <nav class="pagination" aria-label="Navegação de páginas">
      <button
        (click)="onPageClick(currentPage - 1)"
        [disabled]="currentPage === 1"
        class="pagination-button"
        aria-label="Página anterior"
      >
        ◀
      </button>
      @for (page of visiblePages; track page) {
        <button
          [class.active]="page === currentPage"
          (click)="onPageClick(page)"
          class="pagination-button"
          [attr.aria-current]="page === currentPage ? 'page' : null"
          [disabled]="page === currentPage"
        >
          {{ page }}
        </button>
      }
      <button
        (click)="onPageClick(currentPage + 1)"
        [disabled]="currentPage === totalPages"
        class="pagination-button"
        aria-label="Próxima página"
      >
        ▶
      </button>
    </nav>
  `,
  styles: [
    `
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        flex-wrap: wrap;
      }
      .pagination-button {
        background-color: #f0f0f0;
        color: #333;
        border: none;
        padding: 8px 12px;
        margin: 0 4px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.3s ease;
        font-size: 14px;
      }
      .pagination-button:hover:not(:disabled) {
        background-color: #e62429;
        color: white;
      }
      .pagination-button.active,
      .pagination-button:disabled {
        background-color: #e62429;
        color: white;
        opacity: 0.5;
        cursor: not-allowed;
      }
      @media (max-width: 480px) {
        .pagination-button {
          padding: 6px 10px;
          font-size: 12px;
        }
      }
    `,
  ],
  standalone: true,
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): (number | string)[] {
    const delta = 2;
    const range: (number | string)[] = [];
    for (
      let i = Math.max(2, this.currentPage - delta);
      i <= Math.min(this.totalPages - 1, this.currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (this.currentPage - delta > 2) range.unshift('...');
    if (this.currentPage + delta < this.totalPages - 1) range.push('...');
    range.unshift(1);
    if (this.totalPages !== 1) range.push(this.totalPages);
    return range;
  }

  onPageClick(page: number | string): void {
    const numPage = typeof page === 'string' ? parseInt(page, 10) : page;
    if (
      numPage >= 1 &&
      numPage <= this.totalPages &&
      numPage !== this.currentPage
    ) {
      this.pageChange.emit(numPage);
    }
  }
}
