# Arquitetura de Infraestrutura - Digital Booking

Este documento descreve a arquitetura de infraestrutura proposta para o projeto Digital Booking, uma empresa de serviços de hospedagem. A infraestrutura será projetada e implantada na AWS, com foco na resiliência, escalabilidade, desempenho e segurança.

## Componentes da Infraestrutura

A arquitetura proposta inclui os seguintes componentes:

1. **Rede Virtual Privada (VPC)**
   - Criação de uma VPC para isolar o ambiente de produção e fornecer controle total sobre a rede.
   - Segmentação da VPC em várias sub-redes para separar os componentes da infraestrutura.
   - Configuração de gateways de Internet e NAT para permitir a conectividade com a Internet.

2. **Balanceadores de Carga**
   - Utilização de um balanceador de carga elástico (ELB) para distribuir o tráfego de entrada entre os servidores da aplicação.
   - Implantação de balanceadores de carga em várias zonas de disponibilidade para aumentar a disponibilidade do sistema.

3. **Servidores de Aplicação**
   - Implantação de servidores de aplicação em um grupo de Auto Scaling (ASG) para permitir escalabilidade horizontal e tolerância a falhas.
   - Utilização de instâncias EC2 para executar os servidores de aplicação, com base na demanda de tráfego.
   - Configuração de políticas de auto escala para adicionar ou remover instâncias EC2 automaticamente, com base nas métricas de uso.

4. **Banco de Dados**
   - Uso do Amazon RDS (Relational Database Service) para armazenar e gerenciar os dados do aplicativo.
   - Configuração de múltiplas zonas de disponibilidade para garantir alta disponibilidade e recuperação de falhas.
   - Recursos como backups automáticos, replicação e dimensionamento vertical/horizontal são utilizados conforme necessário.

5. **Cache**
   - Implementação de um serviço de cache como o Amazon ElastiCache para melhorar o desempenho da aplicação, armazenando em cache consultas frequentes ao banco de dados.
   - Uso de cache em memória para reduzir a latência e aliviar a carga do banco de dados.

6. **Armazenamento**
   - Utilização do Amazon S3 para armazenar ativos estáticos, como imagens e arquivos de mídia.
   - Configuração de regras de armazenamento, como armazenamento de acesso frequente (Standard) e armazenamento de longo prazo (Glacier), para otimizar custos.

7. **Monitoramento e Logging**
   - Implementação de serviços como o Amazon CloudWatch para monitorar métricas de desempenho, eventos de aplicativo e logs.
   - Configuração de alarmes para alertar sobre problemas de desempenho, disponibilidade ou segurança.
