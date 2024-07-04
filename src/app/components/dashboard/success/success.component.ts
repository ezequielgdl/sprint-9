import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {
  @Input() show: boolean = false;
  @Input() message: string = 'Operation completed successfully!';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.show = false;
    this.close.emit();
  }
}
