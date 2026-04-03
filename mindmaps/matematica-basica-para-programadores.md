![Matemática e programação](/statics/images/mindmaps/matematica-para-programadores-de-jogos-85071217.png)

# Matemática básica para programadores

> Uma das grandes vantagens de sempre ter em mente conceitos matemáticos e computacionais básicos, é a capacidade de poder resolver problemas de forma mais rápida, simples e eficiente para a memória e processamento do computador. Além de auxiliar na criatividade de soluções e funcionalidades complexas e eficientes.

---

## Operadores aritméticos básicos, propósitos e funcionalidades

- **`+`**: Soma 2 números ou elementos, exemplo: `1 + 1` ou `"a" + "b"` e em algumas linguagens: `"a" + 1`.
  - Operação em termos matemáticos: `Parcela + Parcela = Soma/resultado`

- **`-`**: Subtrai um número do outro `1 - 1 = 0`, assim também encontrando a diferença entre eles.
  - Operação em termos matemáticos: `Minuendo - Subtraendo = Diferença/resultado`   

- `*`: Multiplica dois valores, repetindo o primeiro valor na mesma quantidade de vezes do segundo. Exemplo: `3 * 4 = 12 porque 3 + 3 + 3 + 3 = 12` (ou seja, 3 somado 4 vezes).
  - Operação em termos matemáticos: `Multiplicando × Multiplicador = Produto/resultado`

- **`/`**: Divide um valor (Dividendo) pela quantidade de vezes do outro (Divisor), dessa forma, encontrando o resultado (Quociente) que indique quantas vezes ele pode ser multiplicado pelo segundo valor (Divisor), para chegar no primeiro valor (Dividendo). Exemplo: `10 / 2 = 5` e `5 * 2 = 10`. Em linguagens de programação, usar "/" Pode retornar um número com casas decimais (float), mas usar "//" resulta em um inteiro (sem casa decimais). O resultado da divisão é chamado de quociente, o número que sobra da divisão é chamado de resto.
  - Operação em termos matemáticos: `Dividendo ÷ Divisor = Quociente`

- **`Porcentagem`**: A porcentagem é usada para comparar valores proporcionalmente, indicando quantas partes de 100 um valor representa. Na maioria das linguagens de programação (ao contrário do que muitos pensam), o operador `%` NÃO representa a porcentagem, mas sim a operação de módulo (ver a seguir). A maioria das linguagens não possui um operador aritmético específico associado à porcentagem. A fórmula para operações de porcentagem pode ser expressa como `Valor a ser descontado = Preço * Desconto / 100` então nesse caso, para achar o valor que será descontado do preço real do produto, é necessário saber apenas quantas partes de 100 esse **Desconto** representa em relação ao valor base, então fazer a subtração entre o **Preço** e o **Valor a ser descontado** resultante da operação `Preço * Desconto / 100`.
  - Operação em termos matemáticos: `Valor percentual = Valor base * Porcentagem / 100`

- **`%`**: Esse operador é conhecido como ***módulo (mod)*** e é usado para calcular e retornar o resto da divisão entre inteiros. Exemplo: `10 % 3 = 1` (pois 3 cabe 3 vezes em 10, sobrando 1), a fórmula correta para cálcular: resto = dividendo - divisor * quociente.

- **`!`**: Fatorial calcula o produto de todos os inteiros positivos de 1 até `n`. Exemplo: `5! = 5 × 4 × 3 × 2 × 1 = 120`. Muito usado em **combinatória** (contar possibilidades), **recursão**, análise de **complexidade** e problemas de permutação.
  - Operação em termos matemáticos: `n! = n × (n-1) × (n-2) × ... × 1`

- **`log`**: Logaritmo inverte a operação de exponenciação. Retorna o expoente ao qual a base deve ser elevada para se obter um número. Exemplo: `log₂(8) = 3`, pois \(2^3 = 8\). Em programação, usa-se `log` (base `e`), `log10` (base 10), ou `log2` (base 2).

---

## Método para entender a ordem das operações matemáticas
### PEMDAS *(Parênteses, Exponenciação, Multiplicação ou Divisão, Adição ou Subtração)*

---

## Big O Notation

A **notação Big O** descreve o comportamento de um algoritimo em relação ao tempo de execução e desempenho/eficiência à medida que a entrada/processamento de dados cresce. A notação ***Big Oh*** Ignora detalhes como tempo real de execução e foca na **ordem de crescimento** do algoritimo.

