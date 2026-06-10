# Manual do Usuário - Artes Lion Manager

## 1. O Que É O Artes Lion Manager

O **Artes Lion Manager** é um sistema web criado para organizar a gestão da **Artes Lion Estamparia LTDA**.

Ele centraliza clientes, orçamentos, pedidos, produção, estoque, financeiro, fluxo de caixa, fornecedores, lembretes, relatórios, exportações e lixeira em um único painel.

O objetivo é ajudar o administrador a enxergar rapidamente:

- o que foi vendido;
- o que já foi recebido;
- o que falta receber;
- quais pedidos estão em produção;
- quais pedidos estão atrasados;
- quais produtos e serviços vendem mais;
- quais materiais estão com estoque baixo;
- qual é a situação real do caixa;
- quais tarefas e lembretes precisam de atenção.

## 2. Acesso Ao Sistema

Para acessar o sistema localmente, abra:

```text
http://localhost:4173/
```

O sistema possui um login administrativo principal:

- **Usuário:** `arteslionadm`
- **Senha:** `arteslionadm147`

Também existe um usuário de teste:

- **Usuário:** `teste`
- **Senha:** `teste123`

O usuário de teste pode ser apagado pelo administrador em **Configurações > Usuários do sistema**. O administrador principal é protegido e não pode ser excluído.

Ao entrar, o usuário acessa o painel principal do sistema.

## 3. Observação Sobre Dados

O sistema foi resetado e está sem dados de teste.

Isso significa que clientes, pedidos, orçamentos, estoque, financeiro, fornecedores, lembretes e lixeira começam vazios para uso real.

No MVP local, os dados ficam salvos no navegador do computador. Quando o sistema for conectado ao Supabase e hospedado online, os dados poderão ser sincronizados entre dispositivos.

## 4. Estrutura Do Menu

O sistema possui menu lateral com as seguintes abas:

1. Dashboard
2. Lembretes
3. Clientes
4. Orçamentos
5. Pedidos
6. Produção
7. Estoque
8. Financeiro
9. Fluxo de Caixa
10. Produtos e Serviços
11. Fornecedores
12. Relatórios
13. Exportações
14. Lixeira
15. Configurações

No computador, o menu fica na lateral. Em telas menores, ele se adapta para navegação mobile.

## 5. Dashboard

O **Dashboard** é a central de comando do sistema.

Ele mostra indicadores automáticos com base nos dados cadastrados.

Principais cards:

- Faturamento do mês;
- Valor recebido no mês;
- Valor a receber;
- Pedidos em andamento;
- Pedidos atrasados;
- Pedidos para hoje;
- Orçamentos pendentes;
- Artes aguardando aprovação;
- Estoque crítico;
- Lucro estimado;
- Ticket médio;
- Clientes cadastrados;
- Novos clientes do mês;
- Contas vencidas;
- Próximas entregas;
- Caixa projetado.

Principais gráficos:

- Faturamento mensal;
- Recebido x pendente;
- Pedidos por status;
- Produtos mais vendidos;
- Serviços mais lucrativos;
- Clientes que mais compraram;
- Despesas por categoria.

O Dashboard também mostra alertas importantes, como pedidos atrasados, contas vencidas, estoque abaixo do mínimo e entregas próximas.

## 6. Lembretes

A aba **Lembretes** serve para organizar tarefas e compromissos.

O usuário pode criar lembretes informando:

- o que deve ser lembrado;
- data;
- horário;
- observações.

Também é possível criar lembrete por voz usando o botão **Falar lembrete**.

Exemplo de fala:

```text
lembrar de cobrar o saldo do pedido amanhã às 15 horas
```

O sistema tenta transformar a fala em lembrete com data, horário e descrição.

Ao criar um lembrete, o sistema abre o Google Agenda com o evento já preenchido. O usuário só precisa confirmar no Google Agenda.

Ao abrir o sistema, o assistente de voz informa os lembretes do dia. Às 17h, enquanto o sistema estiver aberto, ele lembra o usuário de conferir se as tarefas foram executadas.

## 7. Clientes

A aba **Clientes** permite cadastrar e consultar clientes.

Campos do cliente:

- nome completo ou razão social;
- CPF ou CNPJ;
- telefone/WhatsApp;
- e-mail;
- endereço;
- tipo de cliente;
- observações internas.

O telefone/WhatsApp é obrigatório.

Na listagem, o sistema mostra:

- nome;
- telefone;
- tipo;
- total comprado;
- quantidade de pedidos;
- última compra;
- status;
- ação para enviar para lixeira.

Ao selecionar um cliente, o painel lateral mostra:

- dados completos;
- pedidos vinculados;
- orçamentos vinculados;
- arquivos relacionados;
- valores pendentes;
- observações internas.

Também existem botões de mensagens prontas para WhatsApp:

