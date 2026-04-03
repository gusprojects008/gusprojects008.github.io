![Imagem Magisk](/statics/images/mindmaps/Magisk-rootear-Android.png)

# Funcionamento do root por Magisk

## Uso do Magisk

### Processo comum

1. No computador, extraia o arquivo `boot.img` da Stock ROM original correspondente ao dispositivo.
2. Envie o arquivo para o smartphone:

```bash
adb push boot.img /storage/Download
```

3. Abra o APK do Magisk e aplique o patch no `boot.img` original enviado ao dispositivo.
4. Após o patch, recupere a versão modificada:

```bash
adb pull /storage/Download/magisk_patched.img
```

---

## Conceito geral de funcionamento

O Magisk recebe o arquivo `boot.img` (ou apenas o `ramdisk` / `initramfs`) oficial como entrada e o modifica, retornando uma nova versão do `boot.img` com binários e scripts adicionados para fornecer acesso root.

A técnica utilizada é conhecida como abordagem *systemless*, baseada em mecanismos de overlay que permitem modificar o sistema sem alterar diretamente partições críticas como:

* `/system`
* `/vendor`
* outras partições protegidas

O sistema real permanece intacto; as modificações ocorrem sobre uma camada virtual montada durante o boot.

---

## Formas de estudar o funcionamento do Magisk

* Desempacotar o `boot.img` original e o `boot.img` modificado pelo Magisk e compará-los.
* Explorar:

  * `debug_ramdisk`
  * `/data/adb`
* Ler a documentação oficial.
* Analisar os binários do Magisk.
* Monitorar o comportamento em tempo real durante o boot.
* Estudar o `init.rc`.

---

## Processo de inicialização

O Magisk pode redefinir a inicialização do `init` de duas formas, dependendo da organização do sistema e das SEPolicies.

### Papel do SELinux

O SELinux é o subsistema de segurança do kernel Linux que implementa o modelo MAC (Mandatory Access Control).

Ele vai além do modelo tradicional de permissões baseado em:

* usuários
* grupos
* bits de permissão

O SELinux define exatamente quem pode acessar o quê no sistema, incluindo:

* arquivos
* sockets
* dispositivos
* recursos do kernel

---

## Estratégias de substituição do init

### 1. Redirecionamento do init original

O `init` original pode ser modificado para redirecionar a execução para o `magiskinit`.

### 2. Substituição direta do init

O Magisk substitui o `init` original pelo `magiskinit`, que:

* Configura as SEPolicies
* Cria overlays
* Injeta hooks no `init.rc`
* Adiciona scripts e binários
* Inicia o `magiskd`
* Por fim, transfere o controle para o `init` original do sistema

Dependendo da organização das SEPolicies, o `magiskinit` pode iniciar como PID 1 ou permitir que o `init_second_stage` original assuma essa posição.

---

# Estrutura do SELinux

## SEPolicies

As políticas podem estar organizadas como:

* Um único arquivo binário consolidado
* Um conjunto modular de arquivos CIL

O Magisk escolhe a estratégia de patch conforme o formato.

---

## Caso 1: SEPolicy monolítica (arquivo binário único)

O Magisk gera um novo blob binário contendo:

* seus domínios
* seus tipos
* seus módulos de política

O kernel então carrega essa SEPolicy modificada.

Exemplo de contexto:

```
u:r:magisk:s0
```

---

## Caso 2: SEPolicy modular (CIL)

O `init` percorre diretórios como:

```
/vendor/etc/selinux/*.cil
```

Para cada arquivo, executa internamente:

```
security_load_policy(fd, size)
```

Nesse modelo modular, o Magisk pode interceptar a chamada `security_load_policy()` e inserir suas próprias políticas dinamicamente.

Isso pode ser feito via:

* `LD_PRELOAD`
* manipulação de `selinuxfs`
* FIFOs internas

Essa abordagem oferece maior modularidade.

---

# Componentes do SELinux

## Módulos de política

Arquivos `.pp` ou `.cil` agrupam regras específicas.

Exemplo:

* módulo para `init`
* módulo para `magisk`
* módulo para subsistemas específicos

---

## Type Enforcement (TE)

É o núcleo da política.

### Domínios

Representam processos ou classes de processos:

* `init`
* `system_server`
* `magiskd`

### Tipos de objeto

* `file`
* `socket`
* `device_file`

### Atributos

