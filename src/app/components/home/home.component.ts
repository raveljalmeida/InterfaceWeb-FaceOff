import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../../services/room.service';

interface Sala {
  id: string;
  ambiente: string;
  quantidade: number;
  capacidadeMax: number;
  temTomada: boolean;
  isFake: boolean;
  ultimaAtualizacao: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  
  salas: Sala[] = [
    {
      id: 'lab-real',
      ambiente: 'Laboratório de Informática',
      quantidade: 0,
      capacidadeMax: 15,
      temTomada: true,
      isFake: false,
      ultimaAtualizacao: 'Buscando dados no servidor...'
    },
    {
      id: 'fake-biblioteca',
      ambiente: 'Sala de Estudos - Biblioteca',
      quantidade: 0, 
      capacidadeMax: 10,
      temTomada: true,
      isFake: true,
      ultimaAtualizacao: 'Atualizado há 2 min'
    },
    {
      id: 'fake-bloco-a',
      ambiente: 'Espaço de Estudos Bloco A',
      quantidade: 15, 
      capacidadeMax: 15,
      temTomada: false,
      isFake: true,
      ultimaAtualizacao: 'Atualizado há 10 min'
    }
  ];

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.consumirDadosApi();
    
    setInterval(() => {
      this.consumirDadosApi();
    }, 10000);
  }

  consumirDadosApi(): void {
    this.roomsService.getRoomLogs().subscribe({
      next: (resposta: any) => {
        if (!resposta) return;

        // 1. Pega os valores do primeiro nível do Firebase
        const primeiroNivel = Object.values(resposta);
        
        // 2. Cria uma lista limpa onde vamos consolidar TODOS os logs reais
        let listaDeLogsGerais: any[] = [];

        primeiroNivel.forEach((item: any) => {
          // Se o item tiver a propriedade 'ambiente', ele já é um log direto (índices 0 a 4 do seu print)
          if (item && item.ambiente) {
            listaDeLogsGerais.push(item);
          } 
          // Se não tiver 'ambiente' mas tiver sub-chaves (como os índices 5 e 6 do seu print)
          else if (item && typeof item === 'object') {
            const subLogs = Object.values(item);
            subLogs.forEach((subItem: any) => {
              if (subItem && subItem.ambiente) {
                listaDeLogsGerais.push(subItem);
              }
            });
          }
        });

        console.log('--- 📡 HISTÓRICO TRATADO E ACHATADO ---', listaDeLogsGerais);

        // 3. Mapeia o nosso array local de salas usando a lista perfeitamente achatada
        this.salas = this.salas.map(sala => {
          
          // Filtra os logs que pertencem a esta sala específica
          const logsDestaSala = listaDeLogsGerais.filter((log: any) => {
            const ambienteLog = log.ambiente?.toLowerCase();
            
            if (sala.id === 'lab-real' && ambienteLog === 'laboratorio') return true;
            if (sala.id === 'fake-biblioteca' && ambienteLog === 'biblioteca') return true;
            if (sala.id === 'fake-bloco-a' && ambienteLog === 'bloco-a') return true;
            
            return false;
          });

          // 4. Se encontramos registros após o tratamento, pegamos o mais recente dela
          if (logsDestaSala.length > 0) {
            const ultimoLogDaSala: any = logsDestaSala[logsDestaSala.length - 1];
            
            const dataObjeto = new Date(ultimoLogDaSala.timestamp * 1000);
            const horaFormatada = dataObjeto.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            });

            console.log(`-> Atualizando ${sala.ambiente}:`, ultimoLogDaSala);

            return {
              ...sala,
              quantidade: Number(ultimoLogDaSala.quantidade) ?? 0,
              capacidadeMax: (ultimoLogDaSala.maximo && Number(ultimoLogDaSala.maximo) > 0) ? Number(ultimoLogDaSala.maximo) : sala.capacidadeMax,
              ultimaAtualizacao: `Atualizado às ${horaFormatada}`,
              isFake: false
            };
          }

          return sala;
        });

        // 5. Reordena o grid
        this.ordenarSalas();
      },
      error: (err: any) => {
        console.error('❌ Erro na API:', err);
      }
    });
  }

  ordenarSalas(): void {
    this.salas.sort((a, b) => this.getPeso(a) - this.getPeso(b));
  }

  getPeso(sala: Sala): number {
    if (sala.quantidade === 0) return 1;
    if (sala.quantidade < sala.capacidadeMax) return 2;
    return 3;
  }
}