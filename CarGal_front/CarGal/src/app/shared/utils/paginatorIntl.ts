
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';
@Injectable()
export class PaginatorIntl implements MatPaginatorIntl {
    changes = new Subject<void>();

    // For internationalization, the `$localize` function from
    // the `@angular/localize` package can be used.
    firstPageLabel = `Primera páxina`;
    itemsPerPageLabel = `Resultados por páxina:`;
    lastPageLabel = `Última páxina`;

    // You can set labels to an arbitrary string too, or dynamically compute
    // it through other third-party internationalization libraries.
    nextPageLabel = 'Páxina seguinte';
    previousPageLabel = 'Páxina anterior';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return `Páxina 1 de 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Páxina ${page + 1} de ${amountPages}`;
    }
}