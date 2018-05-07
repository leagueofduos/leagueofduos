import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Acesso } from './acesso.model';
import { AcessoPopupService } from './acesso-popup.service';
import { AcessoService } from './acesso.service';
import { GrupoAcesso, GrupoAcessoService } from '../grupo-acesso';
import { Usuario, UsuarioService } from '../usuario';

@Component({
    selector: 'jhi-acesso-dialog',
    templateUrl: './acesso-dialog.component.html'
})
export class AcessoDialogComponent implements OnInit {

    acesso: Acesso;
    isSaving: boolean;

    grupoacessos: GrupoAcesso[];

    usuarios: Usuario[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private acessoService: AcessoService,
        private grupoAcessoService: GrupoAcessoService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.grupoAcessoService.query()
            .subscribe((res: HttpResponse<GrupoAcesso[]>) => { this.grupoacessos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.acesso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.acessoService.update(this.acesso));
        } else {
            this.subscribeToSaveResponse(
                this.acessoService.create(this.acesso));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Acesso>>) {
        result.subscribe((res: HttpResponse<Acesso>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Acesso) {
        this.eventManager.broadcast({ name: 'acessoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGrupoAcessoById(index: number, item: GrupoAcesso) {
        return item.id;
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-acesso-popup',
    template: ''
})
export class AcessoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private acessoPopupService: AcessoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.acessoPopupService
                    .open(AcessoDialogComponent as Component, params['id']);
            } else {
                this.acessoPopupService
                    .open(AcessoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