- Envio de orçamento;
- Pedido criado;
- Solicitação de aprovação de arte;
- Pedido pronto;
- Lembrete de pagamento;
- Pós-venda.

Para remover um cliente, use **Enviar cliente para lixeira**. O cliente não é apagado definitivamente; ele fica disponível para resgate na aba Lixeira.

## 8. Orçamentos

A aba **Orçamentos** serve para criar e acompanhar propostas comerciais.

Cada orçamento pode conter:

- número automático;
- cliente;
- produto ou serviço;
- quantidade;
- serviço;
- prazo solicitado;
- valor unitário;
- desconto;
- valor total;
- forma de pagamento;
- validade;
- observações.

Status possíveis:

- Em criação;
- Enviado ao cliente;
- Aguardando resposta;
- Aprovado;
- Recusado;
- Expirado.

Funcionalidades:

- criar orçamento;
- duplicar orçamento;
- alterar status;
- exportar PDF;
- converter orçamento em pedido;
- enviar orçamento para lixeira.

Quando o orçamento é aprovado, o sistema pergunta se o usuário deseja gerar um pedido a partir dele.

## 9. Pedidos

A aba **Pedidos** é uma das áreas principais do sistema.

Cada pedido possui:

- número automático;
- cliente;
- orçamento vinculado, se houver;
- data de entrada;
- data prevista de entrega;
- prioridade;
- produto principal;
- tipo de serviço;
- quantidade;
- tamanhos;
- cores;
- descrição;
- valor total;
- entrada recebida;
- valor restante;
- custo estimado;
- lucro estimado;
- margem;
- status de produção;
- status financeiro;
- responsável;
- anexos;
- histórico.

Produtos possíveis:

- Camisa personalizada;
- Uniforme empresarial;
- Camisa promocional;
- Camisa de evento;
- Caneca personalizada;
- Boné personalizado;
- Sacola personalizada;
- Squeeze personalizado;
- Brinde corporativo;
- Kit personalizado;
- Outro.

Serviços possíveis:

- DTF;
- Sublimação;
- Silk screen;
- Bordado;
- Transfer;
- Criação de arte;
- Mockup;
- Acabamento;
- Embalagem;
- Outro.

Status de produção:

- Pedido criado;
- Aguardando pagamento;
- Pagamento parcial recebido;
- Arte em criação;
- Arte enviada para aprovação;
- Arte aprovada;
- Separando material;
- Em produção;
- Acabamento;
- Pronto para retirada/entrega;
- Entregue;
- Finalizado;
- Cancelado.

Status financeiro:

- Não pago;
- Entrada recebida;
- Parcialmente pago;
- Pago integralmente;
- Em atraso;
- Cancelado.

Ações disponíveis:

- Pedido pronto;
- Registrar pagamento;
- Gerar PDF do pedido;
- Emitir cupom fiscal/recibo gerencial;
- Marcar arte aprovada;
- Enviar para produção;
- Marcar entregue;
- Enviar pedido para lixeira.

### Botão Pedido Pronto

O botão **Pedido pronto** abre uma confirmação com mensagem pronta para WhatsApp.

Se o pedido tiver saldo pendente, a mensagem informa o valor restante. Ao confirmar, o sistema abre o WhatsApp do cliente e registra a ação no histórico do pedido.

### Registrar Pagamento

Ao registrar pagamento, o sistema atualiza:

- valor recebido;
- saldo restante;
- status financeiro;
- dashboard;
- fluxo de caixa;
- relatórios;
- histórico do pedido.

### Cupom Fiscal / Recibo Gerencial

O sistema gera um PDF em formato de cupom/recibo com os dados da empresa:

```text
ARTES LION ESTAMPARIA LTDA
Travessa Carneiro, 4 - Parque Jardim Carioca
28083-650 - Campos dos Goytacazes - RJ
Fone: (22) 8175-2570
CNPJ: 27.835.400/0001-73
```

O documento mostra pedido, cliente, item, quantidade, total, valor recebido e saldo.

Importante: para ter validade fiscal oficial, será necessário integrar futuramente com emissor NFC-e/SAT autorizado, certificado digital e regras da SEFAZ.

## 10. Produção

A aba **Produção** mostra os pedidos em formato Kanban.

As colunas são:

- Novos pedidos;
- Arte pendente;
- Aguardando aprovação;
- Material separado;
- Em produção;
- Acabamento;
- Pronto;
- Entregue.

Cada cartão mostra informações do pedido, cliente, produto, quantidade, prioridade e data de entrega.

O usuário pode alterar o status de produção diretamente no Kanban.

## 11. Estoque

A aba **Estoque** controla materiais, insumos e produtos disponíveis.

Cada item possui:

- material;
- categoria;
- unidade;
- quantidade atual;
- quantidade mínima;
- custo médio;
- fornecedor;
- status.

O sistema indica quando o item está abaixo do mínimo, mostrando estoque crítico.

Também é possível registrar:

