---
layout: default
---

# Root e TWRP no Samsung

## Conceitos básicos

### O que é uma Stock ROM?

Uma Stock ROM é um conjunto de arquivos binários `.img` e `.bin` que compõem o sistema operacional do dispositivo, incluindo drivers e firmwares de fábrica.

Ela é desenvolvida pela fabricante do dispositivo, sendo organizada de acordo com o hardware e o esquema de particionamento.

Esses arquivos possuem diversas responsabilidades no funcionamento do sistema.

#### Exemplos comuns de arquivos `.img`

- `recovery.img`  
  Responsável por fornecer uma interface de gerenciamento básico do dispositivo.

- `boot.img`  
  Contém o kernel e o ramdisk (`initramfs`).

- `vendor.img`  
  Contém drivers e firmwares específicos de hardware.

- `vbmeta.img`  
  Responsável pela verificação de integridade do boot (Android Verified Boot).

- `system.img`  
  Contém os binários e utilitários do sistema operacional.
