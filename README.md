# Artes Lion Manager

Sistema web responsivo para a Artes Lion Estamparia, pronto para cadastro real de clientes, pedidos, financeiro, estoque e fornecedores.

## Como executar

Na pasta deste projeto, rode:

```powershell
PowerShell -ExecutionPolicy Bypass -File .\server.ps1 -Port 4173
```

Depois acesse:

```text
http://localhost:4173/
```

## Logins

Administrador principal:

- Usuário: `arteslionadm`
- Senha: `arteslionadm147`

Usuário de teste:

- Usuário: `teste`
- Senha: `teste123`

O usuário de teste pode ser excluído pelo administrador em `Configurações > Usuários do sistema`.

## Manual do usuário

O manual completo está em:

```text
MANUAL-DO-USUARIO.md
```

## Incluído no MVP

- Dashboard gerencial com cards calculados e gráficos.
- Lembretes manuais e por voz, com abertura automática do evento no Google Agenda.
- Assistente de voz ao abrir o sistema e alerta diário às 17h enquanto o app estiver aberto.
- Clientes com WhatsApp, perfil, histórico e mensagens prontas.
- Orçamentos com duplicação, PDF e conversão em pedido.
- Pedidos com filtros, status de produção, status financeiro e histórico.
- Cupom fiscal/recibo gerencial em PDF com dados da ARTES LION ESTAMPARIA LTDA.
- Kanban de produção.
- Estoque com alertas e ajuste de entrada/saída.
- Financeiro, fluxo de caixa, relatórios e exportações Excel/PDF.
- Lixeira com resgate de clientes, orçamentos, pedidos, fornecedores e lembretes removidos.
- Botão “Pedido pronto” com confirmação, mensagem automática e abertura do WhatsApp.

## Acesso de qualquer lugar

`localhost` abre apenas no computador atual. Para acessar de qualquer lugar, publique esta pasta como site estático em Vercel, Netlify ou GitHub Pages.

Na Vercel, depois de fazer login:

```powershell
vercel --prod
```

Este MVP salva dados no navegador via `localStorage`. Para sincronizar dados entre PC, celular e outros usuários, o próximo passo é conectar banco online, autenticação e integração oficial com Google Calendar/NFC-e.

## Observação fiscal

O botão de cupom gera um PDF gerencial com os dados da empresa. Para emissão fiscal oficial no Brasil, é necessário integrar com emissor NFC-e/SAT autorizado, certificado digital e regras da SEFAZ.
