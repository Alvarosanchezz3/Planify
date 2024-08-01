import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit{
  routeParam: string | null | undefined;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Obtener el parámetro 'title' de la ruta
      const title = params.get('title');
      this.routeParam = title?.replace(/-/g, ' ');
    });
  }

  columns: string[] = [
    'Project', 'Category', 'Assigned to', 'Estimated start', 'Estimated finish', 'Estimated work (in hours)', 'Estimated duration (in days)', 'Actual start', 'Actual finish', 'Actual work (in hours)', 'Actual duration (in days)', 'Notes'
  ];

  numberOfRows: number = 10;

  data: any[] = Array.from({ length: this.numberOfRows }, (_, index) => 
    index < 2 ? ['Project A', 'Category 1', 'John Doe', '2024-08-01', '2024-08-07', '40', '7', '2024-08-01', '2024-08-06', '35', '6', 'Some notes here'] :
    new Array(this.columns.length).fill('')
  );

  // Método para manejar cambios en el input
  onCellKeydown(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Enter' && input) {
      this.data[rowIndex][colIndex] = input.value;
    }
  }
}