import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parse } from 'date-fns/parse';
import { RacesService } from './shared/services/races.service';
import { Carreira } from './shared/models/races.model';
import { TableComponent } from './components/table/table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    TableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {

  displayedColumns: string[] = ['origen', 'fecha', 'nombre'];
  races!: Carreira[];
  constructor(private racesService: RacesService,
  ) {
    this.racesService.getRaces().subscribe(races => {
      races.map((race) => {
        const temp = race.fecha;
        race.fecha = race.fecha.toString().split('/')[0];
        race.fecha = parse(race.fecha.toString(), 'yyyy-MM-dd', new Date())

        if (race.fecha instanceof Date && isNaN((race.fecha).valueOf())) {
          console.log(temp)
        }

      });
      this.races = races;
      console.log(races)
    })
  }




}
