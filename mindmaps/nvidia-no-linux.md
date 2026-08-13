# Conceitos básicos

## Compositor

Software responsável por gerenciar monitores e janelas gráficas de aplicações, de forma básica e a nível de usuário.
Ela é responsável por alocar framebuffer para a GPU renderizar no monitor.

## RAM (Random Access Memory)

Memória de acesso aleatório, responsável por armazenar dados e instruções de programas em execução.

## dGPU (GPU Dedicada) e iGPU (GPU Integrada) 

dGPU geralmente sendo AMD ou NVIDIA, já a iGPU geralmente é a intel.

## CPU (Central Process Unity)

É a unidade central de processamento, responsável por executar instruções e comunicação com dispositivos.

## Mux-switch ou gráficos discretos

Opção no firmware (BIOS ou UEFI) que permite realizar a troca física de GPU conectada ao monitor.

## Pipeline

Fluxo de troca de dados ou execução de instruções.

## Frame

Dados gráficos que serão convertidos em sinais elétricos para a exibição de uma imagem no monitor, esse sinais elétricos manipulam pixels no monitor para formarem diferentes cores e assim, a representação objetos, sombras etc...

Um vídeo ou um jogo, gera e faz a GPU renderizar várias imagens no monitor por segundo, para formar um vídeo ou animação. 

## Scanout

Varredura periodica ou não de frames para serem exibidos ou exportados para uma saída específica, por exemplo o monitor, quando a iGPU faz a scanout do framebuffer alocado pelo compositor gráfico do sistema, e assim faz a renderização no monitor.

## modprobe

Explicando options comuns:
options nvidia_drm.fbdev=1 # Resolve problemas de framebuffers modernos
options nvidia_drm modeset=1 # Permite com que o kernel idenfique a dGPU NVIDIA como um dispositivo de renderização gráfica comum, que pode ser usado pelo compositor/servidor gráfico para realizar a renderização direta ou não em um monitor.

Lembre-se que ao instalar os drivers, módulos e binários nvidia através do seu gerenciador de pacotes, a nvidia irá criar arquivos de configuração modprobe.d/ em diferentes locais do sistema, o que pode gerar conflito com os arquivo de configuração de /etc/modprobe.d/ .Então lembresse mover o conteúdo deles para /etc/modprobe.d/ , e excluir os outros, mantenha o gerenciamento de 1.

## KMS (Kernel Mode Settings)

Método do kernel que o permite gerenciar configurações de exibição no monitor, como refresh rate, color depth, resolução etc...

## DRM (Direct Rendering Manager)

Opção de driver de GPU que o permite o kernel gerenciar o framebuffer da GPU, e utilizar ela para realizar renderização direta no monitor.

## Buffer

Pequena região de memória utilizada para movimentar uma grande e rápida quantidade de dados, de forma extremamente rápida e volátil.

## DMA (Direct Memory Access)

Região de memória utilizada para compartilhar dados de forma direta entre dois dispositivos diferentes, geralmente de forma muito rápida.

Ou seja, DMA-BUF zero-copy significa a alocação de um buffer na memória ram por exemplo, que será utilizada para DMA, mas no meio do processo, uma das GPU que está realizando o processamento, não irá utilizar a cpu para copiar dados para a ram, mas sim, mover os dados processados diretamente a o buffer DMA (DMA-BUF) na ram. Assim, a outra GPU irá receber os dados desse DMA-BUF e irá realizar outro processamento ou renderização no monitor por exemplo, caso seja um frame.

Existem diferentes formas de fazer isso, cada uma delas possuem suas vantagens e desvantagens.

dGPUs nvidia possuem suporte físico a DMA via barramentos PCIe

## Prime render offload (Offload), reverse prime e prime sync

Prime render offload: É a técnica onde a dGPU faz todo o trabalho pesado de renderizar o jogo/aplicação 3D, mas não exibindo a imagem diretamente. Assim, ficando responsável por entregar o frame pronto a para a iGPU (ou outra GPU) conectada de fato ao monitor, exibir a imagem na tela.
Essa renderização feita pela dGPU envolve uma grande quantidade de cálculos de shaders, texturas, objetos 3D etc... 

