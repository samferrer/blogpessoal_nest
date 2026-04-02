import { TemaController } from './tema/controllers/tema.controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "./tema/entities/tema.entity";
import { TemaService } from './tema/services/tema.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    controllers:[TemaController],
    providers: [TemaService],
    exports: [TemaService]
})

export class TemaModule {}