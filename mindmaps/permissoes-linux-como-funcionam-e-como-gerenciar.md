# PERMISSÕES LINUX, COMO FUNCIONAM? COMO GERENCIAR? ENTENDA:

ENTENDA COMO FUNCIONA O SISTEMA DE PERMISSÕES LINUX E COMO GERENCIÁ-LAS:

- - -

### PERMISSÕES LINUX, COMO FUNCIONAM? COMO GERENCIAR? ENTENDA:

ENTENDA COMO FUNCIONA O SISTEMA DE PERMISSÕES LINUX E COMO GERENCIÁ-LAS:

Antes de tentar entender as permissões Linux, é importante saber o funcionamento básico do sistema binário: [Entenda](https://medium.com/@mrmaskedgus/o-que-é-o-sistema-binário-e-como-ele-funciona-ddb4c0594f79)

Entender e saber gerenciar as permissões do seu sistema operacional é muito importante, principalmente se você for um administrador de sistemas de uma empresa ou até mesmo se você for um usuário comum do dia a dia.

![](/statics/images/mindmaps/permissões-linux-representação.jpg)

Saber gerenciar as permissões dos programas, processos e usuários é uma habilidade muito importante, pois ela afeta diretamente na segurança do seu sistema.

E se você não souber gerenciá-las, você pode facilmente comprometer seu sistema e os dados nele.

Como funciona o sistema de permissões do sistema operacional Linux?

No sistema operacional Linux por padrão existem 2 tipos de usuário:

Usuário Comum e usuário **ROOT**.

O usuário **ROOT**: é o usuário que vem por padrão no kernel Linux, e ele é o usuário com mais permissões no sistema, podendo ler e modificar qualquer arquivo ou programa e instalar qualquer software no sistema operacional.

Ele é usado para administrar o sistema, e assim executar operações e tarefas com privilégios altos na máquina, podendo manipular a máquina e fazer qualquer operação nela.

Ele é usado para criar um usuário comum e definir as permissões dele sobre a máquina e outros usuários, programas e arquivos do sistema. Como por exemplo, o que ele pode ler, ou escrever ou executar na máquina.

O usuário comum: é o usuário criado pelo **superusuário** do sistema, o **ROOT**. O usuário comum é o usuário do dia a dia usado para realizar tarefas e operações que não precisem de muitos privilégios na máquina e no sistema.

#### **Tipos de permissões:**

**READ**: Ler, letra para indicativo: **R**  
**WRITE**: Escrever, letra para indicativo: **W**  
**EXECUTE**: Executar, letra para indicativo: **X**

O “**\-**” significa a ausência de permissão sobre o arquivo ou diretório.

Assim, ficando: **RWX** ou **RW-** quando não tem permissão para executar “**X**”

Exemplo:

![](/statics/images/mindmaps/permissões-linux.png)

Neste exemplo, o primeiro caractere indica o tipo de arquivo, sendo o: **“-”** indicando que é um arquivo, se fosse um diretório seria “**d**”.

Após isso, começam as informações de permissão. As informações de permissão são mostradas em ordem.

A ordem de permissões sobre o arquivo ou diretório é:

1 — permissões do **USER** ou dono do arquivo.

2 — permissão dos **GROUPS**, grupos de usuários e arquivos que podem acessar o diretório ou arquivo.

3 — permissões dos **OTHERS**, todos os usuários e programas do sistema.

Então cada conjunto de permissões **RWX** estão em ordem: usuário(owner), grupos e outros.

![](/statics/images/mindmaps/permissões-linux-funcionamento.png)

fonte: [https://linuxeprogramacao.images.blogspot.com/2013/07/permissao-de-arquivos-no-linux-chmod.html](https://linuxeprogramacao.images.blogspot.com/2013/07/permissao-de-arquivos-no-linux-chmod.html)

- - -

Com o chmod é possível definir as permissões do usuário, grupos e dos outros sobre o arquivo ou diretório, a partir do valor que define cada permissão, por exemplo:

chmod 777 arquivo.txt

O 7 tem o valor da permissão que você está dando, por exemplo:

**7 em binário é 111**, assim, como as permissões ficam em ordem: **RWX, cada bit indica se a permissão está ativa ou não**.

Ficando:  
**R W X  
1 1 1**

Você estará dando permissão de ler, escrever e executar!

Exemplo:  
chmod 777 arquivo.txt

Então na ordem fica: 7 para o owner, 7 para os groups, 7 para os others, ficando 777, assim, todos podem ler, escrever e executar no “arquivo.txt".

Com conhecimento sobre o funcionamento das permissões Linux, você também pode identificar vulnerabilidades e pontos de ataque que você pode explorar em um sistema, e corrigi-los.