- entrada de estoque;
- saída de estoque.

Itens com estoque baixo aparecem nos alertas do Dashboard.

## 12. Financeiro

A aba **Financeiro** mostra a situação financeira da empresa.

Indicadores:

- receitas recebidas;
- despesas;
- saldo operacional;
- valores a receber.

Também mostra pedidos com saldo pendente e permite registrar pagamentos.

Quando um pagamento é registrado, o sistema atualiza automaticamente os indicadores e o histórico do pedido.

## 13. Fluxo De Caixa

A aba **Fluxo de Caixa** mostra entradas, saídas e saldo projetado.

Ela ajuda a entender:

- o que entrou;
- o que saiu;
- o que está previsto;
- o saldo acumulado.

Cada linha mostra:

- data;
- descrição;
- tipo;
- valor;
- status;
- saldo.

## 14. Produtos E Serviços

A aba **Produtos e Serviços** mostra análise de desempenho.

Produtos:

- unidades vendidas;
- faturamento;
- lucro.

Serviços:

- quantidade de pedidos;
- faturamento;
- lucro.

Essa aba ajuda a identificar quais produtos e serviços são mais rentáveis.

## 15. Fornecedores

A aba **Fornecedores** permite cadastrar e gerenciar fornecedores.

Campos:

- fornecedor;
- contato;
- WhatsApp;
- categoria;
- saldo em aberto.

Funcionalidades:

- cadastrar fornecedor;
- abrir WhatsApp do fornecedor;
- registrar compra;
- enviar fornecedor para lixeira.

Ao registrar uma compra, o sistema pode atualizar estoque, financeiro e fluxo de caixa.

## 16. Relatórios

A aba **Relatórios** mostra resumos gerenciais.

Relatórios disponíveis:

- vendas por produto;
- financeiro mensal;
- clientes por faturamento;
- estoque crítico;
- status dos pedidos.

Os relatórios podem ser exportados em PDF.

## 17. Exportações

A aba **Exportações** permite exportar dados do sistema.

Exportações disponíveis:

- Clientes;
- Orçamentos;
- Pedidos;
- Lembretes;
- Estoque;
- Financeiro.

Os dados podem ser exportados em:

- Excel;
- PDF.

Itens enviados para a Lixeira não entram nas exportações principais.

## 18. Lixeira

A aba **Lixeira** guarda itens removidos sem apagar definitivamente.

Podem ir para a Lixeira:

- clientes;
- orçamentos;
- pedidos;
- fornecedores;
- lembretes.

Itens na Lixeira não interferem em:

- caixa;
- relatórios;
- gráficos;
- exportações;
- planilhas;
- indicadores financeiros.

Se um pedido for enviado para a Lixeira, as movimentações financeiras vinculadas a ele também saem dos cálculos.

Se um cliente for enviado para a Lixeira, seus pedidos, orçamentos, artes e movimentações vinculadas também saem dos cálculos.

Para trazer um item de volta, clique em **Resgatar**.

## 19. Configurações

A aba **Configurações** mostra informações gerais do sistema e da empresa.

Ela apresenta:

- razão social;
- nome fantasia;
- CNPJ;
- endereço;
- cidade;
- CEP;
- telefone;
- área de atuação;
- identidade visual;
- moeda;
- usuários e permissões;
- regras de negócio;
- estrutura sugerida de banco de dados;
- orientação sobre acesso online.

## 20. Primeiros Passos Recomendados

Depois do reset, siga esta ordem:

1. Cadastre os fornecedores principais.
2. Cadastre os itens de estoque.
3. Cadastre os clientes.
4. Crie orçamentos quando houver solicitação.
5. Converta orçamento aprovado em pedido.
6. Registre pagamentos.
7. Acompanhe produção pelo Kanban.
8. Use o Dashboard para acompanhar caixa, atrasos e estoque crítico.
9. Use Lembretes para tarefas e cobranças.
10. Exporte relatórios quando precisar analisar ou enviar dados.

## 21. Acesso Online Futuro

Atualmente o sistema roda localmente.

Para acessar de qualquer lugar, o sistema deve ser publicado em uma hospedagem como Vercel.

Para sincronizar dados entre dispositivos, o sistema deve ser conectado a um banco online como Supabase.

Com Vercel + Supabase:

- o site fica acessível online;
- os dados ficam salvos no banco;
- alterações feitas em um dispositivo aparecem em outros dispositivos;
- usuários autorizados conseguem acessar os mesmos dados;
- relatórios e gráficos passam a refletir a base online.

## 22. Cuidados Importantes

- O login atual é administrativo único.
- Não compartilhe a senha com pessoas não autorizadas.
- O cupom gerado atualmente é gerencial, não fiscal oficial.
- Itens na Lixeira não contam nos cálculos.
- Para apagar algo definitivamente, use a opção dentro da Lixeira.
- Para uso multi-dispositivo real, será necessário conectar Supabase.
