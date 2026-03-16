# COMO FUNCIONA UMA VPN? REDE VIRTUAL PRIVADA?

ENTENDA O FUNCIONAMENTO GERAL DE UMA VPN:

- - -

### COMO FUNCIONA UMA VPN: REDE VIRTUAL PRIVADA?

#### ENTENDA O FUNCIONAMENTO GERAL DE UMA VPN:

![](/statics/images/mindmaps/vpn-como-funciona.jpg)

### **COMO FUNCIONA UMA VPN (REDE VIRTUAL PRIVADA)?**

A **VPN (Rede Virtual Privada)** é utilizada em diversos cenários. Por exemplo, quando você trabalha remotamente para uma empresa e precisa acessar a rede privada dela; ou quando precisa acessar um conteúdo restrito e disponível apenas em um local específico do mundo; além de proteger sua comunicação contra pessoas que desejam ver as informações que você envia ou acessa pela internet.

Para isso, existe o servidor VPN, que é uma máquina conectada a uma rede privada ligada a um provedor de serviços de internet (ISP) localizado em algum lugar do mundo. Por meio dele, você se comunica com a internet de forma anônima e segura, devido aos processos de criptografia pelos quais suas informações passam através dos protocolos e mecanismos de segurança utilizados pelo serviço de VPN.

Através de um túnel de comunicação com um servidor VPN, todo o seu tráfego de rede é criptografado e enviado diretamente para o servidor VPN antes de ser encaminhado para a internet pública. Assim, o servidor VPN criptografa os dados antes de serem enviados para a internet, impedindo que alguém consiga ler os dados que você enviou ou acessou pela internet pública.

Dessa forma, você estará se comunicando com a internet através de uma máquina remota que está em uma rede privada que, a partir dela, irá encaminhar todas as suas informações para a internet e receberá todas as respostas da internet, enviando diretamente para você. Isso resulta na mudança do seu endereço IP público original da sua máquina, atribuído por seu provedor, para o endereço IP do servidor VPN que você estará usando para se comunicar com a internet, dando mais privacidade e segurança, pois você estará se comunicando com a internet a partir de outra máquina que irá receber, criptografar e encaminhar suas informações para a internet pública.

Provedores de serviços de internet são usados para direcionar informações corretamente para outros servidores, como servidores **DNS (Servidor de Nomeamento de Domínio)**, usados para associar e armazenar os nomes de domínio dos servidores na internet e seus endereços IP. Por exemplo: example.com — para você chegar ao servidor example.com, seu provedor de internet recebe sua solicitação através do roteador, modem e meios de comunicação, e busca o domínio no servidor DNS associado a ele. Então, o servidor DNS busca o nome do servidor example.com e retorna o endereço IP associado a ele para o ISP caso encontre, e assim o ISP retorna para sua máquina, possibilitando que você envie informações ou estabeleça uma conexão com o servidor.

Por isso, é importante conectar-se e usar um serviço VPN confiável, seguro e adequado ao seu propósito de uso.

Existem diversos protocolos de comunicação e serviços VPN para serem usados em diferentes cenários. Cada protocolo possui suas características, vantagens e desvantagens. Exemplos são:

**OpenVPN**: O OpenVPN não é um protocolo em si, mas um software que possibilita que você se conecte a um servidor VPN de forma segura utilizando os protocolos de comunicação e segurança do modelo OSI e TCP/IP. O protocolo de conexão, comunicação e segurança com o servidor VPN pode variar, mas os principais são:

**TCP/IP** (Protocolo de Controle de Transmissão/Protocolo de Internet): É um conjunto de protocolos de comunicação e transporte de dados baseado em conexão com a máquina de destino. Essa conexão pode ser feita de diversas formas, utilizando, por exemplo, sockets de comunicação entre cliente e servidor, TCP handshake (aperto de mão), entre outros.

**UDP** (Protocolo de Datagrama de Usuário): UDP é um protocolo de envio de dados que não é baseado em conexão com a máquina de destino. Com isso, ele se torna um protocolo de envio de dados mais rápido, mas pouco confiável quanto à integridade dos dados enviados, pois ele não é baseado em uma conexão direta com a máquina de destino para a troca de dados. Assim, pode ocorrer perda de pacotes e dados enviados para a máquina de destino.

**SSL/TLS** (Camada de Socket Segura/Camada de Transporte Segura): São protocolos de segurança usados em conexões e comunicações entre máquinas, utilizados principalmente para autenticação e criptografia dos dados trocados, protegendo contra adulterações e interceptações, garantindo maior confiabilidade na conexão e comunicação com a máquina de destino.

_COM ESSES PROTOCOLOS E OUTROS QUE NÃO CITEI, PODEM SER CRIADOS DIVERSOS OUTROS PROTOCOLOS DE COMUNICAÇÃO E CONEXÃO COM SERVIDORES VPN, AUMENTANDO AINDA MAIS A PROTEÇÃO DA SUA COMUNICAÇÃO COM A INTERNET._

### OUTROS PROTOCOLOS E MÉTODOS DE PROTEÇÃO E CONEXÃO USADOS POR SERVIDORES VPN:

#### PROTOCOLO IPsec (Protocolo de Segurança de Internet ou Internet Protocol Security)

IPsec (Protocolo de Segurança de Internet ou Internet Protocol Security) é um conjunto de protocolos e padrões de segurança para conexão e comunicação entre máquinas e a internet, usando métodos de autenticação e criptografia baseados em protocolos como:

**AH (Autenticação de Cabeçalhos)**: Garante autenticação e integridade dos dados trocados, utilizando técnicas de hash para criar um valor fixo único baseado nos dados originais e nos metadados deles, para no fim calcular e comparar os valores hash dos dados originais e dos dados recebidos, fornecendo segurança contra modificações durante a transmissão.

**ESP (Carga de Segurança Encapsulada)**: Fornece autenticação, integridade e confiabilidade dos dados trocados, criptografando os pacotes de dados para proteger seu conteúdo.

**IKE (Troca de Chaves da Internet)**: Protocolo usado para gerenciar a negociação, estabelecimento e troca de chaves criptográficas e autenticação, facilitando uma conexão segura entre as máquinas.

ESSES TRÊS PROTOCOLOS TRABALHAM EM CONJUNTO PARA PROTEGER SUA COMUNICAÇÃO COM O SERVIDOR VPN E A INTERNET ATRAVÉS DO PROTOCOLO **IPsec_._**

#### PROTOCOLO P2P (Pessoa Para Pessoa)

P2P (Peer-to-Peer): O protocolo P2P é uma forma descentralizada de comunicação com a internet. Na arquitetura do protocolo P2P, não existe um servidor VPN central usado para comunicação com a internet pública. Em vez disso, todas as máquinas na rede atuam como clientes e servidores ao mesmo tempo. Cada uma se conecta e utiliza as outras para se comunicar com a internet pública, permitindo que compartilhem recursos entre si.