| Notação      | Nome e escala de tempo            | Exemplo                        |
|--------------|-----------------------------------|--------------------------------|
| `O(1)`       | Constante                         | Acesso direto em array         |
| `O(log n)`   | Logarítmica                       | Busca binária                  |
| `O(n)`       | Linear                            | Percorrer uma lista            |
| `O(n log n)` | Quase-linear                      | Merge Sort, Quick Sort         |
| `O(n²)`      | Quadrática                        | Bubble Sort, nested loops      |
| `O(2^n)`     | Exponencial                       | Backtracking, subsets          |

Quanto menor a complexidade, **mais escalável** o algoritmo é para entradas grandes.

O "O" vem de "Order of growth" (ordem de crescimento), representando o comportamento assintótico do algoritmo.

---

## Operações binárias

[Veja meu blog sobre o porquê dos computadores usam o sistema binário](https://gustavoaraujo.pages.dev/mindmaps/o-que-e-o-sistema-binario-e-como-ele-funcionai.md)

### Ordem e tipos de bytes

- **Bit**  
  - Unidade mínima de informação, vale `0` ou `1`.  
- **Byte (B)**  
  - Conjunto de **8 bits**.  
- **Kilobyte (KB)**  
  - `1024 bytes`.  
- **Megabyte (MB)**  
  - `1024 KB`.  
- **Gigabyte (GB)**  
  - `1024 MB`.
- **Terabyte (TB)**  
  - `1024 GB`.  
- **Word**  
  - Tamanho “natural” de dados para a CPU (ex: 16 bits em arquiteturas antigas).  
- **Double Word (DWORD)**  
  - `32 bits`.  
- **Quad Word (QWORD)**  
  - `64 bits`.  


> Trabalhar diretamente com bits é essencial para trabalhar com **bitmaps** de configurações ou informações de pacotes de rede, assim como **máscaras** de rede por exemplo, **flags**, **compressão**, **criptografia** e **otimizações de baixo nível**:

| Operador | Nome             | Descrição                                                                                                    |
|----------|------------------|--------------------------------------------------------------------------------------------------------------|
| `<< n`   | Shift left       | Desloca todos os bits **n** posições para a esquerda (multiplica por 2ⁿ).                                    |
| `>> n`   | Shift right      | Desloca todos os bits **n** posições para a direita (divide por 2ⁿ, descarta bits menos significativos).     |
| `&`      | AND              | Bit a bit: `1 & 1 = 1`, senão `0`. Usado em máscaras para **limpar** bits.                                   |
| `\|`     | OR               | Bit a bit: `0 \| 1 = 1`. Usado para **definir** bits sem alterar os demais.                                  |
| `^`      | XOR              | Bit a bit: `1 ^ 1 = 0`, `1 ^ 0 = 1`. Útil para **toggle** de bits e truques de swap sem variável temporária. |
| `~`      | NOT              | Inverte todos os bits do número, considerando o tamanho do tipo numérico e a representação em complemento de dois.: `~1010 → 0101`.                                                                   |

### **Exemplos práticos**:  
- `mask = value & 0x0F` — isola os 4 bits menos significativos.  
- `value |= 1 << 7` — seta (coloca como 1) o bit de índice 7.  
- `value ^= value` — zera `value` (todo bit se torna 0).  
- `value & (value - 1)` — remove o bit menos significativo “1” de `value`. 
- `value = (value + 3) & ~3` - arrendonda para um múltiplo de 4.

[Tabela de operações binárias básicas](/statics/images/mindmaps/operacoes-binarias.png)

---

## Unidades de medida de:

### Unidades de tempo
[Cálculo de unidades de tempo](/statics/images/mindmaps/calculo-tempo.jpg)
[Segundos](/statics/images/mindmaps/segundos.gif)

### Unidades númericas
[Tabela númerica](/statics/images/mindmaps/unidades-numericas.jpg)

---

## Estruturas de Dados: principais tipos, propósitos e funcionalidades

### Arrays (Vetores)
- **Descrição**: Estrutura linear de elementos de tamanho fixo, acessados por índice.
- **Usos**: Acesso rápido (O(1)), armazenamento sequencial, algoritmos que manipulam listas fixas.
- **Limitações**: Tamanho fixo, inserções/remoções custosas (O(n)).

### Listas Ligadas (Linked Lists)
- **Descrição**: Elementos armazenam valor + ponteiro para o próximo (e/ou anterior).
- **Tipos**: 
  - Simples: aponta só para o próximo.
  - Duplamente ligada: aponta para anterior e próximo.
- **Usos**: Inserções/remoções rápidas em qualquer ponto da lista.
- **Limitações**: Acesso sequencial (O(n)).

### Hash Table (Map / Dicionário)
- **Descrição**: Associa chaves a valores usando função de hash.
- **Usos**: Busca e acesso ultra rápidos (O(1) em média).
- **Limitações**: Colisões, pior caso O(n).

### Pilha (Stack)
- **Descrição**: Estrutura LIFO (Last In, First Out).
- **Usos**: Execução de funções, backtracking, algoritmos DFS.
- **Complexidade**: O(1) para inserção e remoção.

### Conjuntos (Set)
- **Descrição**: Coleção de valores únicos, sem ordem específica.
- **Usos**: Verificação de duplicatas, operações matemáticas de união/interseção.

### Fila (Queue)
- **Descrição**: Estrutura FIFO (First In, First Out).
- **Operações**: 
- **Usos**: Algoritmos BFS, buffers, sistemas de espera.
- **Variações**: Fila dupla (deque), prioridade (priority queue).

### Árvores (Trees)
- **Descrição**: Estrutura hierárquica onde cada nó aponta para filhos.
- **Tipos importantes**:
  - Binária
  - Binária de Busca (BST)
  - AVL, Red-Black (autobalanceadas)
  - Trie (prefixos)
- **Usos**: Busca eficiente, organização hierárquica, auto-complete.
- **Complexidade média**: O(log n) busca/inserção em árvores balanceadas.

### Fila de Prioridade (Priority Queue / Heap)
- **Descrição**: Elemento com maior (ou menor) prioridade é removido primeiro.
- **Implementação comum**: Heap binário.
- **Usos**: Algoritmos como Dijkstra, agendamento de tarefas.
- **Complexidade**: Inserção e remoção O(log n).

### Grafos (Graphs)
- **Descrição**: Conjunto de nós (vértices) conectados por arestas.
- **Representações**:
  - Lista de adjacência (eficiente)
  - Matriz de adjacência (simples, mas consome espaço)
- **Tipos**: Dirigido, não-dirigido, ponderado, cíclico, acíclico.
- **Usos**: Redes, caminhos mínimos (Dijkstra, BFS/DFS), IA, web.

> Em programação de baixo nível (C, assembly, sistemas embarcados), saber o tamanho em bytes de cada tipo (`char`, `int`, `long`, `float`, `double`) é fundamental para alinhamento de memória, ponteiros e desempenho.

---

## Plano Cartesiano

O **plano cartesiano** foi proposto por René Descartes e tem como objetivo unir a geometria à álgebra, permitindo a representação de pontos no espaço ou plano por meio de coordenadas numéricas.  
Em espaços bidimensionais, os pontos são representados por pares (x, y), e em espaços tridimensionais por trios (x, y, z).  
Esse sistema é a base para a construção de gráficos, vetores, detecção de colisões, transformações geométricas e aplicações em desenho computacional.

[Estrutura básica de um plano cartesiano](/statics/images/mindmaps/estrutura-plano-cartesiano.jpg)

---

## Funções trigonométricas e fundamentos gráficos

Essas funções aparecem com frequência em **animações**, **processamento de sinais**, **física**, **geometria** e **visualização gráfica**.

- **`cos`**: Função cosseno — Relaciona a projeção horizontal de um ponto sobre a circunferência unitária. Exemplo: `cos(0) = 1`, `cos(π/2) = 0`. Usado para calcular ângulos, rotação de vetores e componentes x de movimentos periódicos.

- **`sin`**: Função seno — Relaciona a projeção vertical de um ponto na circunferência unitária. Exemplo: `sin(0) = 0`, `sin(π/2) = 1`. Usado para vibrações, ondas, física e movimento oscilatório.

- **`tan`**: Função tangente — Representa a razão entre o seno e o cosseno de um ângulo, ou seja, `tan(θ) = sin(θ) / cos(θ)`.  
  Exemplo: `tan(0) = 0`, `tan(π/4) = 1`.  
  Usada em cálculos de inclinação, derivadas de funções trigonométricas, vetores e problemas envolvendo ângulos de visão ou rampa.

[Seno, cosseno e tangentes](/statics/images/mindmaps/seno-cosseno-tangente.png)

---

## Transformadas de Fourier

As **transformadas de Fourier** (criação de Joseph Fourier) servem para decompor sinais em suas **frequências componentes**. Qualquer onda pode ser expressa como a soma de senos e cossenos.  
Usada em:

- Processamento de sinais (áudio, sensores, rádio).
- Compressão (JPEG, MP3).
- Reconhecimento de padrões (visão computacional).
- Engenharia, eletrônica e matemática aplicada.
