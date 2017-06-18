# **iSecurity** #
Repositório para armazenar as informações do projeto final da disciplina de Desenvolvimento de Software para Dispositivos Móveis - INF/UFG - 2017/1.

Índice
--- 
- [Sobre o projeto](#Sobre o projeto)
- [Integrações externas](#integrações-externas)
- [Rodando o projeto](#como-roda-o-projeto)

## **Sobre o Projeto** ##

**Descrição**

O projeto iSecurity tem como objetivo auxiliar a população com informações detalhada sobre eventos criminosos ocorridos em uma determinada localidade, onde estes são cadastrados pelas vítimas/testemunhas do ocorrido. 

**Motivação**

O objetivo do projeto é poder fornecer informações que promovam a segurança da população, tais como:
* Local;
* Gravidade;
* Perfil dos assaltantes;
* Descrição do ocorrido;
* Entre outras informações da preferência do autor da ocorrência.

**Funcionalidades existentes**

* Cadastro do evento criminoso;
* Login com Facebook/Google;
* Visualização dos eventos ocorridos.
* Visualização/edição/exclusão do(s) cadastro(s) realizados pelo usuário.

**Funcionalidades não existentes**

* Cadastro de foto do local do evento;
* Cadastro de usuários;
* Compartilhamento em redes sociais.

## **Integrações Externas** ##

* Google FireBase, Real Time DataBase: Grava os dados no banco de tempo real, e manda notificações para os aplicativos clientes.
* Autenticação Facebook, Google:  Autentica o usuário no Google Firebase, para permissão de criação, edição e deletar dados.
* Google GeoFire: Acompanha a localização em tempo real do usuário, buscando os endereços dentro de um raio X, no banco de dados do FireBase,fazendo o filtro de endereços para os aplicativos clientes.

## **Como faço para rodar o projeto?** ##

**Clonando o projeto usando o git:**
>* Acesse o diretório onde deseja armazenar seu projeto pelo prompt de comando;
>* Digite `git clone https://github.com/FerreiraRaphael/ufg-es-dsdu-2017-1.git`;
>* Você pode clonar o projeto de outras formas, utilizando o GitKraken por exemplo.


**Faça o download e a instalação do Node.js:**
>* [Node.js](https://nodejs.org/en/);

**Acesse seu o diretório de seu projeto pelo prompt de comando:**
>* Digite `npm install`;
>* Execute seu projeto com `npm start`.

**Testando a aplicação pelo dispositivo móvel:**
>* Faça o download do app _Expo_ em seu dispositivo móvel;
>* Após baixado e instalado, execute o mesmo;
>* Após realizado os procedimentos descritos em _cesse seu o diretório de seu projeto pelo prompt de comando_, no app Expo selecione a opção _Scan QR Code_;
>* Escaneie o QR Code gerado após executar o comando npm start;
>* Em alguns minutos toda a comunicação entre o projeto e o app recém compilado irá ser realizada e você verá sua aplicação React executando no celular;
>* Qualquer alteração no código do projeto, enquanto este estiver sendo executado, poderá ser visualizado no seu dispositivo móvel (após alterar e salvar, o projeto é automaticamente recompilado para aparecer as alterações no celular(es) em que está(ão) sendo executado(s)).
