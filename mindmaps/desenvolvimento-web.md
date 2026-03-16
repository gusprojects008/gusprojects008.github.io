# Resumos simples sobre os principais conceitos e tecnologias utilizados no desenvolvimento Web

> [!IMPORTANT]
> Verifique as referências às documentações, lá possui detalhes técnicos relevantes para entender profundamento o funcionamento das tecnologias e conceios citados.

## Nginx
Um servidor web capaz de atender vários clientes por meio de um pequeno grupo de processos.
O processos principal é o master, ele é responsável por ler os arquivo de configuração, criar o socket principal na porta definida pelo arquivo de configuração "nginx.conf", e então criar e gerenciar os workers.
Os workers são os processos responsáveis por lidar com as requisições dos clientes de forma assincrona e não bloqueante, por meio de eventos para cada uma delas.
Cada workder vai receber uma cópia do file descriptor do socket criado pelo processo master, e cada worker fica esperando pela notificação do kernel para aceitar uma nova conexão, ao aceitar, ele registra que a conexão está pronta para leitura, e quando novos dados dela chegam, o worker é notificado e ele processa a requisição.
O kernel é responsável por permitir a atribuir a nova conexão que worker irá lidar, além de notificiar de novos dados daquela conexão específica, e a partir disso só esse worker fica responsável por processar as requisições http daquela conexão.

O serviço do servidor nginx é configurado por meio de arquivos de configurações no diretório "/etc/nginx/", o arquivo principal é: "nginx.conf" e nele você configura o servidor por meio de parâmetros simples como:

server {
  listen 80; # porta onde o servidor http atenderá
  server_name localhost; # ou www.meusite.com
}

Veja a documentação para mais detalhes.

Não alteramos o arquivo nginx.conf para exibir o site diretamente, na verdade alteramos ele para incluir um arquivo de configuração de servidor para nosso site específico. Exemplo de passo a passo:
Criar arquivo "site.conf" no diretório "sites-available" dentro de "/etc/nginx".

criar link simbolico para ele em sites-enabled (é realmente necessário passar os caminhos absolutos):
ln -s /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/site.conf

