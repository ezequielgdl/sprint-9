import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="relative">
      <button
        type="button"
        (click)="toggleDropdown(); $event.stopPropagation()"
        class="bg-white border rounded p-2 w-full text-left"
      >
        <ng-container *ngIf="selectedItems.length > 0; else defaultText">
          <span
            *ngFor="let item of selectedItems; let i = index"
            class="inline-block bg-orange-700 text-white rounded-full px-2 py-1 mr-1 mb-1"
          >
            {{ item }}
            <button type="button" class="ml-1" (click)="removeItem(item)">
              <svg
                class="w-3 h-3 fill-current text-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 3.293a1 1 0 0 1 1.414 0L10 8.586l5.293-5.293a1 1 0 1 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 1 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 10 3.293 4.707a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </button>
          </span>
        </ng-container>
        <ng-template #defaultText>Seleccionar opciones</ng-template>
      </button>
      <ul
        (click)="$event.stopPropagation()"
        *ngIf="isOpen"
        class="absolute bg-white border rounded mt-2 w-full max-h-60 overflow-auto z-10"
      >
        <li>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="filterOptions()"
            class="p-2 w-full border-b"
            placeholder="Buscar..."
          />
        </li>
        <li
          *ngFor="let option of filteredOptions"
          class="p-2 hover:bg-gray-100"
        >
          <label class="flex items-center">
            <input
              type="checkbox"
              [checked]="selectedItems.includes(option)"
              (change)="onSelect(option)"
            />
            <span class="ml-2">{{ option }}</span>
          </label>
        </li>
      </ul>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor {
  options = [
    'Administrativo y Clerical',
    'Artes Creativas y Diseño',
    'Bienes Raíces',
    'Ciencia e Investigación',
    'Consultoría',
    'Contabilidad y Finanzas',
    'Educación',
    'Hospitalidad y Turismo',
    'Ingeniería',
    'Legal',
    'Manufactura y Producción',
    'Marketing y Publicidad',
    'Recursos Humanos',
    'Retail y Ventas',
    'Salud y Medicina',
    'Servicio al Cliente',
    'Sin Fines de Lucro y Servicios Sociales',
    'Tecnologías de la Información (TI)',
    'Transporte y Logística',
    'Ventas',
  ];

  filteredOptions = [...this.options];
  selectedItems: string[] = [];
  isOpen = false;
  searchTerm = '';

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  filterOptions() {
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSelect(option: string) {
    if (this.selectedItems.includes(option)) {
      this.selectedItems = this.selectedItems.filter((item) => item !== option);
    } else {
      this.selectedItems.push(option);
    }
    this.onChange(this.selectedItems);
  }

  removeItem(item: string) {
    this.selectedItems = this.selectedItems.filter((i) => i !== item);
    this.onChange(this.selectedItems);
  }

  writeValue(value: string[]): void {
    if (value) {
      this.selectedItems = value;
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
