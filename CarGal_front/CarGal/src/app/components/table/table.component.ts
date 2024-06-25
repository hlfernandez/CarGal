import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { Carreira } from '../../shared/models/races.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { es } from 'date-fns/locale';
import { Filters } from '../../shared/models/filters.model';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: es },
  {
    provide: DateAdapter,
    useClass: DateFnsAdapter,
    deps: [MAT_DATE_LOCALE],
  },
  { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS }
  ],

  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {

  @Input() displayedColumns: string[] = [];
  @Input() data: Carreira[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filtersForm!: FormGroup;
  dataSource!: MatTableDataSource<Carreira>;
  originComboValues: string[] = [];


  constructor() {
    this.filtersForm = new FormGroup({
      origin: new FormControl(),
      text: new FormControl(),
      dateStart: new FormControl(),
      dateEnd: new FormControl()
    })
    this.filtersForm.valueChanges.pipe(debounceTime(100)).subscribe((change: Filters) => {
      this.dataSource.data = this.data;
      if (!!change.origin || !!change.text || (!!change.dateEnd && !!change.dateStart)) {
        this.applyFilters(change)
      }
    }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.sort.sort(({ id: 'fecha', start: 'asc' }) as MatSortable);
    this.sort.disableClear = true
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.originComboValues = [...new Set(this.data.map(c => c.origen || ''))];

  }

  applyFilters(filterValues: Filters) {

    this.dataSource.data = this.dataSource.data.filter(row => {
      let originFilter = true, textFilter = true, datesFilter = true;
      if (!!filterValues.origin) {
        originFilter = filterValues.origin === row.origen;
      }
      if (!!filterValues.text) {
        textFilter = row.nombre.toLowerCase().includes(filterValues.text.toLowerCase());
      }
      if (!!filterValues.dateStart && !!filterValues.dateEnd) {

        datesFilter = (new Date(filterValues.dateStart).setHours(0, 0, 0, 0) <= new Date(row.fecha).setHours(0, 0, 0, 0)) &&
          (new Date(row.fecha).setHours(0, 0, 0, 0) <= new Date(filterValues.dateEnd).setHours(0, 0, 0, 0))
      }

      return originFilter && textFilter && datesFilter;
    })

  }

  clearRange() {
    this.filtersForm.controls['dateStart'].reset();
    this.filtersForm.controls['dateEnd'].reset();
  }


}
