---
layout: default
---

# O QUE SÃO METADADOS? E COMO FUNCIONAM?

ENTENDA OS CONCEITOS BÁSICOS SOBRE ESTEGANOGRAFIA EM ARQUIVOS:

- - -

![](/statics/images/mindmaps/metadados-como-funcionam.png)

fonte: [https://pixabay.com/pt/vectors/computador-criptografar-criptografia-1294045/](https://pixabay.com/pt/vectors/computador-criptografar-criptografia-1294045/)

### O QUE SÃO METADADOS? E COMO FUNCIONAM?

ENTENDA OS CONCEITOS BÁSICOS SOBRE ESTEGANOGRAFIA EM ARQUIVOS:

A esteganografia é uma técnica utilizada para ocultar mensagens, como: senhas, links, arquivos ou outras informações, dentro de outros arquivos, geralmente em uma imagem.

Para entender melhor como isso é possível, é bom entender o que é uma imagem e o que a compõe.

Mas o que é uma imagem? Na verdade, uma imagem é um grande conjunto de bytes que formam uma grande matriz de dados. Esses dados definem os valores de cada pixel na grade de pixels.

![](/statics/images/mindmaps/metadados-como-funcionam-imagens.png)

fonte: [https://img.vivaolinux.com.br/imagens/artigos/comunidade/1310867984.figura\_1.png](https://img.vivaolinux.com.br/imagens/artigos/comunidade/1310867984.figura_1.png)

O pixel é a menor unidade de uma imagem digital, representando o ponto mais básico de uma tela. Cada pixel é formado por 3 pequenos sub-pixels que podem ser vermelho, verde ou azul (**RGB**).

![](/statics/images/mindmaps/metadados-como-funcionam-rgb.jpg)

fonte: [https://i0.wp.com/www.orientdisplay.com/wp-content/uploads/2021/01/1-5.png?resize=226%2C223&ssl=1](https://i0.wp.com/www.orientdisplay.com/wp-content/uploads/2021/01/1-5.png?resize=226%2C223&ssl=1)

Assim, em imagens digitais, cada pixel geralmente recebe 3 bytes, pois cada byte é usado para representar a quantidade de luz e a intensidade de cada sub-pixel, com valores que variam de 0 a 255. Combinando e misturando esses níveis de intensidade para cada um dos sub-pixels, é possível criar uma ampla diversidade de cores, e assim formar imagens.

![](/statics/images/mindmaps/metadados-como-funcionam-pixel.jpg)

fonte: [https://telasnotebookblog.wordpress.com/wp-content/uploads/2014/07/pixel.jpg](https://telasnotebookblog.wordpress.com/wp-content/uploads/2014/07/pixel.jpg)

![](/statics/images/mindmaps/metadados-como-funcionam-extensões.png)

fonte: Imagem de [Mateusz Zdrzałek](https://pixabay.com/pt/users/mtzd-1593970/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2488093) por [Pixabay](https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2488093)

As extensões de arquivo são responsáveis por definir como o sistema operacional deve ler, processar e executar o arquivo através da CPU e dos diversos componentes do computador. Elas também auxiliam o sistema operacional a identificar com qual programa deve abrir e manipular o arquivo.

Isso se aplica a imagens, vídeos e todo o conteúdo do seu computador. As imagens possuem diversos tipos de extensões e formatos, cada formato com suas características específicas, como leveza, alta ou baixa qualidade, entre outros aspectos.

As extensões de imagens mais comuns são:

*   **JPEG/JPG**: Formato de imagem que pode reduzir o tamanho dos bytes por meio da compactação, com uma ligeira perda de qualidade.
*   **PNG**: Formato de imagem que mantém a qualidade original, resultando em um tamanho de arquivo maior.

Neste blog, não vou explicar detalhadamente sobre os algoritmos dos formatos de imagem como JPEG e PNG, mas deixarei os links explicando sobre os algoritmos JPEG/JPG e PNG:

*   [Algoritmo JPEG/JPG](https://pt.wikipedia.org/wiki/JPEG#Algoritmo)
*   [Algoritmo PNG](https://pt.wikipedia.org/wiki/PNG#Funcionamento)

Basicamente, os dados da imagem são organizados e processados de acordo com os diferentes tipos de formatos de extensão de imagem. O sistema operacional identifica o formato da imagem e a decodifica corretamente conforme sua extensão (como JPG, PNG, etc.) através do processador (CPU). Em seguida, por meio das APIs gráficas, renderiza os pixels e suas sombras no monitor com a ajuda da GPU, exibindo finalmente a imagem na tela.

Esta é apenas uma forma de explicar os processos básicos de como o computador processa sua imagem.

Então, o que são metadados e para que servem?

Os metadados são informações sobre os dados de um arquivo ou imagem. Eles podem ser salvos automaticamente ou inseridos manualmente no conteúdo do arquivo em um local específico.  
Esses metadados podem incluir informações como: título, autor, resumo, palavras-chave, referências, direitos autorais, fonte de financiamento, data de criação e publicação, entre outras.

Essas informações seguem formatos e padrões específicos, dependendo de fatores como o dispositivo em que o arquivo ou a imagem foi criado.

**EXIF**(Exchangeable Image File Format) é o formato padrão responsável por armazenar e atribuir dados básicos a uma imagem, como a data e hora em que a imagem foi criada, localização, origem, nome da câmera, entre outros. "Dados EXIF" são conhecidos como metadados e são usados para diversos fins, como forense ou por programas de organização de fotos (galeria, Google Fotos) por exemplo, entre outros fins.

Com isso, é possível adicionar informações às imagens, extraí-las, substituí-las ou excluí-las, manipulando os metadados EXIF de uma imagem através de programas como ImageMagick, exiftool, binwalk, steghide, stegseek entre outros.

Vou mostrar como extrair os metadados e informações sobre a imagem com as ferramentas citadas e agilizando este processo com Python:

![](/statics/images/mindmaps/metadados-como-funcionam-exiftoll.png)

![](/statics/images/mindmaps/metadados-como-funcionam-binwalk.png)

No exemplo que dei acima, com Exiftool e binwalk em modo detalhado (-v), é possível extrair informações como: A assinatura única do arquivo chamada HASH, e MD5 Checksum é o algoritmo utilizado para gerar o Hash do arquivo. Esta informação é útil principalmente quando você precisa saber se a imagem que possui é original e não uma cópia.  
Em alguns casos o binwalk pode localizar e informar quando a imagem possui um arquivo oculto propositalmente e através do steghide ou stegseek é possível extrair este arquivo.

Com o exiftool é possível obter os metadados Exif da imagem como o nome do Autor/proprietário da imagem, latitude e longitude do local de origem da imagem e posição GPS de quando a foto foi criada.  
Mas isso não é tudo, é sempre bom analisar o conteúdo hexadecimal da imagem:

![](/statics/images/mindmaps/metadados-como-funcionam-less.png)

Através da ferramenta xxd é possível extrair o conteúdo hexadecimal e direcionar o resultado de saída para um arquivo criado no mesmo momento.

![](/statics/images/mindmaps/metadados-como-funcionam-results.png)

Pegando apenas uma parte do conteúdo hexadecimal da imagem é possível obter algumas informações como links de domínios e informações Exif, e pela forma que a informação está organizada pode-se chegar à conclusão de que ela foi adicionada propositalmente.

Com o Python é possível automatizar esse processo com esse código:

[https://github.com/gusprojects008/pentesting/blob/main/steganography/extract\_steg.py](https://github.com/gusprojects008/pentesting/blob/main/steganography/extract_steg.py)

Ele executa os comandos que mostrei e direciona todo o resultado para um único arquivo de texto.

Esse é um exemplo simples de extração de metadados de uma imagem, em alguns casos será preciso fazer uma análise mais detalhada e minuciosa através de ferramentas mais avançadas.

Assim como o EXIF existem outros formatos de metadados para diferentes tipos de arquivo, exemplo:

**ID3**: Formato de metadados padrão para arquivos de áudio

**IPTC**: Formato de metadados padrão para arquivos de mídia como imagens e vídeos

**XMP**: Formato de armazenamento de metadados usado em vários tipos de arquivos

Existem ainda vários outros formatos de metadados para vários tipos de arquivo, e muitas formas de extrair e manipular eles dependendo de cada ocasião.
