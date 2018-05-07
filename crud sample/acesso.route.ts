import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AcessoComponent } from './acesso.component';
import { AcessoDetailComponent } from './acesso-detail.component';
import { AcessoPopupComponent } from './acesso-dialog.component';
import { AcessoDeletePopupComponent } from './acesso-delete-dialog.component';

@Injectable()
export class AcessoResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const acessoRoute: Routes = [
    {
        path: 'acesso',
        component: AcessoComponent,
        resolve: {
            'pagingParams': AcessoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpbFrontApp.acesso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'acesso/:id',
        component: AcessoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpbFrontApp.acesso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acessoPopupRoute: Routes = [
    {
        path: 'acesso-new',
        component: AcessoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpbFrontApp.acesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'acesso/:id/edit',
        component: AcessoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpbFrontApp.acesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'acesso/:id/delete',
        component: AcessoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpbFrontApp.acesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
