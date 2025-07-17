# Nginx é um servidor web leve e eficiente, ótimo para arquivos estáticos.
FROM nginx:alpine

# Define o diretório de trabalho dentro do container.
WORKDIR /usr/share/nginx/html

# Copia os arquivos da sua aplicação (HTML, CSS, JS) para o diretório de trabalho no container.
COPY . .

# Copia os arquivos de configuração do Nginx para o diretório de configuração do container.
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY mime.types /etc/nginx/mime.types

# Expõe a porta 80 do container.
# Esta é a porta padrão para tráfego HTTP.
# Ao rodar o container, você precisará mapear uma porta do seu host para esta porta 80.
EXPOSE 80

# Comando para iniciar o Nginx quando o container for executado.
# O Nginx é configurado para rodar em foreground, o que é ideal para containers.
CMD ["nginx", "-g", "daemon off;"]

# docker build -t nome-da-imagem .
# docker run -p 80:80 nome-da-imagem
