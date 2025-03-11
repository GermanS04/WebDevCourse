import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NasaData } from '../../models/nasa.model';
import { NasaService } from '../../core/services/nasa/nasa.service';
import { CommonModule } from '@angular/common';
import { NasaImgTodayComponent } from '../../shared/components/nasa-img-today/nasa-img-today.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NasaImgTodayComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nasaData: NasaData[] = [];
  filteredData: NasaData[] = [];
  loading = true;
  currentPage = 1;
  itemsPerPage = 6;
  searchQuery = ''; 

  constructor(private nasaService: NasaService) {}

  ngOnInit() {
    this.nasaService.getImages({ start_date: "2025-01-01" }).subscribe({
      next: (data) => {
        this.nasaData = data.reverse();
        this.filteredData = this.nasaData;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  search() {
    this.filteredData = this.nasaData.filter(item =>
      item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  get paginatedData(): NasaData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
}
