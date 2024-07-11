import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  text: string[] = ['POTENCIAMOS', 'APOYAMOS', 'LIDERAMOS'];
  index: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startIndexRotation();
  }

  ngOnDestroy(): void {
    this.clearIndexRotation();
  }

  startIndexRotation(): void {
    this.intervalId = setInterval(() => {
      this.index = (this.index + 1) % this.text.length;
    }, 5000);
  }

  clearIndexRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