Reverse prime: técnica utilizada em um cenário onde todo o compositor e o monitor utilizam a iGPU, mas o usuário possui um monitor externo conectado a uma dGPU nvidia, e quer utilizar uma aplicação específica usando apenas a dGPU e realizando a renderização direta dela apenas no monitor específico que está utiliza a dGPU nvidia.
Nesse caso, existem algumas formas de permitir isso e detalhes que requerem atenção:

Forma 1: 
dGPU copia frame para a RAM através da CPU.
iGPU faz scanout do frame que a dGPU enviou, e então faz a renderização na tela.

A forma 2 (ideal) seria realizando DMA-BUF zero copy, para evitar uso da CPU.

Prime sync será necessário, caso contrário, irá haver delay perceptível na aplicação (jogo).

Prime sync: Esse é um mecanismo que resolve o problema de sincronização entre envio e recebimento de dados entre diferentes GPUs. Permitindo com que a iGPU faça scanout de novos frame da dGPU por exemplo, apenas quando a iGPU terminar de rendizar o frame no monitor, reduzindo lag perceptível.

__NV_PRIME_RENDER_OFFLOAD= __GLX_VENDOR_LIBRARY_NAME=

## Tearing e Stutter

Tearing é o detecção de "rasgo" queda brusca de FPS.

Stutter é a sens:

### Conceitos adicionais (opcionais entender)

#### Shaders

São pequenos programas executados pela GPU, responsáveis por detalhar como a GPU irá renderizar sombras, texturas e objetos 3D.
Conjunto de instruções otimizadas para a renderização 3D realizada pela GPU.

Objetivo do usuário:

Utilizar a placa de vídeo nvidia de forma dedicada para aplicações específicas, 

Executar aplicações 

#### IOMMU

Input/Output Memory Management Unity.

#### Mesa

É o driver responsável por implementar as APIs gráficas que programas gráficos (UI) utilizam para criar desenhos 2D/3D, e realizar a comunicação com o compositor.


# O problema do sway nesses cenários

## Como basicamente o sway funciona?

As alternativas são: GNOME, KDE, KWin ou outros que permitem o vsync realizado pela própria dGPU.

# Drivers proprietários da nvidia

Desvantagens: é proprietário, não é tão compatível com aplicações nativas linux, quanto o nouveau.

# Drivers nouveau

Vantagens: Compatibilidade e implementação de recursos que a nvidia não implementa, não fornece tanto desempenho quanto os drivers proprietário nvidia, mas muitas vezes, ele é o suficiente.

Desvantagens: Não possui enconder de vídeo ou suporte aos enconder nvidia proprietários.

> Esse artigo serve especialmente para notebooks hibridos (Intel + dGPU NVIDIA).

Placas de vídeo nvidia são realmente problemáticas no linux?

Não, o que é problemático é o quê e como você está tentando utiliza-la no seu ambiente.
E muito pelo contrário, em boa parte do tempo e até hoje, as próprias placas de vídeo nvidia são problemáticas por culpa e vontade da própria nvidia, por motivos captalistas de mercado.

Como utilizar placa de vídeo nvidia no linux? como utilizar dedicar a dGPU NVIDIA para aplicações no linux.

A me;

Cenários possíveis para utilizar a dGPU nvidia:

Cenário 1 (Ideal):

Monitor e compositor renderizado pela dGPU nvidia utilizando drivers proprietários.
Aplicação alvo sendo renderizada pela dGPU nvidia.
G-Sync ativado será opcional pois a renderização já será direta entre o compositor e o monitor.

Pipeline:

Aplicação ->  

Compositor (sway por exemplo)

Monitor

Mas caso surja uma aplicação que necessite de desempenho/fluidez da iGPU para a renderização, pois não possui suporte a dGPUs NVIDIA, então pode surgir um overhead que pode muitas vezes gerar um gargalo perceptivel na fluidez da aplicação.

Cenários 2:

Monitor e compositor sendo renderizados pela dGPU nvidia utilizando drivers proprietários.
G-Sync ativado (necessário).

Cenário 3:

iGPU conectada no monitor.
Compositor sendo renderizado pela nvidia.
