# Conceitos fundamentais sobre hardwares, softwares e sistemas operacionais

## Hardwares

### RAM (Random Access Memory)
* **Função**: Armazena temporariamente código, dados e arquivos de programas durante sua execução.
    * É um componente passivo, que apenas armazena dados e instruções de programas em execução, esses dados e intruções são vários bits alocados de forma organizada nas células de memória, mas a nível de software e hardware, trabalhamos apenas com o endereçamento a nível de byte, um byte é o conjunto de 8 células memória, e cada célula de memória pode armazenar um bit, assim podendo representar dados ou instruções a seres executadas pela CPU.
    * O processador busca dados e instruções usando endereços virtuais, que são traduzidos pela MMU em endereços físicos de memória, e através da unidade IMC, a operação específica com os dados ou instruções associados ao endereço físico são relizadas (Ler ou Escrever).
* **Características Físicas**:
    * A memória RAM convencional não usa drivers ou firmware ativo para alocação ou atualização de dados.
    * A comunicação é feita diretamente através de unidades específicas no processador para comunicação de gerencimento da memória (MMU e IMC).
    * Módulos de RAM (DDR4/DDR5) podem ter circuitos auxiliares e firmware para funções específicas como Power Management Integrated Circuit (PMIC) ou Error Correction Code (ECC).
* **Mecanismo de Acesso**:
    * Circuitos passivos na RAM acessam e executam as operações do Integrated Memory Controller (IMC) do processador.
    * O processador envia ao IMC um endereço, um comando de escrita e dados (normalmente em unidades de bytes ou palavras), que são transmitidos pelos barramentos.
    * Circuitos lógicos internos da RAM decodificam o endereço para acessar linhas e colunas específicas e realizar a operação de leitura ou escrita.

### CPU (Unidade de Processamento Central)
* **Composição**: É o componente principal, formado por circuitos lógicos organizados em unidades.
* **Função**: Processa e interpreta dados de acordo com as instruções dos programas, manipulando o fluxo de elétrons em operações binárias (lógicas e aritméticas).
* **Unidades Chave**:
    * **MMU (Memory Management Unit)**: Mapeia endereços virtuais das tabelas de páginas dos processos para endereços físicos na RAM.
        * Atua quando uma instrução do programa tenta acessar um endereço virtual.
        * Ela "intercepta" e resolve o endereço virtual para físico, usando o IMC para acessar os dados na RAM.
    * **IMC (Integrated Memory Controller)**: Unidade responsável por intermediar o acesso da CPU à memória RAM, recebendo endereços físicos byte-endereçáveis e traduzindo-os em comandos DRAM (como ativação de linha, leitura e escrita), mapeando o endereço para canal, rank, banco, linha e coluna no chip físico de memória. Esses comandos DRAM são executados diretamente por círcuitos e barramentos físicos da memória RAM. 
* **Registradores Especiais**:
    * **CR3 (Page Table Base Register)**: Registrador gerenciado pelo kernel que armazena o endereço físico da PGD (Page Global Directory), a página raiz do processo.
    * O kernel altera o CR3 durante trocas de contexto, criação de novos processos ou modificação de tabelas de páginas.

## O Kernel (Núcleo do Sistema Operacional)

* **Função Principal**: O kernel é pré-programado para fornecer instruções e assumir o controle da comunicação entre software e hardware.
    * Não gera código ou bytes "do nada"; ele reage a eventos e executa funções pré-programadas.
    * Possui drivers e módulos básicos, subsistemas e funções para lidar com eventos como interrupções, exceções e timers.
* **Inicialização**:
    * É armazenado na partição de boot (`/boot`) do dispositivo de armazenamento.
    * É compilado e comprimido (geralmente `bzimage`) para ser carregado mais rapidamente na RAM pelo bootloader (ex: grub, syslinux).
    * Descomprime-se na RAM em código de máquina e assume o controle da inicialização do sistema.
    * Gerencia e configura subsistemas e estruturas de dados responsáveis pelo mapeamento de interrupções, dispositivos e recursos do sistema, permitindo a interação entre o hardware e o kernel. Uma dessas estruturas é a IDT (Interrupt Descriptor Table), utilizada pelo processador para tratar interrupções e exceções, associando cada vetor de interrupção ao endereço da ISR (Interrupt Service Routine) correspondente, que pode ser acionada por eventos de hardware ou por interrupções de software.
    * Os subsistemas dele criam e gerenciam as interfaces para dispositivos e recursos do sistema, como o TTY (Terminal Tele Type) que usa a interface de dados de entrada do teclado `/dev/tty1` para fornecer uma interface de linha de comando em texto básica.

## Gerenciamento de Processos e Memória

