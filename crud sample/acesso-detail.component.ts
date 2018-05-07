import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Acesso } from './acesso.model';
import { AcessoService } from './acesso.service';

@Component({
    selector: 'jhi-acesso-detail',
    templateUrl: './acesso-detail.component.html'
})
export class AcessoDetailComponent implements OnInit, OnDestroy {

    acesso: Acesso;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private acessoService: AcessoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAcessos();
    }

    load(id) {
        this.acessoService.find(id)
            .subscribe((acessoResponse: HttpResponse<Acesso>) => {
                this.acesso = acessoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAcessos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'acessoListModification',
            (response) => this.load(this.acesso.id)
        );
    }
}
