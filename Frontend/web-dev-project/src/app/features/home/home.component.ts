import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NasaData } from '../../models/nasa.model';
import { NasaService } from '../../core/services/nasa/nasa.service';
import { CommonModule } from '@angular/common';
import { NasaImgTodayComponent } from '../../shared/components/nasa-img-today/nasa-img-today.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NasaImgTodayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nasaData: NasaData[] = [];
  loading = true;

  constructor(private nasaService: NasaService) {}

  ngOnInit() {
    this.nasaService.getImages({ start_date: "2025-01-01" }).subscribe({
      next: (data) => {
        this.nasaData = data.reverse();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }
}
