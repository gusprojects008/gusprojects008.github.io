# Conceitos fundamentais sobre linguagens de programação

## Por que aprender e revisar continuamente os fundamentos?

Reforçar constantemente os conceitos fundamentais permite:

* Entender como o código é transformado em instruções executáveis pela CPU.
* Compreender o custo real de abstrações de alto nível.
* Escrever código mais eficiente e previsível.
* Identificar gargalos de desempenho.
* Entender vulnerabilidades e superfícies de ataque.
* Migrar com mais facilidade entre linguagens.

Sem domínio dos fundamentos, o programador apenas utiliza ferramentas; com domínio, ele entende o que ocorre internamente.

---

# Conceitos básicos

## Unidade Lógica e Aritmética (ULA)

A ULA executa operações fundamentais da CPU, como:

* Operações aritméticas:

  * Soma
  * Subtração
  * Multiplicação
  * Divisão
* Operações lógicas:

  * AND
  * OR
  * XOR
  * NOT
* Operações de deslocamento:

  * Shift left
  * Shift right

Essas operações atuam sobre registradores e dados binários.
Toda linguagem de programação, independentemente do nível de abstração, depende dessas operações em última instância.

---

## Linguagens compiladas e interpretadas

### Linguagens compiladas

* O código-fonte é transformado em código de máquina antes da execução.
* O resultado é um binário executável.
* Exemplo: C, Rust.

Características:

* Maior controle sobre memória.
* Melhor desempenho previsível.
* Dependência da arquitetura alvo.

---

### Linguagens interpretadas

* O código é executado por um interpretador ou máquina virtual.
* Pode envolver compilação intermediária (bytecode + VM).
* Exemplo: Python, JavaScript.

Características:

* Portabilidade maior.
* Abstração elevada.
* Overhead adicional em tempo de execução.

---

## Propósito e características das linguagens

Cada linguagem é projetada com prioridades diferentes:

* Controle de hardware (C, Assembly)
* Segurança de memória (Rust)
* Produtividade e legibilidade (Python)
* Execução em ambientes distribuídos e web (JavaScript)
* Portabilidade via máquina virtual (Java)

A escolha da linguagem depende de:

* Domínio da aplicação
* Requisitos de desempenho
* Modelo de concorrência
* Segurança
* Ecossistema

---

# Assembly

## Por que aprender Assembly?

Aprender Assembly permite:

* Entender como a CPU realmente executa instruções.
* Compreender registradores, stack, heap e chamadas de função.
* Visualizar o modelo real de memória.
* Entender convenções de chamada.
* Compreender como vulnerabilidades como buffer overflow ocorrem.

Vantagens:

* Controle total sobre instruções.
* Otimizações específicas por arquitetura.
* Base sólida para engenharia reversa e segurança.

---

# C

## Motivos para aprender C

* Compreender gerenciamento manual de memória.
* Entender como sistemas operacionais são construídos.
* Base para entender compiladores e runtimes.
* Forte proximidade com o hardware.

## Tipos de dados em C

Tipos primitivos:

* `char`
* `int`
* `float`
* `double`
* `short`
* `long`

Tipos derivados:

* `struct`
* `union`
* `enum`
* ponteiros

C expõe diretamente:

* Endereços de memória
* Aritmética de ponteiros
* Layout de dados em memória

---

# JavaScript

## Motivos para aprender JavaScript

* Linguagem dominante no desenvolvimento web.
* Executada em navegadores e ambientes server-side.
* Baseada em protótipos.
* Modelo orientado a eventos.

Conceitos importantes:

* Event loop
* Modelo assíncrono
* Promises
* Garbage collector
* Motor de execução (ex: V8)

---

# Python

## Motivos para aprender Python

* Sintaxe simples e expressiva.
* Forte uso em automação, ciência de dados e segurança.
* Grande ecossistema de bibliotecas.

Características técnicas:

* Interpretado com bytecode.
* Máquina virtual (CPython).
* Garbage collector.
* Tipagem dinâmica.

---

# Rust

## Motivos para aprender Rust

* Segurança de memória sem garbage collector.
* Modelo de ownership e borrowing.
* Prevenção de data races em tempo de compilação.
* Performance comparável a C.

Conceitos centrais:

* Ownership
* Borrow checker
* Lifetimes
* Traits
* Pattern matching

---

# Java

## Motivos para aprender Java

* Portabilidade via JVM.
* Forte uso corporativo.
* Tipagem estática.
* Ecossistema maduro.

Características técnicas:

* Compilação para bytecode.
* Execução na Java Virtual Machine.
* Garbage collector.
* JIT compiler.

---

# Compiladores, montadores, arquivos objeto e executáveis

## Compilador

Transforma código-fonte em:

* Código de máquina
* Ou código intermediário (IR, bytecode)

Etapas comuns:

* Análise léxica
* Análise sintática
* Análise semântica
* Geração de código
* Otimização

---

## Montador (Assembler)

Converte código Assembly em código de máquina.

Produz:

* Arquivo objeto (`.o`)

---

## Arquivo objeto

Contém:

* Código compilado
* Tabelas de símbolos
* Informações de relocação

Ainda não é executável final.

---

## Linker

Responsável por:

* Resolver símbolos externos
* Combinar múltiplos arquivos objeto
* Produzir o executável final

Pode gerar:

* Executáveis estáticos
* Executáveis dinamicamente linkados

---

## Formatos de executáveis

Dependem do sistema operacional:

* ELF (Linux)
* PE (Windows)
* Mach-O (macOS)

Esses formatos definem:

* Seções (.text, .data, .bss)
* Tabelas de símbolos
* Cabeçalhos
* Informações de relocação

---

## Referência

Compiladores, montadores, arquivos objeto, linkers e executáveis:
[https://pt.wikipedia.org/wiki/Arquivo_objeto](https://pt.wikipedia.org/wiki/Arquivo_objeto)
