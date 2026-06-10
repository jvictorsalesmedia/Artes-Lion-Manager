# Publicar o Artes Lion Manager online

O endereço `http://localhost:4173/` funciona apenas no computador onde o servidor está rodando.

Para acessar de qualquer lugar, publique a pasta `artes-lion-manager` como site estático.

## Opção rápida: Vercel

1. Crie ou acesse uma conta em https://vercel.com.
2. Instale a Vercel CLI no computador:

```powershell
npm install -g vercel
```

3. Entre nesta pasta:

```powershell
cd C:\Users\CDT\Documents\Codex\2026-06-10\files-mentioned-by-the-user-texto\outputs\artes-lion-manager
```

4. Publique:

```powershell
vercel --prod
```

Depois disso a Vercel mostrará um link público, acessível por PC, celular ou tablet.

## Para dados sincronizados

Este MVP salva os dados no navegador. Para acessar os mesmos dados em vários dispositivos, o próximo passo técnico é conectar:

- banco PostgreSQL online;
- autenticação de usuários;
- backend para Google Calendar API;
- integração fiscal oficial NFC-e/SAT, se o cupom precisar ter validade fiscal.
