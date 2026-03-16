# Flatpak e AppImage: o que são e como funcionam

## Flatpak

No Linux, o `Flatpak` é um sistema de distribuição e execução de aplicações *sandboxed*. Ele permite que aplicações sejam executadas de forma isolada e independente da distribuição utilizada.

Aplicações em formato `Flatpak` utilizam:

- Portais para comunicação com o sistema (`xdg-desktop-portal`)
- Runtimes compartilhados
- Sandbox para isolamento de permissões

O `Flatpak` possui um repositório central de aplicativos chamado Flathub.

## AppImage

O `AppImage` é um formato de distribuição portátil. Ele empacota a aplicação e suas dependências em um único arquivo executável.

Não requer instalação tradicional nem gerenciamento de runtime compartilhado.

## Diferença principal

- `Flatpak` → sandbox + runtime compartilhado + repositório
- `AppImage` → binário portátil autocontido
