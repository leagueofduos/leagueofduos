import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpbFrontSharedModule } from '../../shared';
import {
    AcessoService,
    AcessoPopupService,
    AcessoComponent,
    AcessoDetailComponent,
    AcessoDialogComponent,
    AcessoPopupComponent,
    AcessoDeletePopupComponent,
    AcessoDeleteDialogComponent,
    acessoRoute,
    acessoPopupRoute,
    AcessoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...acessoRoute,
    ...acessoPopupRoute,
];

@NgModule({
    imports: [
        CpbFrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AcessoComponent,
        AcessoDetailComponent,
        AcessoDialogComponent,
        AcessoDeleteDialogComponent,
        AcessoPopupComponent,
        AcessoDeletePopupComponent,
    ],
    entryComponents: [
        AcessoComponent,
        AcessoDialogComponent,
        AcessoPopupComponent,
        AcessoDeleteDialogComponent,
        AcessoDeletePopupComponent,
    ],
    providers: [
        AcessoService,
        AcessoPopupService,
        AcessoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpbFrontAcessoModule {}
