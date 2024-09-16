import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <form (ngSubmit)="onSubmit()" class="search-form">
      <div class="search-input-wrapper">
        <input
          [formControl]="searchTerm"
          placeholder="Buscar heróis..."
          class="search-input"
        />
        <button type="submit" class="search-button">
          <span class="search-icon">🔍</span>
          <span class="search-text">Buscar</span>
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .search-form {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      .search-input-wrapper {
        display: flex;
        background-color: #ffffff;
        border-radius: 25px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
      }
      .search-input-wrapper:focus-within {
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
      }
      .search-input {
        border: none;
        padding: 12px 20px;
        font-size: 1em;
        width: 300px;
        outline: none;
      }
      .search-button {
        background-color: #e62429;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
      }
      .search-button:hover {
        background-color: #c61017;
      }
      .search-icon {
        margin-right: 8px;
      }
      @media (max-width: 480px) {
        .search-text {
          display: none;
        }
        .search-input {
          width: 200px;
        }
      }
    `,
  ],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchTerm = new FormControl('');

  ngOnInit(): void {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(
          (term) => term !== null && (term.length > 2 || term.length === 0),
        ),
      )
      .subscribe((term) => {
        this.search.emit(term ?? '');
      });
  }

  onSubmit(): void {
    if (this.searchTerm.value !== null) {
      this.search.emit(this.searchTerm.value);
    }
  }
}
