import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Acesso } from './acesso.model';
import { AcessoPopupService } from './acesso-popup.service';
import { AcessoService } from './acesso.service';

@Component({
    selector: 'jhi-acesso-delete-dialog',
    templateUrl: './acesso-delete-dialog.component.html'
})
export class AcessoDeleteDialogComponent {

    acesso: Acesso;

    constructor(
        private acessoService: AcessoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acessoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'acessoListModification',
                content: 'Deleted an acesso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acesso-delete-popup',
    template: ''
})
export class AcessoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private acessoPopupService: AcessoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.acessoPopupService
                .open(AcessoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
