import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaData } from '../../../models/nasa.model';

@Component({
  selector: 'app-nasa-img-today',
  imports: [CommonModule],
  templateUrl: './nasa-img-today.component.html',
  styleUrl: './nasa-img-today.component.css'
})
export class NasaImgTodayComponent {
  @Input() nasaData!: NasaData;
  isExpanded = false;
  maxLength = 150;

  get truncatedExplanation(): string {
    if (this.isExpanded || !this.nasaData.explanation) {
      return this.nasaData.explanation;
    }
    return this.nasaData.explanation.slice(0, this.maxLength) + '...';
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
