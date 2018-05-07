import { BaseEntity } from './../../shared';

export class Acesso implements BaseEntity {
    constructor(
        public id?: number,
        public flAtivo?: boolean,
        public grupoAcessoId?: number,
        public usuarioId?: number,
    ) {
        this.flAtivo = false;
    }
}
