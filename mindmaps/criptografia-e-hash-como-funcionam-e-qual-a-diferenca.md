# O QUE É CRIPTOGRAFIA E HASH? COMO FUNCIONAM? QUAL A DIFERENÇA? ENTENDA:

ENTENDA OS PRINCIPAIS TIPOS E COMO SÃO USADAS:

- - -

### O QUE É CRIPTOGRAFIA E HASH? COMO FUNCIONAM? QUAL A DIFERENÇA? ENTENDA:

#### ENTENDA OS PRINCIPAIS TIPOS E COMO SÃO USADAS:

Antes de tentar entender a **criptografia**, é ideal saber o funcionamento básico do sistema binário: [Entenda](https://medium.com/@mrmaskedgus/o-que-é-o-sistema-binário-e-como-ele-funciona-ddb4c0594f79)

A criptografia é uma forma de esconder uma mensagem, onde só a pessoa que a criou sabe a forma de lê-la/descriptografá-la. A mensagem criptografada, cripto = esconder e grafia = escrita.

Um exemplo dos primeiros tipos de criptografia é trocar uma letra por outra usando o alfabeto: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z. A forma desta criptografia será assim: trocar a letra do texto original pela próxima letra que vem depois dela. Por exemplo, a palavra “GUSTAVO”, criptografando-a da maneira dita, fica: “HVTUBWP”. Assim fica muito mais difícil para outras pessoas lerem sem saber o segredo (forma) de como ler a mensagem.

Mas este exemplo é super simples e, com um bom tempo analisando o alfabeto, é possível descobrir padrões de troca de letras, fazendo com que seja possível, em algum momento, a pessoa descobrir a forma de ler a mensagem.

Hoje em dia, a criptografia está muito mais avançada e existem formas mais complexas de criptografar mensagens e formas para descriptografar. Mas primeiro deve-se saber os tipos de criptografia usados no mundo **digital** hoje em dia: **A Criptografia Simétrica** e **Assimétrica.**

**Criptografia Simétrica**: Na criptografia **simétrica** é usada apenas uma única chave para criptografar uma informação e descriptografar.

**Criptografia Assimétrica**: Criptografia assimétrica usa dois tipos de chaves, uma chave pública e uma chave privada. A chave pública é usada para criptografar os dados, e a chave privada é usada para decodificar/descriptografar/ler a **mensagem**, por isso o **algoritmo** geralmente usado por ela é o RSA.

A chave pública pode ser conhecida por todos, porque ela é usada apenas para criptografar uma mensagem. Mas a chave privada deve ser escondida com segurança, porque ela é usada para descriptografar a mensagem criptografada com a chave pública.

Por exemplo, no WhatsApp, no momento da comunicação, você possui a chave pública do contato com quem você está se comunicando.

Então, **você** envia uma mensagem criptografada com a chave pública da pessoa, e apenas ela poderá ler a mensagem, porque ela possui a chave privada usada para ler a mensagem criptografada com a chave pública dela.

#### Tipos de **criptografia** e como funcionam:

Geralmente, na criptografia simétrica, é usado o algoritmo AES (Padrão de Criptografia Avançado). Ele opera com blocos de dados de 128 bits e funciona a partir de chaves de 128, 192 ou 256 bits. **Quanto** maior a chave, mais segurança irá ter, mas menos desempenho, pois a partir do tamanho da chave mais rodadas de criptografia **irão** ocorrer, exemplo:

O número de rodadas por tamanho da chave foi escolhido especificamente por motivos de segurança, desempenho e compatibilidade com o tamanho da chave.

Com a chave de 128 bits **ocorrem** 10 rodadas de **criptografia**.

Com a chave de 192 bits **ocorrem** 12 rodadas de **criptografia**.

Com a chave de 256 bits **ocorrem** 14 rodadas de **criptografia**.

**Quanto** maior o tamanho da chave, mais rodadas de **criptografia** **poderão** e **serão feitas**, mas com isso o desempenho é afetado, pois requer mais processamento para **criptografia** e principalmente para **descriptografia**.

Mas o que significa “_Operar com blocos de dados de 128 bits_”?: Significa que o algoritmo AES criptografa 128 bits de dados em blocos por processamento. A informação original é **dividida** em blocos de 128 bits, e cada bloco é criptografado por operação. Mas quais são os processos usados na operação de criptografia?

O formato dos blocos de dados de 128 bits é 4x4, com 16 células no total, e em cada célula é armazenado 1 byte (8 bits). O byte **poderá** ter um valor de 0 a 255. **Então**, no fim, somando todos os bytes de cada célula (16 células \* 8 bits), temos o valor de 128 bits. Exemplo:

|     |     |     |     |
| --- | --- | --- | --- |TABELA DE BLOCO DE DADOS
| cel0 | cel4 | cel8 | cel12 |
| cel1 | cel5 | cel9 | cel13 |
| cel2 | cel6 | cel10 | cel14 |
| cel3 | cel7 | cel11 | cel15 |

Em cada célula é armazenado 1 byte (8 bits). 16 células = 128 bits por bloco.

1 — Substituição de bytes (SubBytes):

Cada byte do bloco original de dados de 128 bits é substituído por outro byte de uma tabela pré-definida no algoritmo AES, chamada de S-box. A S-box atua como outro bloco de dados que substitui os bytes do bloco original. Ela é constante e está sempre presente no processo de criptografia, pois é essencial para o embaralhamento dos dados e também para possibilitar o desembaralhamento no processo inverso.

No entanto, a S-box não é exatamente pré-definida; em vez disso, é criada a partir de uma sequência lógica e padrão de cálculos matemáticos com os bytes do bloco original de dados, gerando assim a tabela de **substituição** de bytes **S-box**, exemplo:

![](/statics/images/mindmaps/funcionamento-criptografia-subBytes.png)

Por Matt Crypto — Obra do próprio, Domínio público, [https://commons.wikimedia.org/w/index.php?curid=1118913](https://commons.wikimedia.org/w/index.php?curid=1118913)

2 — Mistura de linhas (ShiftRows).

Nesse processo, as **linhas** da tabela são movidas para **esquerda** por uma quantidade **específica** de vezes e em **linhas específicas**, de maneira **padronizada**. Exemplo:

A primeira linha da tabela não sofre **nenhuma** mudança.

A segunda linha é movida circularmente para **esquerda**, apenas 1 vez.

A terceira linha é movida **circularmente** para **esquerda** 2 vezes.

A quarta linha é movida **circularmente** para **esquerda** 3 vezes.

Esse processo contribui ainda mais para o embaralhamento das informações.

![](/statics/images/mindmaps/funcionamento-criptografia-shiftRows.png)

Por User:Matt Crypto — Obra do próprio, Domínio público, [https://commons.wikimedia.org/w/index.php?curid=1118782](https://commons.wikimedia.org/w/index.php?curid=1118782)

3 — Mistura de colunas (MixColumns):

Essa operação é feita a partir da **tabela** de bloco de dados original, após ela passar pelo processo de **SubBytes** e **ShiftRows**.

Funcionamento:

Cada coluna da tabela de bloco de dados é multiplicada por uma matriz definida, específica e constante no algoritmo AES.

![](/statics/images/mindmaps/funcionamento-criptografia-mixColumns.png)

Por User:Matt Crypto — Obra do próprio, Domínio público, [https://commons.wikimedia.org/w/index.php?curid=1118874](https://commons.wikimedia.org/w/index.php?curid=1118874)

Cada byte da coluna é multiplicado pela matriz definida e padrão do algoritmo AES, e no fim gerando uma nova coluna com bytes **diferentes**, assim contribuindo ainda mais para o embaralhamento dos dados.

![](/statics/images/mindmaps/funcionamento-criptografia-multiplicação-bytes-matriz.svg)

4 — Adicionar chave de rodada (AddRoundKey): Antes de explicar o processo principal, é preciso explicar uma operação muito usada para criptografar os dados no final de cada rodada.

XOR: É uma operação usada para validar se 2 dados são iguais ou diferentes, e assim obter uma única resposta: sendo 1 para caso os dados sejam diferentes ou 0 caso sejam iguais. Por exemplo, se os 2 dados de entrada forem iguais, exemplo:

1 = 1 ou 1 xor 1. Então o resultado é 0 ou False, pois os dados são iguais e não são diferentes.

Mas se os 2 dados de entrada forem diferentes, exemplo: 1 xor 0 ou 1 = 0. Então o resultado é 1 ou True, pois os dados são diferentes.

Esse processo é um dos mais importantes, sendo necessário para que a chave principal tenha influência na criptografia e descriptografia.

Ele é responsável por gerar uma chave de rodada que é derivada da chave principal e usará a chave de rodada para criptografar os dados. Mas como a chave de rodada é gerada? A chave de rodada é derivada da chave principal. A quantidade de rodadas que irá ocorrer na criptografia vai depender do tamanho da chave principal. Quanto maior o tamanho da chave principal, mais chaves de rodadas poderão ser geradas e mais rodadas de criptografia irão ocorrer, proporcionando mais segurança, mas menos desempenho. O processo de gerar chaves de rodadas para a criptografia só ocorre após as operações de **SubBytes**, **ShiftRows** e **MixColumns**.

A chave principal pode ser de 128, 192 ou 256 bits. Para este exemplo, usarei uma chave de 128 bits. Ela é dividida por 4, obtendo assim 4 partes, cada uma com 32 bits, sendo que cada parte é uma palavra-chave de 32 bits. A partir da combinação de cada palavra-chave, são geradas diversas chaves de rodada, mas é gerada apenas 1 chave de rodada a cada rodada. Com uma chave de 128 bits, são feitas 10 rodadas de criptografia.

![](/statics/images/mindmaps/funcionamento-criptografia-addRoundKey.png)

Por User:Matt Crypto — Obra do próprio, Domínio público, [https://commons.wikimedia.org/w/index.php?curid=1118831](https://commons.wikimedia.org/w/index.php?curid=1118831)

A chave de rodada é usada para criptografar os dados a partir de uma operação **_XOR_** com os bytes da tabela do bloco de dados de estado.

Os bytes da chave de rodada são comparados com os bytes **do** bloco de dados de estado e assim gerando um novo byte diferente se os dois bytes forem diferentes entre si.

Com esse processo final, o embaralhamento ocorre com influência da chave **principal**, de maneira otimizada e segura.

Uma curiosidade comum é **se é possível** que as chaves de rodada se repitam durante as 10 **rodadas**. E a resposta é não, pois cada chave de rodada é gerada de forma e método único e preciso a cada rodada.

**Observação**: A tabela do bloco de dados de estado é **o** bloco de dados após passar pelo processo de **SubBytes**, **ShiftRows** e **MixColumns**.

**Observação**: Esse processo não ocorre na última rodada, e nem na primeira rodada, pois na primeira rodada é **usada a** chave principal para criptografar e descriptografar os dados.

- - -

### E o hash? Como funciona? Qual a diferença para a criptografia?

O hash é uma forma de criar um identificador/assinatura única para um arquivo, com base nos dados do arquivo e metadados dele, como o horário da criação do arquivo, sua origem, local e valores. Para isso, é gerado um valor único e fixo a partir dos dados do arquivo, usado para representar o arquivo original.

Assim, torna-se possível fazer a comparação de dois arquivos a partir **do hash** deles e verificar se, por exemplo, você recebeu ou baixou o arquivo original, comparando o hash original do arquivo com o hash do arquivo que você recebeu ou baixou.

O hash, diferente da criptografia, não pode ser **revertido** ou quebrado para ver as origens dos dados **do** hash ou os dados em si **dele**. Para a geração de **um** hash, deve ser usado um algoritmo seguro e difícil de ser quebrado. No entanto, ainda existem possíveis ataques, por exemplo, ao ter o hash de uma senha e saber o algoritmo de hash que é usado **nele**, é possível tentar obter o hash de diversas senhas até encontrar uma senha com o hash compatível com o hash que você não sabe a origem.

A função **hash** é muito utilizada em vários cenários em contexto de segurança e confiabilidade.