### Processos
* **Definição**: Instância de um programa carregado na memória RAM, é executado em um contexto isolado e específico, ele pode estar em um estado específico, como: execução, pronto, dormindo, etc...
* **Estruturas Críticas (em GNU/Linux)**:
    * **PCB (Process Control Block)**: O PCB é a representação interna de um processo no kernel, contendo o contexto de execução e metadados necessários para escalonamento, gerenciamento de memória e controle de recursos.
        * Armazenado no espaço de memória do kernel (não é paginável ou "swappada").
        * Pode existir independentemente de uma tabela de páginas ativa.
        * Permite que gerenciadores de tarefas (como `htop`) monitorem e representem processos.
        * Contém a tabela de `file descriptors` abertos pelo processo.
    * **Tabela de Páginas**: Estrutura criada e configurada pelo kernel que define o mapeamento entre páginas virtuais do espaço de endereçamento de um processo e frames físicos na memória RAM. A tradução desses endereços é realizada pela MMU do processador. Cada frame físico é um bloco contíguo de memória física de tamanho fixo (igual ao tamanho da página). Páginas virtuais consecutivas podem mapear para frames físicos não contíguos, permitindo que regiões virtualmente contínuas sejam compostas por partes fisicamente dispersas na RAM.
    * **As principais áreas de memória de um processo são**:
      - **Stack**: Região usada para armazenar frames de chamadas de função, variáveis locais, endereços de retorno e registradores salvos. Cresce dinamicamente em direção a endereços virtuais menores, possui tamanho limitado e é protegida por páginas de guarda. Cada thread possui sua própria stack.
      - **Heap**: Região destinada à alocação dinâmica de memória em tempo de execução. É gerenciada pelo runtime da linguagem e pelo kernel, cresce dinamicamente em direção a endereços virtuais maiores e suas páginas físicas são alocadas sob demanda.
      - **Text (.text)**: Segmento que contém o código executável do programa. Geralmente mapeado como somente leitura e executável, podendo ser compartilhado entre processos que executam o mesmo binário.
      - **Read-Only Data (.rodata)**: Segmento que armazena dados constantes, como strings literais e variáveis globais constantes. Mapeado como somente leitura, impedindo modificações em tempo de execução.
      - **Initialized Data (.data)**: Segmento que contém variáveis globais e estáticas inicializadas. Mapeado como leitura e escrita e carregado a partir do binário ELF.
      - **Uninitialized Data (.bss)**: Segmento que contém variáveis globais e estáticas não inicializadas. Inicializado com zero pelo kernel durante o carregamento do processo e não ocupa espaço físico no binário.
      - **Memory-Mapped Region (mmap)**: Região usada para mapear arquivos, bibliotecas compartilhadas e grandes alocações de memória. Permite carregamento sob demanda, compartilhamento entre processos e controle fino de permissões.
      - **VDSO**: Pequena região mapeada pelo kernel no espaço de endereços do processo para fornecer rotinas de uso frequente, permitindo chamadas rápidas sem transição explícita para o modo kernel.

### Criação de Processos (Syscalls)
* **`fork()`**:
    * Chamada pelo processo pai para criar um processo filho usando o mecanismo de **Copy-On-Write (COW)**.
    * Cria uma tabela de páginas para o filho baseada nas entradas do pai.
    * Os endereços virtuais do filho apontam para os endereços físicos do pai.
    * As páginas do processo filho são automaticamente **`Read-Only`**.
    * Uma `Page Fault` ocorre se o filho tentar modificar uma página.
* **`execve()`**:
    * Obtém o caminho do executável, argumentos e variáveis de ambiente.
    * O kernel localiza e lê o conteúdo do executável (`open()`/`read()`) e mapeia suas seções (definidas pelo cabeçalho ELF) para as páginas do processo filho.
    * Aloca as áreas de memória virtual `Heap` e `Stack`.
* **Outras Syscalls**:
    * **`clone()`**: Cria processos ou threads com compartilhamento de recursos controlado, usado em threads ou containers.
    * **`posix_spawn()`**: Cria e executa um novo processo em uma única chamada, evitando cópias desnecessárias do `fork()`.

### Seções do Executável (ELF)
* `.text`: Onde as instruções de máquina são organizadas.
* `.data`: Endereços virtuais de variáveis globais ou estáticas.
* `.bss`: Para variáveis não inicializadas em páginas zeradas.
* `.rodata`: Endereços virtuais de constantes e literais.
* `Heap`: Armazenamento de valores dinâmicos.
* `Stack`: Armazenamento de variáveis locais e de escopo de execução, além do caminho do executável e variáveis de ambiente.

### `Page Fault`
* Uma exceção gerada pela CPU quando um processo filho tenta escrever em uma página `Read-Only`.
* O kernel resolve a exceção alocando endereços físicos para as páginas e atualizando a tabela de páginas.

## I/O e Comunicação com Dispositivos

### Interrupções e Syscalls
* O kernel se comunica com a RAM através da manipulação de tabelas de páginas.
* A CPU detecta uma syscall e consulta a tabela `IDT` (Interruption Descriptor Table) para encontrar o endereço físico da `ISR` (Interruption Service Runtime) correspondente.
* A ISR é o código que executa a função da syscall, como copiar áreas de memória (`fork()`) ou carregar um executável (`execve()`).
* Cada interrupção tem um nível de prioridade específico.