Após isso é necessário incluir o arquivo de configuração do site no nginx.conf:
include /etc/nginx/sites-enabled/*;

Após isso é necessário recarregar o arquivo de configuração do serviço nginx "nginx.conf":
nginx -t

E então recarregar o serviço nginx, ou reiniciar o serviço por completo:
nginx -s reload
Ou utilizar o gerenciador de serviços para reiniciar o serviço nginx:
rc-service nginx restart

utiliza arquivos 
Ele pode agir como:
Proxy direto: Receber as requisições (dados http) dos clientes, e direcionar elas para a internet.
Proxy reverso: Onde irá receber as requisições (dados http) dos clientes, e direcionar elas para outros serviços. Explicando de forma geral, esses serviços possuem um socket aberto em uma porta específica, e aguardam uma conexão para receber e processar a resquisição vinda do nginx. Esse serviço pode ser externo ou interno (localmente no servidor). Por exemplo, o nginx recebe a requisição, e de acordo com path dela, por exemplo "/api/", o nginx direciona ela para o serviço backend que está sendo executado localmente no servidor, em container docker, gerenciado pelo dockerd (daemon). Dessa forma, você pode ter uma rede containers locais e isolados, e cada um irá disponibilizar e realizar uma função específica, e em seguida retornar uma resposta para o usuário (ou não, depende do desenvolvedor).   

Load balancers:

## APIs
Autênticação em APIs.

## Middlewares
São intermédiarios entre as requisições chegadas no servidor de aplicação e os controllers/funções que interagem com o banco de dados ou que realiza a ação principal desejada pelo usuário. Existem vários tipos de middlewares, por exemplo:
Autênticação JWT (Json Web Token) para autênticar as requisições vindas de um usuário, e dessa forma garantir que ele está registrado na tabela de usuários e assim logado no sistema. Essa forma de autênticação é muito usada quando é preciso garantir que a função de API que nossa aplicação fornece, só pode ser chamada e aproveitada por usuários registrados e autênticados.
Orquestrador de estratégias de autênticação, como o passport.js, que é um middleware que permite o desenvolvedor conectar múltiplas forma de autênticação do usuário no sistema, incluindo suporte à oAuth2 do google, entre outros. Dessa forma, sua aplicação pode haver autênticação via: google oAuth2, local, JWT, etc... tudo isso de forma modularizada, padronizada e segura.
## Frameworks

## Bancos de dados

## Autênticação
Funcionamento do oauth2.
Fucionamento do módulo passport do node.js:
O passport.js é um middleware, ou seja, um intermédiario entre as requisições do cliente e os controllers ou funções do backend

JWT (Json Web Token):
Token de autênticação gerado pelo servidor a partir de dados (username, email, senha) do usuário, chave secreta do servidor, e um algoritimo de específico. Ele é usado para autênticar as requisições de um usuário registrado e logado no sistema.

# Funcionamento do next.js
Temos: 
pages/: diretório que define as rotas da aplicação. Cada arquivo JavaScript exporta um componente React que pode ser renderizado no servidor, gerado estaticamente ou renderizado no cliente. Após o carregamento inicial, o React hidrata a página no navegador e passa a controlar a interface.

pages/api/: diretório opcional que define rotas de API executadas no lado do servidor. Cada arquivo exporta um handler HTTP que pode retornar dados (geralmente JSON), funcionando como uma API backend.

public/: diretório para arquivos estáticos, como imagens, fontes e ícones, que são servidos diretamente sem processamento pelo Next.js.

Tipos de renderização e interação entre backend e frontend:
SSR + Hydratation: O servidor executa o código JavaScript dos arquivos definidos em /pages e envia ao cliente o HTML já pré-renderizado. Após o HTML chegar ao cliente e ser interpretado pelo navegador, o DOM inicial é criado. Em seguida, o bundle JavaScript enviado pelo servidor é carregado e executado no lado do cliente, iniciando o processo de hydration.
Durante a hydration, os mesmos componentes JavaScript que foram executados no servidor são reexecutados no cliente. Essa reexecução é necessária para que o React recrie o Virtual DOM no navegador, permitindo a validação da estrutura do DOM já existente.
Se a estrutura do Virtual DOM corresponder ao DOM renderizado pelo servidor, o React associa os event listeners aos elementos existentes e passa a controlar apenas a subárvore raiz onde a aplicação React foi montada.
A partir desse ponto, o Virtual DOM passa a ser atualizado primeiro, e o React aplica ao DOM real apenas as alterações mínimas necessárias, garantindo interatividade e eficiência na atualização da interface do usuário.

O que são componentes no react?:
Componentes são funções ou classes que recebem props e retornam uma descrição declarativa da interface do usuário. Eles não são elementos HTML em si, mas objetos que descrevem como esses elementos devem ser estruturados. Esses objetos formam a árvore do Virtual DOM.
O gerenciamento do estado interno de um componente pode ser feito por meio de hooks como useState. Essa função retorna um valor que representa o estado atual do componente e uma função responsável por agendar a atualização desse estado. Quando essa função é chamada, o React reexecuta o componente, gera uma nova árvore de Virtual DOM e utiliza o reconciliador para comparar essa nova árvore com a anterior, aplicando apenas as alterações necessárias no DOM real dentro da subárvore que o React controla.
useEffect: é um hook que permite a execução de uma função específica para atualizar o valor de um componente ou enviar dados para o servidor (por exemplo), o hook permite que uma função seja executada de acordo com diferentes condições e quantidade de vezes, por exemplo:
Exemplo 1:
useEffect(() => {console.log('oi')}, []);
Ao invés de console.log(), poderia ser uma request usando fetch() para um endpoint de uma API no servidor. O "[]" no como segundo argumento para useEffect, é estritamente necessária, pois define quantas vezes a função irá ser executada, e que nesse caso, irá executar apenas uma vez após o primeiro render.

Exemplo 2:
useEffect(() => {console.log('oi')}, [userId]);
Executa um vez a após o primeiro render, e executa novamente após userId mudar.

Exemplo 3:
useEffect(() => {console.log('oi')});
Executa em toda render.

## Javascript
Funções padrões:
Funções matemáticas:


### Canvas
Métodos do elemento canvas:
getContext("2d") obtém o contexto de renderização 2d do elemento canvas, dessa forma, ele retorna um objeto de interface de desenho no elemento html canvas. Permitindo você manipular pixels de forma precisa. Ou seja, essa interface de desenho, disponibiliza métodos para manipular o buffer pixels do canvas, no fim, ele é um controlador de matriz. Pois internamente o <canvas> mantém um buffer de pixels na mamória. Esse buffer de pixels é cáculado a partir da largura e altura definidos através de:
canvas.width e canvas.height exemplo:
canvas.width = 800
canvas.height = 600
cada pixel normalmente ocupa 4bytes (RGBA) então fica:
800 * 600 * 4 = 1.920.000
Ou seja, o buffer de pixels é uma matriz que ocupa 1.92 MB em memória. E dessa forma, definimos um valor em 4 bytes para cada pixel, e assim, definir uma cor e intensidade para ele.
É possível acessar essa matriz de pixels, através do método getImageData(sx, sy, sw, sh) que retorna uma representação linear do buffer de pixels em memória, exemplo:
[R, G, B, A, R, G, B, A, R, G, B, A...]
Lembrese que um pixel rgba é defindo por: (1 byte para definir a cor vermelha, 1 byte para cor green, 1 byte para cor azul, 1 byte para o canal alfa que regula a intesidade do pixel como um todo) o que é igual a 4 bytes.
Confira os outros métodos fornecidos pela interface CanvasRenderingContext2D.

## Arquitetura de sistemas
Tipos de arquiteturas:
Camadas:
Orientada a eventos:
Tipos de sistemas:
Monolito:


Referencias e documentações:
[Canvas](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API/Tutorial)