Permitem agrupar domínios e tipos para simplificar regras.

---

## Role-Based Access Control (RBAC)

Cada domínio é associado a um papel, como:

* `system_r`
* `untrusted_app_r`
* `magisk_r`

Controla quais domínios podem transitar entre si.

---

## Type Transitions

Regras que definem o domínio assumido ao executar determinado binário.

Exemplo:

Executar `su` pode causar transição de:

```
shell → shell_magisk
```

---

## File Contexts

O arquivo `file_contexts` mapeia caminhos para tipos SELinux:

Exemplo:

```
/system/bin/*    system_file
```

---

## Port, Socket e Netif Contexts

Mapeamento de:

* portas de rede
* tipos de socket
* interfaces de rede

Exemplo:

```
80    tcp_port_t
```

---

## MLS / MCS

### MLS (Multi-Level Security)

Define níveis como:

```
s0 - s15
```

Raramente utilizado no Android padrão.

### MCS (Multi-Category Security)

Variante simplificada usada para isolamento entre aplicativos.

---

## Booleans

Flags que podem ativar ou desativar conjuntos de regras em tempo de execução, sem recompilar a política completa.

Podem ser usadas para:

* debug
* compatibilidade
* habilitação dinâmica de permissões adicionais

---

# magiskd (Daemon)

O `magiskd` é o daemon do Magisk.

Ele é iniciado pelo `init` original por meio de entrada inserida no `init.rc` pelo `magiskinit`, geralmente via:

```
magisk --daemon
```

Responsabilidades:

* Gerenciar requisições de root
* Comunicar-se com o Magisk Manager
* Aplicar módulos
* Aplicar patches em runtime

---

# Métodos de overlay

## 1. OverlayFS com imagem ext4/ext2

O Magisk pode utilizar um arquivo como `magisk.img` formatado em ext4 ou ext2.

Montagem típica:

```bash
mount -t overlay \
-o lowerdir=/system,upperdir=/magisk/system,workdir=/magisk/.work \
overlay /system
```

### Componentes

* `lowerdir`: camada inferior (`/system` original, read-only)
* `upperdir`: camada superior (alterações)
* `workdir`: diretório temporário exigido pelo kernel
* `/system`: ponto de montagem final combinado

As alterações são armazenadas na camada superior, preservando o sistema original.

---

## 2. Bind-mount recursivo (sem OverlayFS)

Nesse método, o Magisk utiliza:

```bash
mount --rbind /magisk/system/app /system/app
mount --rbind /magisk/system/lib /system/lib
```

As alterações presentes em `/magisk/system/...` são refletidas nos diretórios reais enquanto o bind-mount estiver ativo.

Nenhuma modificação permanente é feita na partição original.

---

## 3. TMPFS (ambiente totalmente volátil)

O `magiskinit` pode montar um `tmpfs`:

```bash
mount -t tmpfs magisk /debug_ramdisk
```

`tmpfs` armazena dados em RAM, tornando as modificações voláteis.

### Extração de binários

```bash
xz -d /overlay.d/sbin/magisk.xz > /debug_ramdisk/magisk
xz -d /overlay.d/init-ld.xz > /debug_ramdisk/init-ld
xz -d /overlay.d/stub.xz > /debug_ramdisk/stub

mkdir -p /system/system_ext/bin

xz -d /overlay.d/sbin/magisk.xz > /system/system_ext/bin/magisk
xz -d /overlay.d/init-ld.xz > /system/system_ext/bin/init-ld
xz -d /overlay.d/stub.xz > /system/system_ext/bin/stub
```

Após isso:

* Os binários necessários estão disponíveis
* O daemon pode ser iniciado
* O ambiente de execução é configurado

Modificações feitas em `tmpfs` são perdidas após reinicialização.

---

# Referências

Magisk internal details:
[https://topjohnwu.github.io/Magisk/details.html](https://topjohnwu.github.io/Magisk/details.html)

Android StackExchange:
[https://android.stackexchange.com/questions/213167/how-does-magisk-work](https://android.stackexchange.com/questions/213167/how-does-magisk-work)

Documentação oficial:
[https://github.com/topjohnwu/Magisk/tree/master/docs](https://github.com/topjohnwu/Magisk/tree/master/docs)
[https://magisk.readthedocs.io/en/latest/developers/internaldetails.html](https://magisk.readthedocs.io/en/latest/developers/internaldetails.html)