### File Descriptors (FDs)
* **Definição**: Números inteiros não negativos que representam recursos abertos por um processo (arquivos, dispositivos, sockets).
* **Estruturas Associadas**:q
    * A ISR usa o valor do FD para localizar a estrutura correspondente e chamar a função do driver.
    * A estrutura de um FD contém um ponteiro para o `inode` e para a estrutura `file_operations` do driver.
    * **`inode`**: Contém metadados do arquivo/dispositivo e um ponteiro para a `file_operations`.
    * **`file_operations`**: Contém as funções do driver (ex: `read`, `write`, `open`, `release`).
* **File Descriptors Padrão**:
    * Quando um processo é criado, o kernel define três FDs básicos:
        * `0`: Entrada padrão (`stdin`), geralmente o teclado.
        * `1`: Saída padrão (`stdout`), geralmente o terminal.
        * `2`: Saída de erros padrão (`stderr`), geralmente o terminal.

## Exemplo de Fluxo: Teclado para Shell

1.  **Ação do Usuário**: Uma tecla é pressionada, gerando um sinal elétrico.
2.  **Firmware do Teclado**: O controlador do teclado, via firmware, converte o sinal elétrico em um `scan code`.
3.  **Encapsulamento**: O `scan code` é encapsulado em pacotes, seguindo o protocolo USB HID (Human Interface Device).
4.  **Buffer e Interrupção**:
    * Os `scan codes` são armazenados no buffer do teclado ou no buffer do controlador USB da placa-mãe.
    * O controlador pode enviar uma interrupção de hardware para a CPU quando recebe novos pacotes.
5.  **Processamento pela CPU e Kernel**:
    * A CPU interrompe sua execução e consulta a tabela `IDT` do kernel com o valor da interrupção.
    * A CPU obtém o endereço da `ISR` correspondente à interrupção do hardware.
    * A `ISR` notifica o subsistema USB do kernel, que chama o driver associado ao teclado.
    * O driver do teclado coleta os `scan codes` do buffer e os decodifica.
6.  **Buffer do Kernel**:
    * O driver coordena os dados decodificados para um buffer no espaço de memória do kernel.
    * O kernel cria um arquivo de dispositivo de caractere (ex: `/dev/input/device-exemplo`) para fornecer uma interface aos dados.
7.  **Terminal e Shell**:
    * O terminal, em execução, usa a função `read()` para ler o buffer de entrada do kernel (`/dev/tty1`).
    * Quando o usuário pressiona "Enter", o terminal envia os dados para o buffer do shell (um processo filho).
    * O shell usa `read()` para ler os dados, interpreta o `\n` (nova linha) como o fim do comando e inicia o processamento.

## Conceitos Adicionais

* **Overhead**: Sobrecarga de processamento causada por operações desnecessárias ou ineficientes.
    * Exemplo: `fork()` copia a tabela de páginas do pai mesmo que o `execve()` a substitua em seguida.
* **Race conditions**: Situação em que dois ou mais processos/threads compartilham recursos e tentam executar as mesmas operações simultaneamente sem respeitar a sincronia, levando a resultados imprevisíveis.


## Recomendações de conteúdo
### Armazenamento, memória RAM e Outros
* [Curso de Eletrônica - Newton C. Braga](https://www.newtoncbraga.com.br/eletronica-digital/16358-curso-de-eletronica-eletronica-digital-memorias-adcs-e-dacs-cur5013.html)

### Memórias Virtuais e PCB
* [OpenOS Textbook - Memory Management](https://ajamias.github.io/openos/textbook/mm/intro.html)
* [Wikipedia - Bloco de controle de processo](https://pt.wikipedia.org/wiki/Bloco_de_controle_de_processo)
* [Soescola - O que é File Descriptor](https://soescola.com/glossario/o-que-e-file-descriptor#gsc.tab=0)

### Compiladores, Montadores, Arquivos Objeto, Linkers e Executáveis
* [Wikipedia - Arquivo objeto](https://pt.wikipedia.org/wiki/Arquivo_objeto)

### Processadores e Componentes Eletrônicos
* [IFSC Wiki - Interrupções](https://wiki.sj.ifsc.edu.br/index.php/MI1022806_2020_2_AULA08#Interrup%C3%A7%C3%B5es)
* [GitBooks - System Calls](https://gil0mendes.gitbooks.io/assembly/content/system_calls.html)
* [UFPE - Processo, Interrupção e Syscall](https://www.cin.ufpe.br/~cagf/if677/2017-2/slides/04-05_processo+interrupcao+syscall.pdf)
* [Passei Direto - Barramentos](https://www.passeidireto.com/arquivo/65117084/barramentos-arquitetura-de-computadores)
* [YouTube Video Link 1](https://youtu.be/dX9CGRZwD-w?feature=shared)
* [YouTube Video Link 2](https://youtu.be/AF8d72mA41M?feature=shared)
* [YouTube Video Link 3](https://youtu.be/e_hU6sAON2U?feature=shared)
* [YouTube Video Link 4](https://youtu.be/uByQnP5FsVY?feature=shared)
* [YouTube Video Link 5](https://youtu.be/uQPiyxoCk9E?feature=shared)
