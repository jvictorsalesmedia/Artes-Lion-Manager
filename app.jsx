const { useEffect, useMemo, useRef, useState } = React;

const TODAY = new Date();
const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const MENU = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "lembretes", label: "Lembretes", icon: "bell-ring" },
  { id: "clientes", label: "Clientes", icon: "users" },
  { id: "orcamentos", label: "Orçamentos", icon: "file-pen-line" },
  { id: "pedidos", label: "Pedidos", icon: "clipboard-list" },
  { id: "producao", label: "Produção", icon: "columns-3" },
  { id: "estoque", label: "Estoque", icon: "boxes" },
  { id: "financeiro", label: "Financeiro", icon: "wallet-cards" },
  { id: "fluxo", label: "Fluxo de Caixa", icon: "chart-no-axes-combined" },
  { id: "produtos", label: "Produtos e Serviços", icon: "shirt" },
  { id: "fornecedores", label: "Fornecedores", icon: "truck" },
  { id: "funcionarios", label: "Funcionários", icon: "id-card" },
  { id: "relatorios", label: "Relatórios", icon: "bar-chart-3" },
  { id: "exportacoes", label: "Exportações", icon: "download" },
  { id: "lixeira", label: "Lixeira", icon: "trash-2" },
  { id: "configuracoes", label: "Configurações", icon: "settings" },
];

const COMPANY_INFO = {
  legalName: "ARTES LION ESTAMPARIA LTDA",
  tradeName: "Artes Lion Estamparia",
  cnpj: "27.835.400/0001-73",
  address: "Travessa Carneiro, 4 - Parque Jardim Carioca",
  city: "Campos dos Goytacazes - RJ",
  zip: "28083-650",
  phone: "(22) 8175-2570",
};

const PRODUCTION_STATUSES = [
  "Pedido criado",
  "Aguardando pagamento",
  "Pagamento parcial recebido",
  "Arte em criação",
  "Arte enviada para aprovação",
  "Arte aprovada",
  "Separando material",
  "Em produção",
  "Acabamento",
  "Pronto para retirada/entrega",
  "Entregue",
  "Finalizado",
  "Cancelado",
];

const FINANCIAL_STATUSES = [
  "Não pago",
  "Entrada recebida",
  "Parcialmente pago",
  "Pago integralmente",
  "Em atraso",
  "Cancelado",
];

const PRODUCTS = [
  "Camisa personalizada",
  "Uniforme empresarial",
  "Camisa promocional",
  "Camisa de evento",
  "Caneca personalizada",
  "Boné personalizado",
  "Sacola personalizada",
  "Squeeze personalizado",
  "Brinde corporativo",
  "Kit personalizado",
  "Outro",
];

const SERVICES = [
  "DTF",
  "Sublimação",
  "Silk screen",
  "Bordado",
  "Transfer",
  "Criação de arte",
  "Mockup",
  "Acabamento",
  "Embalagem",
  "Outro",
];

const initialClients = [
  {
    id: 1,
    name: "Escola Horizonte",
    document: "12.345.678/0001-20",
    phone: "5522999987654",
    email: "compras@escolahorizonte.com.br",
    address: "Rua das Palmeiras, 120 - Campos dos Goytacazes/RJ",
    type: "escola",
    notes: "Cliente recorrente de uniformes e eventos internos.",
    createdAt: "2026-01-14",
    totalPurchased: 32800,
    orderCount: 12,
    lastPurchase: "2026-06-04",
    status: "recorrente",
  },
  {
    id: 2,
    name: "Mercado São Bento",
    document: "22.118.990/0001-08",
    phone: "5522998877665",
    email: "adm@mercadosaobento.com.br",
    address: "Av. Pelinca, 910 - Campos dos Goytacazes/RJ",
    type: "empresa",
    notes: "Solicita uniformes e brindes promocionais por campanha.",
    createdAt: "2026-02-03",
    totalPurchased: 18450,
    orderCount: 7,
    lastPurchase: "2026-06-01",
    status: "ativo",
  },
  {
    id: 3,
    name: "Igreja Nova Aliança",
    document: "31.762.445/0001-77",
    phone: "5522997766554",
    email: "eventos@novaalianca.org",
    address: "Rua Barão da Lagoa Dourada, 44 - Campos/RJ",
    type: "igreja",
    notes: "Pedidos sazonais para congressos e encontros.",
    createdAt: "2026-03-22",
    totalPurchased: 9210,
    orderCount: 4,
    lastPurchase: "2026-05-18",
    status: "ativo",
  },
  {
    id: 4,
    name: "Mariana Costa",
    document: "123.456.777-10",
    phone: "5522996677889",
    email: "mariana.costa@email.com",
    address: "Parque Leopoldina - Campos/RJ",
    type: "pessoa física",
    notes: "Compra camisas para aniversários e eventos familiares.",
    createdAt: "2026-04-09",
    totalPurchased: 2420,
    orderCount: 3,
    lastPurchase: "2026-05-29",
    status: "ativo",
  },
  {
    id: 5,
    name: "Fitness Pro Academia",
    document: "18.550.400/0001-60",
    phone: "5522998877001",
    email: "marketing@fitnesspro.com.br",
    address: "Centro - São João da Barra/RJ",
    type: "empresa",
    notes: "Prioriza prazo curto e embalagens individuais.",
    createdAt: "2026-05-07",
    totalPurchased: 12670,
    orderCount: 5,
    lastPurchase: "2026-06-07",
    status: "recorrente",
  },
  {
    id: 6,
    name: "Rafa Brindes Revenda",
    document: "099.771.333-91",
    phone: "5522999871234",
    email: "rafa.revenda@email.com",
    address: "Goitacazes - Campos/RJ",
    type: "revendedor",
    notes: "Negociar valores por volume e sinal de 50%.",
    createdAt: "2026-06-02",
    totalPurchased: 3780,
    orderCount: 2,
    lastPurchase: "2026-06-08",
    status: "ativo",
  },
];

const initialOrders = [
  {
    id: 101,
    number: "AL-1048",
    clientId: 1,
    quoteNumber: "ORC-2026-018",
    createdAt: "2026-06-02",
    dueDate: "2026-06-10",
    priority: "urgente",
    product: "Uniforme empresarial",
    service: "DTF",
    quantity: 120,
    sizes: "P: 20, M: 45, G: 35, GG: 20",
    colors: "Preto e amarelo",
    description: "Uniformes para equipe pedagógica com logo frente e costas.",
    total: 8400,
    deposit: 5000,
    cost: 4720,
    productionStatus: "Acabamento",
    financialStatus: "Parcialmente pago",
    responsible: "Carol",
    attachments: ["logo-horizonte.svg", "grade-tamanhos.xlsx"],
    history: [
      { at: "2026-06-02 09:11", text: "Pedido criado a partir do orçamento ORC-2026-018." },
      { at: "2026-06-06 16:42", text: "Arte aprovada pelo cliente." },
      { at: "2026-06-09 11:20", text: "Pedido enviado para acabamento." },
    ],
  },
  {
    id: 102,
    number: "AL-1049",
    clientId: 2,
    quoteNumber: "",
    createdAt: "2026-06-03",
    dueDate: "2026-06-08",
    priority: "alta",
    product: "Camisa promocional",
    service: "Silk screen",
    quantity: 80,
    sizes: "M: 35, G: 30, GG: 15",
    colors: "Branca",
    description: "Camisas para ação de aniversário do mercado.",
    total: 2890,
    deposit: 0,
    cost: 1510,
    productionStatus: "Em produção",
    financialStatus: "Em atraso",
    responsible: "Diego",
    attachments: ["referencia-campanha.jpg"],
    history: [
      { at: "2026-06-03 13:20", text: "Pedido criado manualmente." },
      { at: "2026-06-07 10:02", text: "Alerta de pagamento pendente." },
    ],
  },
  {
    id: 103,
    number: "AL-1050",
    clientId: 5,
    quoteNumber: "ORC-2026-020",
    createdAt: "2026-06-05",
    dueDate: "2026-06-13",
    priority: "normal",
    product: "Squeeze personalizado",
    service: "Sublimação",
    quantity: 140,
    sizes: "Único",
    colors: "Prata fosco",
    description: "Squeezes para campanha de matrícula da academia.",
    total: 5600,
    deposit: 5600,
    cost: 3380,
    productionStatus: "Separando material",
    financialStatus: "Pago integralmente",
    responsible: "Ana",
    attachments: ["mockup-squeeze.png"],
    history: [
      { at: "2026-06-05 14:00", text: "Pedido criado e pagamento integral confirmado." },
      { at: "2026-06-09 15:30", text: "Material conferido no estoque." },
    ],
  },
  {
    id: 104,
    number: "AL-1051",
    clientId: 3,
    quoteNumber: "ORC-2026-021",
    createdAt: "2026-06-06",
    dueDate: "2026-06-17",
    priority: "normal",
    product: "Camisa de evento",
    service: "DTF",
    quantity: 65,
    sizes: "P: 10, M: 25, G: 20, GG: 10",
    colors: "Azul-marinho",
    description: "Camisas para congresso jovem com arte em policromia.",
    total: 4225,
    deposit: 2100,
    cost: 2360,
    productionStatus: "Arte enviada para aprovação",
    financialStatus: "Entrada recebida",
    responsible: "Carol",
    attachments: ["arte-congresso-v2.png"],
    history: [
      { at: "2026-06-06 17:50", text: "Pedido criado." },
      { at: "2026-06-08 08:45", text: "Arte enviada para aprovação no WhatsApp." },
    ],
  },
  {
    id: 105,
    number: "AL-1052",
    clientId: 6,
    quoteNumber: "",
    createdAt: "2026-06-08",
    dueDate: "2026-06-12",
    priority: "alta",
    product: "Caneca personalizada",
    service: "Sublimação",
    quantity: 90,
    sizes: "325 ml",
    colors: "Branca",
    description: "Canecas para revenda com artes variadas.",
    total: 3510,
    deposit: 1755,
    cost: 2070,
    productionStatus: "Arte aprovada",
    financialStatus: "Parcialmente pago",
    responsible: "Diego",
    attachments: ["pack-artes-canecas.zip"],
    history: [
      { at: "2026-06-08 10:15", text: "Pedido criado com entrada de 50%." },
      { at: "2026-06-09 18:40", text: "Arte aprovada pelo revendedor." },
    ],
  },
  {
    id: 106,
    number: "AL-1053",
    clientId: 4,
    quoteNumber: "ORC-2026-022",
    createdAt: "2026-06-09",
    dueDate: "2026-06-10",
    priority: "urgente",
    product: "Kit personalizado",
    service: "Transfer",
    quantity: 24,
    sizes: "Infantil e adulto",
    colors: "Várias",
    description: "Kit aniversário com camisa, sacola e caneca.",
    total: 1960,
    deposit: 1960,
    cost: 1165,
    productionStatus: "Pronto para retirada/entrega",
    financialStatus: "Pago integralmente",
    responsible: "Ana",
    attachments: ["kit-aniversario-final.pdf"],
    history: [
      { at: "2026-06-09 09:30", text: "Pedido criado com prazo urgente." },
      { at: "2026-06-10 11:00", text: "Pedido finalizado para retirada." },
    ],
  },
  {
    id: 107,
    number: "AL-1054",
    clientId: 2,
    quoteNumber: "ORC-2026-023",
    createdAt: "2026-06-10",
    dueDate: "2026-06-20",
    priority: "baixa",
    product: "Boné personalizado",
    service: "Bordado",
    quantity: 50,
    sizes: "Único",
    colors: "Preto",
    description: "Bonés para equipe de açougue e padaria.",
    total: 3750,
    deposit: 1000,
    cost: 2250,
    productionStatus: "Arte em criação",
    financialStatus: "Entrada recebida",
    responsible: "Carol",
    attachments: ["logo-mercado-ai.pdf"],
    history: [{ at: "2026-06-10 08:50", text: "Pedido criado e arte iniciada." }],
  },
  {
    id: 108,
    number: "AL-1055",
    clientId: 5,
    quoteNumber: "",
    createdAt: "2026-05-29",
    dueDate: "2026-06-03",
    priority: "normal",
    product: "Sacola personalizada",
    service: "Silk screen",
    quantity: 250,
    sizes: "30 x 40 cm",
    colors: "Crua",
    description: "Sacolas para kits promocionais da academia.",
    total: 4250,
    deposit: 4250,
    cost: 2720,
    productionStatus: "Entregue",
    financialStatus: "Pago integralmente",
    responsible: "Diego",
    attachments: ["foto-entrega.jpg"],
    history: [
      { at: "2026-05-29 15:00", text: "Pedido criado." },
      { at: "2026-06-03 16:15", text: "Pedido entregue ao cliente." },
    ],
  },
];

const initialQuotes = [
  {
    id: 201,
    number: "ORC-2026-018",
    clientId: 1,
    product: "Uniforme empresarial",
    service: "DTF",
    quantity: 120,
    requestedDueDate: "2026-06-10",
    unitValue: 70,
    discount: 0,
    total: 8400,
    payment: "50% de entrada e saldo na entrega",
    validUntil: "2026-06-12",
    status: "Aprovado",
    notes: "Inclui criação de mockup e ajuste de grade.",
    attachments: ["referencia-uniforme.png"],
  },
  {
    id: 202,
    number: "ORC-2026-021",
    clientId: 3,
    product: "Camisa de evento",
    service: "DTF",
    quantity: 65,
    requestedDueDate: "2026-06-17",
    unitValue: 65,
    discount: 0,
    total: 4225,
    payment: "Entrada de 50%",
    validUntil: "2026-06-11",
    status: "Enviado ao cliente",
    notes: "Cliente solicitou duas opções de cor.",
    attachments: ["briefing-congresso.pdf"],
  },
  {
    id: 203,
    number: "ORC-2026-024",
    clientId: 6,
    product: "Brinde corporativo",
    service: "Sublimação",
    quantity: 180,
    requestedDueDate: "2026-06-24",
    unitValue: 28,
    discount: 300,
    total: 4740,
    payment: "Pix ou cartão em até 3x",
    validUntil: "2026-06-14",
    status: "Aguardando resposta",
    notes: "Kit com caneca e chaveiro para revenda.",
    attachments: ["referencias-brindes.zip"],
  },
  {
    id: 204,
    number: "ORC-2026-025",
    clientId: 2,
    product: "Sacola personalizada",
    service: "Silk screen",
    quantity: 500,
    requestedDueDate: "2026-06-28",
    unitValue: 14,
    discount: 450,
    total: 6550,
    payment: "Boleto 7 dias após aprovação",
    validUntil: "2026-06-17",
    status: "Em criação",
    notes: "Confirmar gramatura e cor do tecido.",
    attachments: [],
  },
];

const initialArtworks = [
  {
    id: 301,
    orderNumber: "AL-1051",
    clientId: 3,
    title: "Congresso Jovem 2026",
    version: "v2",
    status: "Aguardando aprovação",
    sentAt: "2026-06-08 08:45",
    approvedAt: "",
    approver: "",
    file: "arte-congresso-v2.png",
    note: "Aguardando confirmação da cor final.",
  },
  {
    id: 302,
    orderNumber: "AL-1052",
    clientId: 6,
    title: "Pack canecas revenda",
    version: "final",
    status: "Aprovada",
    sentAt: "2026-06-09 14:10",
    approvedAt: "2026-06-09 18:40",
    approver: "Rafa Brindes",
    file: "pack-artes-canecas.zip",
    note: "Versão final bloqueada para produção.",
  },
  {
    id: 303,
    orderNumber: "AL-1054",
    clientId: 2,
    title: "Boné equipe Mercado São Bento",
    version: "rascunho",
    status: "Em criação",
    sentAt: "",
    approvedAt: "",
    approver: "",
    file: "logo-mercado-ai.pdf",
    note: "Ajustar bordado para área máxima de 10 cm.",
  },
];

const initialStock = [
  { id: 401, item: "Camisa dry fit branca", category: "Camisas", unit: "un", qty: 42, min: 60, avgCost: 18.5, supplier: "Malhas Norte" },
  { id: 402, item: "Camisa algodão preta", category: "Camisas", unit: "un", qty: 130, min: 80, avgCost: 16.9, supplier: "Malhas Norte" },
  { id: 403, item: "Filme DTF", category: "Insumos DTF", unit: "m", qty: 18, min: 25, avgCost: 7.8, supplier: "DTF Supply" },
  { id: 404, item: "Tinta sublimação amarela", category: "Sublimação", unit: "ml", qty: 240, min: 200, avgCost: 0.18, supplier: "Sublima Mix" },
  { id: 405, item: "Caneca branca 325 ml", category: "Brindes", unit: "un", qty: 55, min: 90, avgCost: 9.4, supplier: "Promo Brindes" },
  { id: 406, item: "Squeeze alumínio prata", category: "Brindes", unit: "un", qty: 180, min: 120, avgCost: 14.2, supplier: "Promo Brindes" },
  { id: 407, item: "Sacola algodão cru", category: "Brindes", unit: "un", qty: 310, min: 150, avgCost: 5.6, supplier: "Eco Bags RJ" },
];

const initialTransactions = [
  { id: 501, date: "2026-01-18", description: "Recebimento pedidos janeiro", category: "Vendas", type: "receita", amount: 18800, status: "recebido", orderNumber: "" },
  { id: 502, date: "2026-02-20", description: "Recebimento pedidos fevereiro", category: "Vendas", type: "receita", amount: 21400, status: "recebido", orderNumber: "" },
  { id: 503, date: "2026-03-22", description: "Recebimento pedidos março", category: "Vendas", type: "receita", amount: 24650, status: "recebido", orderNumber: "" },
  { id: 504, date: "2026-04-24", description: "Recebimento pedidos abril", category: "Vendas", type: "receita", amount: 23120, status: "recebido", orderNumber: "" },
  { id: 505, date: "2026-05-30", description: "Recebimento pedidos maio", category: "Vendas", type: "receita", amount: 29150, status: "recebido", orderNumber: "" },
  { id: 506, date: "2026-06-02", description: "Entrada AL-1048", category: "Pedidos", type: "receita", amount: 5000, status: "recebido", orderNumber: "AL-1048" },
  { id: 507, date: "2026-06-05", description: "Pagamento integral AL-1050", category: "Pedidos", type: "receita", amount: 5600, status: "recebido", orderNumber: "AL-1050" },
  { id: 508, date: "2026-06-06", description: "Entrada AL-1051", category: "Pedidos", type: "receita", amount: 2100, status: "recebido", orderNumber: "AL-1051" },
  { id: 509, date: "2026-06-08", description: "Entrada AL-1052", category: "Pedidos", type: "receita", amount: 1755, status: "recebido", orderNumber: "AL-1052" },
  { id: 510, date: "2026-06-09", description: "Pagamento integral AL-1053", category: "Pedidos", type: "receita", amount: 1960, status: "recebido", orderNumber: "AL-1053" },
  { id: 511, date: "2026-06-10", description: "Entrada AL-1054", category: "Pedidos", type: "receita", amount: 1000, status: "recebido", orderNumber: "AL-1054" },
  { id: 512, date: "2026-06-06", description: "Compra de camisas", category: "Material", type: "despesa", amount: 4200, status: "pago", orderNumber: "" },
  { id: 513, date: "2026-06-07", description: "Energia elétrica", category: "Energia", type: "despesa", amount: 1180, status: "pago", orderNumber: "" },
  { id: 514, date: "2026-06-08", description: "Aluguel oficina", category: "Aluguel", type: "despesa", amount: 3200, status: "pago", orderNumber: "" },
  { id: 515, date: "2026-06-11", description: "Fornecedor DTF Supply", category: "Fornecedor", type: "despesa", amount: 2600, status: "pendente", orderNumber: "" },
  { id: 516, date: "2026-06-07", description: "Internet e telefone", category: "Internet", type: "despesa", amount: 260, status: "vencido", orderNumber: "" },
  { id: 517, date: "2026-06-13", description: "Saldo AL-1048", category: "Pedidos", type: "receita", amount: 3400, status: "previsto", orderNumber: "AL-1048" },
  { id: 518, date: "2026-06-15", description: "Saldo AL-1052", category: "Pedidos", type: "receita", amount: 1755, status: "previsto", orderNumber: "AL-1052" },
];

const initialSuppliers = [
  { id: 601, name: "Malhas Norte", contact: "Juliana", phone: "5522992221100", category: "Camisas e uniformes", balance: 4200, lastPurchase: "2026-06-06" },
  { id: 602, name: "DTF Supply", contact: "Renato", phone: "5521993332200", category: "Filme, pó e tinta DTF", balance: 2600, lastPurchase: "2026-06-11" },
  { id: 603, name: "Promo Brindes", contact: "Lara", phone: "5521988877700", category: "Canecas, squeezes e brindes", balance: 0, lastPurchase: "2026-05-28" },
  { id: 604, name: "Eco Bags RJ", contact: "Marcos", phone: "5521977711100", category: "Sacolas e embalagens", balance: 0, lastPurchase: "2026-05-30" },
];

const initialReminders = [
  {
    id: 701,
    title: "Conferir entrega AL-1048",
    date: new Date().toISOString().slice(0, 10),
    time: "10:00",
    notes: "Confirmar acabamento e avisar Escola Horizonte.",
    status: "pendente",
    source: "manual",
  },
  {
    id: 702,
    title: "Cobrar saldo AL-1052",
    date: new Date().toISOString().slice(0, 10),
    time: "15:30",
    notes: "Enviar lembrete de pagamento para Rafa Brindes.",
    status: "pendente",
    source: "financeiro",
  },
];

const permissions = [
  { role: "Administrador", access: "Acesso total, usuários, financeiro, relatórios e configurações" },
  { role: "Produção", access: "Pedidos, produção, estoque operacional e histórico" },
  { role: "Financeiro", access: "Financeiro, fluxo de caixa, relatórios e exportações" },
  { role: "Atendimento", access: "Clientes, orçamentos, pedidos e mensagens WhatsApp" },
];

const initialUsers = [
  {
    id: "admin",
    username: "arteslionadm",
    password: "arteslionadm147",
    role: "Administrador",
    protected: true,
    createdAt: "sistema",
  },
  {
    id: "teste",
    username: "teste",
    password: "teste123",
    role: "Teste",
    protected: false,
    createdAt: "usuário de teste",
  },
];

const initialEmployees = [];
const initialEmployeeAbsences = [];
const initialEmployeeAdvances = [];

function asDate(value) {
  return new Date(`${value}T12:00:00`);
}

function dateLabel(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("pt-BR").format(asDate(value));
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

function startOfMonth(date) {
  return startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
}

function startOfYear(date) {
  return startOfDay(new Date(date.getFullYear(), 0, 1));
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getPeriodRange(mode, customStart, customEnd) {
  const now = new Date();
  const end = endOfDay(now);
  if (mode === "semana") return { start: startOfDay(addDays(now, -6)), end, label: "Semana" };
  if (mode === "quinzena") return { start: startOfDay(addDays(now, -14)), end, label: "Quinzena" };
  if (mode === "mes") return { start: startOfMonth(now), end, label: "Mês" };
  if (mode === "trimestre") return { start: startOfDay(new Date(now.getFullYear(), now.getMonth() - 2, 1)), end, label: "Trimestre" };
  if (mode === "semestre") return { start: startOfDay(new Date(now.getFullYear(), now.getMonth() - 5, 1)), end, label: "Semestre" };
  if (mode === "anual") return { start: startOfYear(now), end, label: "Ano" };
  if (mode === "personalizado") {
    return {
      start: startOfDay(asDate(customStart || isoDate(now))),
      end: endOfDay(asDate(customEnd || isoDate(now))),
      label: "Personalizado",
    };
  }
  return { start: new Date("2000-01-01T00:00:00"), end, label: "Geral" };
}

function isWithinPeriod(value, range) {
  if (!value) return true;
  const date = asDate(value);
  return date >= range.start && date <= range.end;
}

function timeLabel(value) {
  return value || "09:00";
}

function dateTimeNowLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
}

function monthKey(value) {
  return value.slice(0, 7);
}

function currentMonthKey() {
  return TODAY.toISOString().slice(0, 7);
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}

const STORAGE_VERSION_KEY = "alm_storage_version";
const STORAGE_VERSION = "prod-reset-2026-06-10-001";

function ensureStorageVersion() {
  try {
    if (!window.localStorage) return;
    if (window.localStorage.getItem(STORAGE_VERSION_KEY) === STORAGE_VERSION) return;
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith("alm_") && key !== STORAGE_VERSION_KEY) {
        window.localStorage.removeItem(key);
      }
    }
    window.localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
  } catch (error) {
    // Local storage may be blocked by browser settings.
  }
}

function loadStored(key, fallback) {
  try {
    ensureStorageVersion();
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => loadStored(key, fallback));
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Local storage may be disabled in some browsers.
    }
  }, [key, value]);
  return [value, setValue];
}

function combineDateTime(date, time) {
  return new Date(`${date}T${time || "09:00"}:00`);
}

function googleCalendarUrl(reminder) {
  const start = combineDateTime(reminder.date, reminder.time);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const format = (date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: reminder.title,
    dates: `${format(start)}/${format(end)}`,
    details: `${reminder.notes || ""}\n\nCriado pelo Artes Lion Manager.`,
    location: COMPANY_INFO.tradeName,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function speak(text) {
  if (!("speechSynthesis" in window) || !text) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.96;
  window.speechSynthesis.speak(utterance);
  return true;
}

function parseVoiceReminder(transcript) {
  const text = String(transcript || "").trim();
  const now = new Date();
  let date = now.toISOString().slice(0, 10);
  let time = "09:00";
  const lower = text.toLowerCase();

  if (lower.includes("amanhã") || lower.includes("amanha")) {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    date = tomorrow.toISOString().slice(0, 10);
  }

  const dayMatch = lower.match(/\bdia\s+(\d{1,2})\b/);
  if (dayMatch) {
    const chosen = new Date(now);
    chosen.setDate(Number(dayMatch[1]));
    if (chosen < now && !lower.includes("hoje")) chosen.setMonth(chosen.getMonth() + 1);
    date = chosen.toISOString().slice(0, 10);
  }

  const timeMatch = lower.match(/(?:às|as|para|por volta de)\s*(\d{1,2})(?::|h|\s*horas?)?\s*(\d{2})?/);
  if (timeMatch) {
    const hour = String(Math.min(23, Number(timeMatch[1]))).padStart(2, "0");
    const minute = String(Math.min(59, Number(timeMatch[2] || 0))).padStart(2, "0");
    time = `${hour}:${minute}`;
  }

  return {
    title: text.replace(/^lembrar(?:-me)?\s*(de|para)?\s*/i, "").trim() || text,
    date,
    time,
    notes: `Criado por voz: "${text}"`,
    source: "voz",
  };
}

function parseCurrencyInput(value) {
  if (value === null || value === undefined || value === "") return 0;
  const normalized = String(value)
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");
  return Number(normalized) || 0;
}

function remaining(order) {
  return Math.max(0, Number(order.total || 0) - Number(order.deposit || 0));
}

function margin(order) {
  if (!order.total) return 0;
  return ((order.total - order.cost) / order.total) * 100;
}

function isFinalOrder(order) {
  return ["Entregue", "Finalizado", "Cancelado"].includes(order.productionStatus);
}

function isOverdue(order) {
  return asDate(order.dueDate) < TODAY && !isFinalOrder(order);
}

function isDueToday(order) {
  return order.dueDate === TODAY.toISOString().slice(0, 10) && !isFinalOrder(order);
}

function whatsappLink(phone, text) {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(text)}`;
}

function addHistory(order, text) {
  return {
    ...order,
    history: [{ at: dateTimeNowLabel(), text }, ...(order.history || [])],
  };
}

function groupSum(rows, getKey, getValue) {
  return rows.reduce((acc, row) => {
    const key = getKey(row);
    acc[key] = (acc[key] || 0) + Number(getValue(row) || 0);
    return acc;
  }, {});
}

function classNameForStatus(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("atras") || text.includes("venc") || text.includes("crítico") || text.includes("não pago")) return "danger";
  if (text.includes("aguard") || text.includes("pend") || text.includes("criação") || text.includes("parcial")) return "warning";
  if (text.includes("aprov") || text.includes("pago") || text.includes("entreg") || text.includes("finalizado") || text.includes("recebido") || text.includes("conclu")) return "success";
  if (text.includes("produção") || text.includes("acabamento") || text.includes("separando")) return "info";
  return "neutral";
}

function Icon({ name, size = 18 }) {
  return <i data-lucide={name} style={{ width: size, height: size }} aria-hidden="true" />;
}

function StatusBadge({ children }) {
  return <span className={`badge ${classNameForStatus(children)}`}>{children}</span>;
}

function PriorityBadge({ value }) {
  return <span className={`badge priority-${String(value).toLowerCase()}`}>{value}</span>;
}

function Button({ children, icon, variant = "primary", className = "", ...props }) {
  return (
    <button className={`btn ${variant} ${className}`} {...props}>
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
    </button>
  );
}

function IconButton({ label, icon, className = "", ...props }) {
  return (
    <button className={`icon-btn ${className}`} aria-label={label} title={label} {...props}>
      <Icon name={icon} />
    </button>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <Icon name="folder-search" size={28} />
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function ChartCanvas({ type, data, options = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.Chart || !canvasRef.current) return undefined;
    const chart = new window.Chart(canvasRef.current, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#5c616b",
              boxWidth: 10,
              usePointStyle: true,
              font: { size: 11 },
            },
          },
          tooltip: {
            backgroundColor: "#171717",
            borderColor: "#d8a90d",
            borderWidth: 1,
          },
        },
        scales:
          type === "doughnut" || type === "pie"
            ? {}
            : {
                x: { grid: { display: false }, ticks: { color: "#62666f" } },
                y: { grid: { color: "rgba(23,23,23,0.08)" }, ticks: { color: "#62666f" } },
              },
        ...options,
      },
    });
    return () => chart.destroy();
  }, [type, JSON.stringify(data), JSON.stringify(options)]);

  return (
    <div className="chart-height">
      <canvas ref={canvasRef} />
    </div>
  );
}

function Modal({ title, children, onClose, footer }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="modal-panel">
        <header className="modal-header">
          <h2>{title}</h2>
          <IconButton label="Fechar" icon="x" onClick={onClose} />
        </header>
        <div className="modal-body">{children}</div>
        {footer ? <footer className="modal-footer">{footer}</footer> : null}
      </section>
    </div>
  );
}

function Login({ onLogin, users }) {
  const [username, setUsername] = useState("arteslionadm");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const foundUser = users.find((user) => user.username === username.trim() && user.password === password);
    if (foundUser) {
      onLogin({ email: foundUser.username, role: foundUser.role, id: foundUser.id });
      return;
    }
    setError("Usuário ou senha inválidos.");
  }

  return (
    <main className="login-screen">
      <section className="login-panel">
        <div className="brand-mark large">AL</div>
        <div>
          <p className="eyebrow">Artes Lion Estamparia</p>
          <h1>Artes Lion Manager</h1>
        </div>
        <form onSubmit={submit} className="login-form">
          <label>
            Usuário
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
          </label>
          <label>
            Senha
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {error ? <p className="login-error">{error}</p> : null}
          <Button icon="log-in" className="full-width">Entrar</Button>
        </form>
      </section>
    </main>
  );
}

function MetricCard({ icon, label, value, helper, tone = "neutral" }) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-icon">
        <Icon name={icon} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{helper}</span>
      </div>
    </article>
  );
}

function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">Artes Lion Manager</p>
        <h1>{title}</h1>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}

function DashboardView({ clients, orders, quotes, artworks, stock, transactions, openModal, exportDashboardPDF, exportExcel }) {
  const month = currentMonthKey();
  const activeOrders = orders.filter((order) => !isFinalOrder(order));
  const monthOrders = orders.filter((order) => monthKey(order.createdAt) === month);
  const monthTransactions = transactions.filter((item) => monthKey(item.date) === month);
  const receivedMonth = monthTransactions
    .filter((item) => item.type === "receita" && ["recebido", "pago"].includes(item.status))
    .reduce((sum, item) => sum + item.amount, 0);
  const expensesMonth = monthTransactions
    .filter((item) => item.type === "despesa" && ["pago", "vencido", "pendente"].includes(item.status))
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingValue = orders.reduce((sum, order) => sum + remaining(order), 0);
  const overdueOrders = orders.filter(isOverdue);
  const dueToday = orders.filter(isDueToday);
  const pendingQuotes = quotes.filter((quote) => ["Em criação", "Enviado ao cliente", "Aguardando resposta"].includes(quote.status));
  const pendingArt = artworks.filter((art) => art.status === "Aguardando aprovação");
  const criticalStock = stock.filter((item) => item.qty <= item.min);
  const monthRevenue = monthOrders.reduce((sum, order) => sum + order.total, 0);
  const estimatedProfit = monthOrders.reduce((sum, order) => sum + (order.total - order.cost), 0);
  const avgTicket = monthOrders.length ? monthRevenue / monthOrders.length : 0;
  const newClients = clients.filter((client) => monthKey(client.createdAt) === month);
  const overdueBills = transactions.filter((item) => item.status === "vencido" || (item.status === "pendente" && asDate(item.date) < TODAY));
  const nextDeliveries = activeOrders.filter((order) => {
    const days = (asDate(order.dueDate) - TODAY) / 86400000;
    return days >= 0 && days <= 7;
  });

  const revenueByMonth = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"].map((key) => ({
    label: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][Number(key.slice(5)) - 1],
    value:
      transactions
        .filter((item) => item.type === "receita" && monthKey(item.date) === key && ["recebido", "pago"].includes(item.status))
        .reduce((sum, item) => sum + item.amount, 0) +
      orders.filter((order) => monthKey(order.createdAt) === key).reduce((sum, order) => sum + order.total - order.deposit, 0),
  }));

  const productSales = groupSum(orders, (order) => order.product, (order) => order.quantity);
  const serviceProfit = groupSum(orders, (order) => order.service, (order) => order.total - order.cost);
  const statusDistribution = groupSum(activeOrders, (order) => order.productionStatus, () => 1);
  const expenseCategories = groupSum(
    transactions.filter((item) => item.type === "despesa"),
    (item) => item.category,
    (item) => item.amount
  );
  const clientRevenue = clients
    .map((client) => ({
      name: client.name,
      value: orders.filter((order) => order.clientId === client.id).reduce((sum, order) => sum + order.total, 0) + client.totalPurchased,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const chartColors = ["#d7a900", "#2f9e44", "#1c7ed6", "#f76707", "#ae3ec9", "#e03131", "#495057"];

  const alerts = [
    ...overdueOrders.map((order) => ({ tone: "danger", text: `${order.number} atrasado para ${dateLabel(order.dueDate)}` })),
    ...overdueBills.map((bill) => ({ tone: "danger", text: `${bill.description}: ${BRL.format(bill.amount)}` })),
    ...criticalStock.map((item) => ({ tone: "warning", text: `${item.item} abaixo do mínimo (${item.qty}/${item.min})` })),
    ...pendingArt.map((art) => ({ tone: "warning", text: `${art.title} aguardando aprovação` })),
    ...nextDeliveries.map((order) => ({ tone: "info", text: `${order.number} entrega em ${dateLabel(order.dueDate)}` })),
  ].slice(0, 9);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`Visão gerencial de ${dateLabel(TODAY.toISOString().slice(0, 10))}`}
        actions={
          <>
            <Button icon="user-plus" variant="secondary" onClick={() => openModal("client")}>Novo cliente</Button>
            <Button icon="plus" onClick={() => openModal("order")}>Novo pedido</Button>
            <Button icon="file-down" variant="ghost" onClick={exportDashboardPDF}>PDF</Button>
          </>
        }
      />

      <section className="metric-grid">
        <MetricCard icon="badge-dollar-sign" label="Faturamento do mês" value={BRL.format(monthRevenue)} helper={`${monthOrders.length} pedidos no mês`} tone="gold" />
        <MetricCard icon="circle-dollar-sign" label="Recebido no mês" value={BRL.format(receivedMonth)} helper={`${BRL.format(expensesMonth)} em despesas`} tone="success" />
        <MetricCard icon="hourglass" label="Valor a receber" value={BRL.format(pendingValue)} helper="Saldos de pedidos abertos" tone="warning" />
        <MetricCard icon="loader-circle" label="Pedidos em andamento" value={activeOrders.length} helper="Produção e atendimento" />
        <MetricCard icon="alarm-clock" label="Pedidos atrasados" value={overdueOrders.length} helper="Atenção imediata" tone={overdueOrders.length ? "danger" : "success"} />
        <MetricCard icon="calendar-check" label="Pedidos para hoje" value={dueToday.length} helper="Retirada ou entrega" />
        <MetricCard icon="file-question" label="Orçamentos pendentes" value={pendingQuotes.length} helper="Follow-up comercial" tone="warning" />
        <MetricCard icon="paintbrush" label="Artes aguardando" value={pendingArt.length} helper="Aprovação do cliente" tone="warning" />
        <MetricCard icon="package-x" label="Estoque crítico" value={criticalStock.length} helper="Itens abaixo do mínimo" tone={criticalStock.length ? "danger" : "success"} />
        <MetricCard icon="trending-up" label="Lucro estimado" value={BRL.format(estimatedProfit)} helper={`${Math.round((estimatedProfit / Math.max(monthRevenue, 1)) * 100)}% margem média`} tone="success" />
        <MetricCard icon="receipt" label="Ticket médio" value={BRL.format(avgTicket)} helper="Pedidos do mês" />
        <MetricCard icon="users" label="Clientes cadastrados" value={clients.length} helper={`${newClients.length} novos no mês`} />
        <MetricCard icon="badge-alert" label="Contas vencidas" value={overdueBills.length} helper="Financeiro pendente" tone={overdueBills.length ? "danger" : "success"} />
        <MetricCard icon="route" label="Próximas entregas" value={nextDeliveries.length} helper="Janela de 7 dias" tone="info" />
        <MetricCard icon="banknote" label="Caixa projetado" value={BRL.format(receivedMonth - expensesMonth + pendingValue)} helper="Recebido - despesas + saldos" tone="gold" />
      </section>

      <section className="dashboard-layout">
        <article className="panel wide">
          <div className="panel-title">
            <h2>Faturamento mensal</h2>
            <Button variant="ghost" icon="download" onClick={() => exportExcel("faturamento-mensal", revenueByMonth)}>Excel</Button>
          </div>
          <ChartCanvas
            type="line"
            data={{
              labels: revenueByMonth.map((item) => item.label),
              datasets: [
                {
                  label: "Faturamento",
                  data: revenueByMonth.map((item) => item.value),
                  borderColor: "#d7a900",
                  backgroundColor: "rgba(215,169,0,0.15)",
                  fill: true,
                  tension: 0.38,
                  pointRadius: 4,
                },
              ],
            }}
          />
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Recebido x pendente</h2>
          </div>
          <ChartCanvas
            type="doughnut"
            data={{
              labels: ["Recebido", "Pendente"],
              datasets: [{ data: [receivedMonth, pendingValue], backgroundColor: ["#2f9e44", "#d7a900"], borderWidth: 0 }],
            }}
          />
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Pedidos por status</h2>
          </div>
          <ChartCanvas
            type="doughnut"
            data={{
              labels: Object.keys(statusDistribution),
              datasets: [{ data: Object.values(statusDistribution), backgroundColor: chartColors, borderWidth: 0 }],
            }}
          />
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Produtos mais vendidos</h2>
          </div>
          <ChartCanvas
            type="bar"
            data={{
              labels: Object.keys(productSales),
              datasets: [{ label: "Unidades", data: Object.values(productSales), backgroundColor: "#171717", borderRadius: 6 }],
            }}
            options={{ plugins: { legend: { display: false } } }}
          />
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Serviços mais lucrativos</h2>
          </div>
          <ChartCanvas
            type="bar"
            data={{
              labels: Object.keys(serviceProfit),
              datasets: [{ label: "Lucro", data: Object.values(serviceProfit), backgroundColor: "#d7a900", borderRadius: 6 }],
            }}
            options={{ plugins: { legend: { display: false } } }}
          />
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Despesas por categoria</h2>
          </div>
          <ChartCanvas
            type="pie"
            data={{
              labels: Object.keys(expenseCategories),
              datasets: [{ data: Object.values(expenseCategories), backgroundColor: chartColors, borderWidth: 0 }],
            }}
          />
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Clientes que mais compraram</h2>
          </div>
          <div className="ranking-list">
            {clientRevenue.map((item, index) => (
              <div className="ranking-row" key={item.name}>
                <strong>{index + 1}</strong>
                <span>{item.name}</span>
                <b>{BRL.format(item.value)}</b>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Alertas operacionais</h2>
          </div>
          <div className="alert-list">
            {alerts.length ? (
              alerts.map((alert, index) => (
                <div className={`alert-item ${alert.tone}`} key={`${alert.text}-${index}`}>
                  <Icon name={alert.tone === "danger" ? "triangle-alert" : alert.tone === "warning" ? "circle-alert" : "info"} />
                  <span>{alert.text}</span>
                </div>
              ))
            ) : (
              <EmptyState title="Sem alertas" text="Operação sem pendências críticas no momento." />
            )}
          </div>
        </article>
      </section>
    </>
  );
}

function RemindersView({ reminders, setReminders, moveToTrash, showToast }) {
  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().slice(0, 10),
    time: "09:00",
    notes: "",
  });
  const [listening, setListening] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const todayReminders = reminders.filter((item) => item.date === today && item.status !== "concluído");

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function saveReminder(event, payload = null) {
    if (event) event.preventDefault();
    const reminder = {
      id: Date.now(),
      title: (payload?.title || form.title).trim(),
      date: payload?.date || form.date,
      time: payload?.time || form.time,
      notes: payload?.notes || form.notes,
      status: "pendente",
      source: payload?.source || "manual",
    };
    if (!reminder.title) {
      showToast("Escreva o que deve ser lembrado.");
      return;
    }
    setReminders((items) => [reminder, ...items]);
    window.open(googleCalendarUrl(reminder), "_blank", "noopener,noreferrer");
    setForm({ title: "", date: today, time: "09:00", notes: "" });
    showToast("Lembrete salvo e aberto no Google Agenda.");
  }

  function startVoiceReminder() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("Seu navegador não liberou reconhecimento de voz. Use Chrome ou Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;
    setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      const parsed = parseVoiceReminder(transcript);
      setForm({
        title: parsed.title,
        date: parsed.date,
        time: parsed.time,
        notes: parsed.notes,
      });
      saveReminder(null, parsed);
    };
    recognition.onerror = () => {
      setListening(false);
      showToast("Não consegui ouvir o lembrete. Tente novamente.");
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  }

  function markDone(reminder) {
    setReminders((items) => items.map((item) => (item.id === reminder.id ? { ...item, status: "concluído" } : item)));
    showToast("Lembrete marcado como concluído.");
  }

  function deleteReminder(reminder) {
    if (!window.confirm("Excluir este lembrete?")) return;
    moveToTrash("reminders", reminder);
  }

  function speakToday() {
    const message = todayReminders.length
      ? `Você tem ${todayReminders.length} lembrete${todayReminders.length > 1 ? "s" : ""} para hoje. ${todayReminders
          .map((item) => `${timeLabel(item.time)}: ${item.title}`)
          .join(". ")}.`
      : "Você não tem lembretes pendentes para hoje.";
    speak(message);
  }

  return (
    <>
      <PageHeader
        title="Lembretes"
        subtitle="Crie lembretes manuais ou por voz e envie para o Google Agenda"
        actions={
          <>
            <Button icon="volume-2" variant="secondary" onClick={speakToday}>Ouvir lembretes de hoje</Button>
            <Button icon="mic" onClick={startVoiceReminder}>{listening ? "Ouvindo..." : "Falar lembrete"}</Button>
          </>
        }
      />

      <section className="split-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Novo lembrete</h2>
            <span>Abre direto no Google Agenda</span>
          </div>
          <form className="form-grid" onSubmit={saveReminder}>
            <label className="span-2">O que deve ser lembrado<input value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="Ex.: ligar para fornecedor às 15h" required /></label>
            <label>Data<input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} required /></label>
            <label>Horário<input type="time" value={form.time} onChange={(event) => update("time", event.target.value)} required /></label>
            <label className="span-2">Observações<textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Detalhes, pedido, cliente ou qualquer contexto" /></label>
            <div className="form-actions span-2">
              <Button type="button" variant="secondary" icon="mic" onClick={startVoiceReminder}>{listening ? "Ouvindo..." : "Criar por voz"}</Button>
              <Button icon="calendar-plus">Criar e abrir Google Agenda</Button>
            </div>
          </form>

          <div className="voice-hint">
            <Icon name="info" />
            <span>Exemplo de voz: “lembrar de cobrar o saldo do pedido amanhã às 15 horas”. O navegador pedirá permissão para usar o microfone.</span>
          </div>
        </article>

        <aside className="panel detail-panel">
          <div className="panel-title">
            <h2>Hoje</h2>
            <span>{todayReminders.length} pendentes</span>
          </div>
          <div className="reminder-list">
            {todayReminders.length ? (
              todayReminders.map((reminder) => (
                <div className="reminder-card" key={reminder.id}>
                  <div>
                    <strong>{timeLabel(reminder.time)}</strong>
                    <span>{reminder.title}</span>
                  </div>
                  <p>{reminder.notes}</p>
                  <div className="row-actions">
                    <IconButton label="Abrir no Google Agenda" icon="calendar-plus" onClick={() => window.open(googleCalendarUrl(reminder), "_blank", "noopener,noreferrer")} />
                    <IconButton label="Concluir" icon="check" onClick={() => markDone(reminder)} />
                    <IconButton label="Excluir" icon="trash-2" onClick={() => deleteReminder(reminder)} />
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="Sem lembretes pendentes" text="Crie um lembrete manualmente ou usando o microfone." />
            )}
          </div>
        </aside>
      </section>

      <article className="panel reminders-table">
        <div className="panel-title">
          <h2>Todos os lembretes</h2>
          <span>{reminders.length} cadastrados</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Lembrete</th>
                <th>Origem</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr key={reminder.id}>
                  <td>{dateLabel(reminder.date)}</td>
                  <td>{timeLabel(reminder.time)}</td>
                  <td>{reminder.title}</td>
                  <td>{reminder.source}</td>
                  <td><StatusBadge>{reminder.status}</StatusBadge></td>
                  <td>
                    <div className="row-actions">
                      <IconButton label="Abrir Google Agenda" icon="calendar-plus" onClick={() => window.open(googleCalendarUrl(reminder), "_blank", "noopener,noreferrer")} />
                      <IconButton label="Concluir" icon="check" onClick={() => markDone(reminder)} />
                      <IconButton label="Excluir" icon="trash-2" onClick={() => deleteReminder(reminder)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function ClientsView({ clients, orders, quotes, artworks, setSelectedClientId, selectedClientId, openModal, exportExcel, exportPDF, openWhatsAppTemplate, moveToTrash }) {
  const selected = clients.find((client) => client.id === selectedClientId) || clients[0];
  const selectedOrders = orders.filter((order) => order.clientId === selected?.id);
  const selectedQuotes = quotes.filter((quote) => quote.clientId === selected?.id);
  const selectedArt = artworks.filter((art) => art.clientId === selected?.id);
  const pending = selectedOrders.reduce((sum, order) => sum + remaining(order), 0);

  function sendClientToTrash(client) {
    if (!client) return;
    if (window.confirm(`Enviar ${client.name} para a lixeira? Pedidos, orçamentos e movimentações vinculadas também sairão dos cálculos.`)) {
      moveToTrash("clients", client);
    }
  }

  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Cadastro, histórico, WhatsApp e valores pendentes"
        actions={
          <>
            <Button icon="user-plus" onClick={() => openModal("client")}>Cadastrar cliente</Button>
            {selected ? <Button icon="trash-2" variant="ghost" onClick={() => sendClientToTrash(selected)}>Enviar cliente para lixeira</Button> : null}
            <Button icon="sheet" variant="secondary" onClick={() => exportExcel("clientes", clients)}>Excel</Button>
            <Button icon="file-text" variant="ghost" onClick={() => exportPDF("Clientes", clients, ["name", "phone", "type", "status"])}>PDF</Button>
          </>
        }
      />

      <section className="split-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Lista de clientes</h2>
            <span>{clients.length} cadastrados</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Tipo</th>
                  <th>Total comprado</th>
                  <th>Pedidos</th>
                  <th>Última compra</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className={selected?.id === client.id ? "selected-row" : ""} onClick={() => setSelectedClientId(client.id)}>
                    <td>{client.name}</td>
                    <td>{client.phone}</td>
                    <td>{client.type}</td>
                    <td>{BRL.format(client.totalPurchased)}</td>
                    <td>{client.orderCount}</td>
                    <td>{dateLabel(client.lastPurchase)}</td>
                    <td><StatusBadge>{client.status}</StatusBadge></td>
                    <td>
                      <Button
                        variant="ghost"
                        icon="trash-2"
                        onClick={(event) => {
                          event.stopPropagation();
                          sendClientToTrash(client);
                        }}
                      >
                        Lixeira
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {selected ? (
          <aside className="panel detail-panel">
            <div className="profile-heading">
              <div className="avatar">{selected.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <h2>{selected.name}</h2>
                <StatusBadge>{selected.status}</StatusBadge>
              </div>
            </div>
            <dl className="data-list">
              <div><dt>CPF/CNPJ</dt><dd>{selected.document}</dd></div>
              <div><dt>WhatsApp</dt><dd>{selected.phone}</dd></div>
              <div><dt>E-mail</dt><dd>{selected.email}</dd></div>
              <div><dt>Endereço</dt><dd>{selected.address}</dd></div>
              <div><dt>Tipo</dt><dd>{selected.type}</dd></div>
              <div><dt>Cadastro</dt><dd>{dateLabel(selected.createdAt)}</dd></div>
              <div><dt>Total comprado</dt><dd>{BRL.format(selected.totalPurchased + selectedOrders.reduce((sum, order) => sum + order.total, 0))}</dd></div>
              <div><dt>Valores pendentes</dt><dd>{BRL.format(pending)}</dd></div>
            </dl>

            <div className="quick-grid">
              {["Envio de orçamento", "Pedido criado", "Solicitação de aprovação de arte", "Pedido pronto", "Lembrete de pagamento", "Pós-venda"].map((template) => (
                <Button key={template} variant="secondary" icon="message-circle" onClick={() => openWhatsAppTemplate(selected, template)}>
                  {template}
                </Button>
              ))}
              <Button variant="ghost" icon="trash-2" onClick={() => sendClientToTrash(selected)}>
                Enviar cliente para lixeira
              </Button>
            </div>

            <div className="mini-section">
              <h3>Pedidos</h3>
              {selectedOrders.map((order) => (
                <div className="mini-row" key={order.id}>
                  <span>{order.number} · {order.product}</span>
                  <b>{BRL.format(order.total)}</b>
                </div>
              ))}
            </div>
            <div className="mini-section">
              <h3>Orçamentos</h3>
              {selectedQuotes.map((quote) => (
                <div className="mini-row" key={quote.id}>
                  <span>{quote.number} · {quote.product}</span>
                  <StatusBadge>{quote.status}</StatusBadge>
                </div>
              ))}
            </div>
            <div className="mini-section">
              <h3>Artes e arquivos</h3>
              {selectedArt.map((art) => (
                <div className="mini-row" key={art.id}>
                  <span>{art.file}</span>
                  <StatusBadge>{art.status}</StatusBadge>
                </div>
              ))}
            </div>
            <p className="internal-note">{selected.notes}</p>
          </aside>
        ) : null}
      </section>
    </>
  );
}

function QuotesView({ quotes, clients, setQuotes, createOrderFromQuote, openModal, exportExcel, exportQuotePDF, moveToTrash, showToast }) {
  function updateQuoteStatus(quote, status) {
    setQuotes((items) => items.map((item) => (item.id === quote.id ? { ...item, status } : item)));
    if (status === "Aprovado") {
      const shouldConvert = window.confirm("Deseja gerar pedido a partir deste orçamento?");
      if (shouldConvert) createOrderFromQuote({ ...quote, status });
    }
  }

  function duplicateQuote(quote) {
    const nextNumber = `ORC-2026-${String(30 + quotes.length).padStart(3, "0")}`;
    setQuotes((items) => [
      { ...quote, id: Date.now(), number: nextNumber, status: "Em criação", validUntil: TODAY.toISOString().slice(0, 10) },
      ...items,
    ]);
    showToast(`Orçamento ${nextNumber} duplicado.`);
  }

  function sendQuoteToTrash(quote) {
    if (window.confirm(`Enviar o orçamento ${quote.number} para a lixeira?`)) {
      moveToTrash("quotes", quote);
    }
  }

  return (
    <>
      <PageHeader
        title="Orçamentos"
        subtitle="Criação, envio, aprovação e conversão em pedidos"
        actions={
          <>
            <Button icon="file-plus-2" onClick={() => openModal("quote")}>Novo orçamento</Button>
            <Button icon="sheet" variant="secondary" onClick={() => exportExcel("orcamentos", quotes)}>Excel</Button>
          </>
        }
      />
      <article className="panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Cliente</th>
                <th>Produto/serviço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Validade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => {
                const client = clients.find((item) => item.id === quote.clientId);
                return (
                  <tr key={quote.id}>
                    <td>{quote.number}</td>
                    <td>{client?.name}</td>
                    <td>{quote.product} · {quote.service}</td>
                    <td>{quote.quantity}</td>
                    <td>{BRL.format(quote.total)}</td>
                    <td>{dateLabel(quote.validUntil)}</td>
                    <td>
                      <select value={quote.status} onChange={(event) => updateQuoteStatus(quote, event.target.value)}>
                        {["Em criação", "Enviado ao cliente", "Aguardando resposta", "Aprovado", "Recusado", "Expirado"].map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="row-actions">
                        <IconButton label="Duplicar" icon="copy" onClick={() => duplicateQuote(quote)} />
                        <IconButton label="Converter em pedido" icon="arrow-right-left" onClick={() => createOrderFromQuote(quote)} />
                        <IconButton label="Exportar PDF" icon="file-text" onClick={() => exportQuotePDF(quote)} />
                        <Button variant="ghost" icon="trash-2" onClick={() => sendQuoteToTrash(quote)}>
                          Lixeira
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function OrdersView({
  orders,
  clients,
  setOrders,
  openModal,
  exportExcel,
  exportPDF,
  exportOrderPDF,
  exportFiscalCoupon,
  handleOrderReady,
  registerPayment,
  moveToTrash,
  selectedOrderId,
  setSelectedOrderId,
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [priorityFilter, setPriorityFilter] = useState("todos");
  const [responsibleFilter, setResponsibleFilter] = useState("todos");

  function clientFor(order) {
    return clients.find((client) => client.id === order.clientId);
  }

  const responsibles = [...new Set(orders.map((order) => order.responsible))];
  const filteredOrders = orders.filter((order) => {
    const client = clientFor(order);
    const haystack = `${order.number} ${order.product} ${client?.name || ""}`.toLowerCase();
    return (
      haystack.includes(query.toLowerCase()) &&
      (statusFilter === "todos" || order.productionStatus === statusFilter) &&
      (priorityFilter === "todos" || order.priority === priorityFilter) &&
      (responsibleFilter === "todos" || order.responsible === responsibleFilter)
    );
  });
  const selected = orders.find((order) => order.id === selectedOrderId) || filteredOrders[0] || orders[0];

  function updateOrderField(orderId, field, value) {
    setOrders((items) =>
      items.map((order) =>
        order.id === orderId
          ? addHistory({ ...order, [field]: value }, `${field === "productionStatus" ? "Status de produção" : "Status financeiro"} alterado para ${value}.`)
          : order
      )
    );
  }

  function sendOrderToTrash(order) {
    if (!order) return;
    if (window.confirm(`Enviar o pedido ${order.number} para a lixeira? As movimentações financeiras dele sairão do caixa e relatórios.`)) {
      moveToTrash("orders", order);
    }
  }

  return (
    <>
      <PageHeader
        title="Pedidos"
        subtitle="Busca, filtros, produção, financeiro e ações rápidas"
        actions={
          <>
            <Button icon="plus" onClick={() => openModal("order")}>Novo pedido</Button>
            {selected ? <Button icon="trash-2" variant="ghost" onClick={() => sendOrderToTrash(selected)}>Enviar pedido para lixeira</Button> : null}
            <Button icon="sheet" variant="secondary" onClick={() => exportExcel("pedidos", orders)}>Excel</Button>
            <Button icon="file-text" variant="ghost" onClick={() => exportPDF("Pedidos", orders, ["number", "product", "productionStatus", "financialStatus"])}>PDF</Button>
          </>
        }
      />

      <section className="filters">
        <label className="search-field">
          <Icon name="search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por cliente, produto ou número" />
        </label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="todos">Todos os status</option>
          {PRODUCTION_STATUSES.map((status) => <option key={status}>{status}</option>)}
        </select>
        <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
          <option value="todos">Todas as prioridades</option>
          {["baixa", "normal", "alta", "urgente"].map((priority) => <option key={priority}>{priority}</option>)}
        </select>
        <select value={responsibleFilter} onChange={(event) => setResponsibleFilter(event.target.value)}>
          <option value="todos">Todos responsáveis</option>
          {responsibles.map((name) => <option key={name}>{name}</option>)}
        </select>
      </section>

      <section className="split-layout orders-layout">
        <article className="panel">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Entrega</th>
                  <th>Prioridade</th>
                  <th>Total</th>
                  <th>Produção</th>
                  <th>Financeiro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const client = clientFor(order);
                  return (
                    <tr key={order.id} className={selected?.id === order.id ? "selected-row" : ""} onClick={() => setSelectedOrderId(order.id)}>
                      <td>{order.number}</td>
                      <td>{client?.name}</td>
                      <td>{order.product}</td>
                      <td>{dateLabel(order.dueDate)} {isOverdue(order) ? <StatusBadge>atrasado</StatusBadge> : null}</td>
                      <td><PriorityBadge value={order.priority} /></td>
                      <td>{BRL.format(order.total)}</td>
                      <td>
                        <select value={order.productionStatus} onChange={(event) => updateOrderField(order.id, "productionStatus", event.target.value)}>
                          {PRODUCTION_STATUSES.map((status) => <option key={status}>{status}</option>)}
                        </select>
                      </td>
                      <td>
                        <select value={order.financialStatus} onChange={(event) => updateOrderField(order.id, "financialStatus", event.target.value)}>
                          {FINANCIAL_STATUSES.map((status) => <option key={status}>{status}</option>)}
                        </select>
                      </td>
                      <td>
                        <div className="row-actions">
                          <IconButton label="Pedido pronto" icon="message-circle" onClick={(event) => { event.stopPropagation(); handleOrderReady(order); }} />
                          <IconButton label="Registrar pagamento" icon="banknote" onClick={(event) => { event.stopPropagation(); registerPayment(order); }} />
                          <IconButton label="Gerar PDF" icon="file-text" onClick={(event) => { event.stopPropagation(); exportOrderPDF(order); }} />
                          <IconButton label="Cupom fiscal" icon="receipt-text" onClick={(event) => { event.stopPropagation(); exportFiscalCoupon(order); }} />
                          <Button
                            variant="ghost"
                            icon="trash-2"
                            onClick={(event) => {
                              event.stopPropagation();
                              sendOrderToTrash(order);
                            }}
                          >
                            Lixeira
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>

        {selected ? (
          <aside className="panel detail-panel">
            <div className="order-title">
              <div>
                <p className="eyebrow">{selected.number}</p>
                <h2>{selected.product}</h2>
              </div>
              <PriorityBadge value={selected.priority} />
            </div>
            <dl className="data-list">
              <div><dt>Cliente</dt><dd>{clientFor(selected)?.name}</dd></div>
              <div><dt>Orçamento</dt><dd>{selected.quoteNumber || "-"}</dd></div>
              <div><dt>Entrada</dt><dd>{dateLabel(selected.createdAt)}</dd></div>
              <div><dt>Entrega</dt><dd>{dateLabel(selected.dueDate)}</dd></div>
              <div><dt>Serviço</dt><dd>{selected.service}</dd></div>
              <div><dt>Quantidade</dt><dd>{selected.quantity}</dd></div>
              <div><dt>Tamanhos</dt><dd>{selected.sizes}</dd></div>
              <div><dt>Cores</dt><dd>{selected.colors}</dd></div>
              <div><dt>Total</dt><dd>{BRL.format(selected.total)}</dd></div>
              <div><dt>Entrada recebida</dt><dd>{BRL.format(selected.deposit)}</dd></div>
              <div><dt>Valor restante</dt><dd>{BRL.format(remaining(selected))}</dd></div>
              <div><dt>Custo estimado</dt><dd>{BRL.format(selected.cost)}</dd></div>
              <div><dt>Lucro estimado</dt><dd>{BRL.format(selected.total - selected.cost)}</dd></div>
              <div><dt>Margem</dt><dd>{margin(selected).toFixed(1)}%</dd></div>
              <div><dt>Responsável</dt><dd>{selected.responsible}</dd></div>
            </dl>
            <p className="internal-note">{selected.description}</p>
            <div className="quick-grid">
              <Button variant="secondary" icon="send" onClick={() => handleOrderReady(selected)}>Pedido pronto</Button>
              <Button variant="secondary" icon="check-circle-2" onClick={() => updateOrderField(selected.id, "productionStatus", "Arte aprovada")}>Marcar arte aprovada</Button>
              <Button variant="secondary" icon="factory" onClick={() => updateOrderField(selected.id, "productionStatus", "Em produção")}>Enviar produção</Button>
              <Button variant="secondary" icon="package-check" onClick={() => updateOrderField(selected.id, "productionStatus", "Entregue")}>Marcar entregue</Button>
              <Button variant="secondary" icon="banknote" onClick={() => registerPayment(selected)}>Registrar pagamento</Button>
              <Button variant="secondary" icon="file-text" onClick={() => exportOrderPDF(selected)}>PDF do pedido</Button>
              <Button variant="secondary" icon="receipt-text" onClick={() => exportFiscalCoupon(selected)}>Cupom fiscal</Button>
              <Button
                variant="secondary"
                icon="trash-2"
                onClick={() => sendOrderToTrash(selected)}
              >
                Enviar para lixeira
              </Button>
            </div>
            <div className="mini-section">
              <h3>Arquivos anexados</h3>
              {selected.attachments.map((file) => <span className="file-chip" key={file}>{file}</span>)}
            </div>
            <div className="mini-section">
              <h3>Histórico</h3>
              {selected.history.map((item, index) => (
                <div className="timeline-row" key={`${item.at}-${index}`}>
                  <span>{item.at}</span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </aside>
        ) : null}
      </section>
    </>
  );
}

function ProductionView({ orders, clients, setOrders }) {
  const columns = [
    { title: "Novos pedidos", statuses: ["Pedido criado", "Aguardando pagamento", "Pagamento parcial recebido"] },
    { title: "Arte pendente", statuses: ["Arte em criação"] },
    { title: "Aguardando aprovação", statuses: ["Arte enviada para aprovação"] },
    { title: "Material separado", statuses: ["Arte aprovada", "Separando material"] },
    { title: "Em produção", statuses: ["Em produção"] },
    { title: "Acabamento", statuses: ["Acabamento"] },
    { title: "Pronto", statuses: ["Pronto para retirada/entrega"] },
    { title: "Entregue", statuses: ["Entregue", "Finalizado"] },
  ];

  function updateStatus(orderId, status) {
    setOrders((items) => items.map((order) => (order.id === orderId ? addHistory({ ...order, productionStatus: status }, `Produção movida para ${status}.`) : order)));
  }

  return (
    <>
      <PageHeader title="Produção" subtitle="Kanban operacional por etapa" />
      <section className="kanban">
        {columns.map((column) => {
          const columnOrders = orders.filter((order) => column.statuses.includes(order.productionStatus));
          return (
            <article className="kanban-column" key={column.title}>
              <header>
                <h2>{column.title}</h2>
                <span>{columnOrders.length}</span>
              </header>
              {columnOrders.map((order) => {
                const client = clients.find((item) => item.id === order.clientId);
                return (
                  <div className={`kanban-card ${isOverdue(order) ? "overdue" : ""}`} key={order.id}>
                    <div className="kanban-card-top">
                      <strong>{order.number}</strong>
                      <PriorityBadge value={order.priority} />
                    </div>
                    <p>{client?.name}</p>
                    <span>{order.product} · {order.quantity} un</span>
                    <small>Entrega: {dateLabel(order.dueDate)}</small>
                    <select value={order.productionStatus} onChange={(event) => updateStatus(order.id, event.target.value)}>
                      {PRODUCTION_STATUSES.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </div>
                );
              })}
            </article>
          );
        })}
      </section>
    </>
  );
}

function ArtworksView({ artworks, setArtworks, orders, setOrders, clients, openWhatsAppTemplate, showToast }) {
  function approveArt(art) {
    setArtworks((items) =>
      items.map((item) =>
        item.id === art.id
          ? {
              ...item,
              status: "Aprovada",
              approvedAt: dateTimeNowLabel(),
              approver: clients.find((client) => client.id === item.clientId)?.name || "Cliente",
              version: "final",
              note: "Arquivo bloqueado como versão final.",
            }
          : item
      )
    );
    setOrders((items) =>
      items.map((order) =>
        order.number === art.orderNumber ? addHistory({ ...order, productionStatus: "Arte aprovada" }, "Arte aprovada; pedido liberado para produção.") : order
      )
    );
    showToast("Arte aprovada e pedido liberado para produção.");
  }

  return (
    <>
      <PageHeader title="Artes e Aprovações" subtitle="Criação, envio, aprovação e liberação para produção" />
      <section className="card-grid">
        {artworks.map((art) => {
          const client = clients.find((item) => item.id === art.clientId);
          const order = orders.find((item) => item.number === art.orderNumber);
          return (
            <article className="panel art-card" key={art.id}>
              <div className="panel-title">
                <div>
                  <h2>{art.title}</h2>
                  <span>{art.orderNumber} · {client?.name}</span>
                </div>
                <StatusBadge>{art.status}</StatusBadge>
              </div>
              <dl className="data-list compact">
                <div><dt>Versão</dt><dd>{art.version}</dd></div>
                <div><dt>Arquivo</dt><dd>{art.file}</dd></div>
                <div><dt>Envio</dt><dd>{art.sentAt || "-"}</dd></div>
                <div><dt>Aprovação</dt><dd>{art.approvedAt || "-"}</dd></div>
                <div><dt>Aprovador</dt><dd>{art.approver || "-"}</dd></div>
              </dl>
              <p className="internal-note">{art.note}</p>
              <div className="quick-grid">
                <Button variant="secondary" icon="message-circle" onClick={() => openWhatsAppTemplate(client, "Solicitação de aprovação de arte", order)}>
                  Solicitar aprovação
                </Button>
                <Button icon="check-circle-2" onClick={() => approveArt(art)} disabled={art.status === "Aprovada"}>
                  Aprovar arte
                </Button>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}

function StockView({ stock, setStock, exportExcel, exportPDF, showToast }) {
  const [form, setForm] = useState({
    item: "",
    category: "Camisas",
    unit: "un",
    qty: 0,
    min: 0,
    avgCost: 0,
    supplier: "",
  });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function saveStockItem(event) {
    event.preventDefault();
    if (!form.item.trim()) {
      showToast("Informe o nome do material.");
      return;
    }
    const materialName = form.item.trim();
    const qty = parseCurrencyInput(form.qty);
    const min = parseCurrencyInput(form.min);
    const avgCost = parseCurrencyInput(form.avgCost);
    const existing = stock.find((item) => item.item.toLowerCase() === materialName.toLowerCase());
    if (existing) {
      setStock((items) =>
        items.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                category: form.category.trim() || item.category || "Material",
                unit: form.unit.trim() || item.unit || "un",
                qty: Number(item.qty || 0) + qty,
                min,
                avgCost,
                supplier: form.supplier.trim() || item.supplier || "-",
              }
            : item
        )
      );
    } else {
      setStock((items) => [
        {
          id: Date.now(),
          item: materialName,
          category: form.category.trim() || "Material",
          unit: form.unit.trim() || "un",
          qty,
          min,
          avgCost,
          supplier: form.supplier.trim() || "-",
        },
        ...items,
      ]);
    }
    setForm({ item: "", category: "Camisas", unit: "un", qty: 0, min: 0, avgCost: 0, supplier: "" });
    showToast(existing ? "Material existente atualizado no estoque." : "Material cadastrado no estoque.");
  }

  function adjustStock(item, direction) {
    const raw = window.prompt(direction === "in" ? "Quantidade de entrada:" : "Quantidade de saída:");
    const qty = parseCurrencyInput(raw);
    if (!qty) return;
    setStock((items) =>
      items.map((row) => (row.id === item.id ? { ...row, qty: direction === "in" ? row.qty + qty : Math.max(0, row.qty - qty) } : row))
    );
    showToast(`${item.item}: estoque atualizado.`);
  }

  return (
    <>
      <PageHeader
        title="Estoque"
        subtitle="Materiais, mínimos, alertas e movimentação"
        actions={
          <>
            <Button icon="sheet" variant="secondary" onClick={() => exportExcel("estoque", stock)}>Excel</Button>
            <Button icon="file-text" variant="ghost" onClick={() => exportPDF("Estoque", stock, ["item", "category", "qty", "min"])}>PDF</Button>
          </>
        }
      />
      <article className="panel stock-form-panel">
        <div className="panel-title">
          <h2>Cadastrar material</h2>
          <span>Use nomes claros para vincular ao pedido</span>
        </div>
        <form className="form-grid" onSubmit={saveStockItem}>
          <label>Nome do material<input value={form.item} onChange={(event) => update("item", event.target.value)} placeholder="Ex.: Camisa algodão branca P" required /></label>
          <label>Categoria<input value={form.category} onChange={(event) => update("category", event.target.value)} placeholder="Camisas, Brindes, Insumos" /></label>
          <label>Unidade<input value={form.unit} onChange={(event) => update("unit", event.target.value)} placeholder="un, m, kg, ml" /></label>
          <label>Quantidade atual<input type="number" value={form.qty} onChange={(event) => update("qty", event.target.value)} min="0" step="0.01" /></label>
          <label>Estoque mínimo<input type="number" value={form.min} onChange={(event) => update("min", event.target.value)} min="0" step="0.01" /></label>
          <label>Custo médio<input value={form.avgCost} onChange={(event) => update("avgCost", event.target.value)} /></label>
          <label className="span-2">Fornecedor<input value={form.supplier} onChange={(event) => update("supplier", event.target.value)} /></label>
          <div className="form-actions span-2">
            <Button icon="save">Cadastrar material</Button>
          </div>
        </form>
      </article>
      <article className="panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Categoria</th>
                <th>Unidade</th>
                <th>Atual</th>
                <th>Mínimo</th>
                <th>Custo médio</th>
                <th>Fornecedor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id}>
                  <td>{item.item}</td>
                  <td>{item.category}</td>
                  <td>{item.unit}</td>
                  <td>{item.qty}</td>
                  <td>{item.min}</td>
                  <td>{BRL.format(item.avgCost)}</td>
                  <td>{item.supplier}</td>
                  <td><StatusBadge>{item.qty <= item.min ? "crítico" : "ok"}</StatusBadge></td>
                  <td>
                    <div className="row-actions">
                      <IconButton label="Entrada" icon="plus" onClick={() => adjustStock(item, "in")} />
                      <IconButton label="Saída" icon="minus" onClick={() => adjustStock(item, "out")} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function FinanceView({ transactions, orders, clients, exportExcel, exportPDF, registerPayment }) {
  const revenue = transactions.filter((item) => item.type === "receita" && item.status === "recebido").reduce((sum, item) => sum + item.amount, 0);
  const expenses = transactions.filter((item) => item.type === "despesa" && ["pago", "vencido", "pendente"].includes(item.status)).reduce((sum, item) => sum + item.amount, 0);
  const receivable = orders.reduce((sum, order) => sum + remaining(order), 0);
  const overdueReceivable = orders.filter((order) => remaining(order) > 0 && asDate(order.dueDate) < TODAY);

  return (
    <>
      <PageHeader
        title="Financeiro"
        subtitle="Receitas, despesas, pendências e status financeiro"
        actions={
          <>
            <Button icon="sheet" variant="secondary" onClick={() => exportExcel("financeiro", transactions)}>Excel</Button>
            <Button icon="file-text" variant="ghost" onClick={() => exportPDF("Financeiro", transactions, ["date", "description", "type", "amount", "status"])}>PDF</Button>
          </>
        }
      />
      <section className="metric-grid compact-metrics">
        <MetricCard icon="arrow-down-circle" label="Receitas recebidas" value={BRL.format(revenue)} helper="Histórico registrado" tone="success" />
        <MetricCard icon="arrow-up-circle" label="Despesas" value={BRL.format(expenses)} helper="Pagas e pendentes" tone="danger" />
        <MetricCard icon="landmark" label="Saldo operacional" value={BRL.format(revenue - expenses)} helper="Receitas - despesas" tone="gold" />
        <MetricCard icon="hourglass" label="A receber" value={BRL.format(receivable)} helper={`${overdueReceivable.length} pedidos vencidos`} tone="warning" />
      </section>

      <section className="split-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Movimentações</h2>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{dateLabel(item.date)}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.type}</td>
                    <td>{BRL.format(item.amount)}</td>
                    <td><StatusBadge>{item.status}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="panel detail-panel">
          <div className="panel-title">
            <h2>Pedidos com saldo</h2>
          </div>
          {orders.filter((order) => remaining(order) > 0).map((order) => {
            const client = clients.find((item) => item.id === order.clientId);
            return (
              <div className="collection-row" key={order.id}>
                <div>
                  <strong>{order.number}</strong>
                  <span>{client?.name} · {dateLabel(order.dueDate)}</span>
                </div>
                <b>{BRL.format(remaining(order))}</b>
                <IconButton label="Registrar pagamento" icon="banknote" onClick={() => registerPayment(order)} />
              </div>
            );
          })}
        </aside>
      </section>
    </>
  );
}

function CashFlowView({ transactions, orders, setTransactions, showToast }) {
  const [expenseForm, setExpenseForm] = useState({
    date: isoDate(new Date()),
    description: "",
    category: "Marketing",
    amount: 0,
    status: "pago",
  });

  function updateExpense(field, value) {
    setExpenseForm((current) => ({ ...current, [field]: value }));
  }

  function saveExpense(event) {
    event.preventDefault();
    const amount = parseCurrencyInput(expenseForm.amount);
    if (!expenseForm.description.trim() || amount <= 0) {
      showToast("Informe descrição e valor do custo.");
      return;
    }
    setTransactions((items) => [
      {
        id: Date.now(),
        date: expenseForm.date,
        description: expenseForm.description.trim(),
        category: expenseForm.category,
        type: "despesa",
        amount,
        status: expenseForm.status,
        orderNumber: "",
      },
      ...items,
    ]);
    setExpenseForm({ date: isoDate(new Date()), description: "", category: "Marketing", amount: 0, status: "pago" });
    showToast("Custo lançado no fluxo de caixa.");
  }

  const projections = [
    ...transactions.map((item) => ({
      date: item.date,
      description: item.description,
      type: item.type,
      amount: item.type === "receita" ? item.amount : -item.amount,
      status: item.status,
    })),
    ...orders
      .filter((order) => remaining(order) > 0)
      .map((order) => ({
        date: order.dueDate,
        description: `Saldo ${order.number}`,
        type: "receita",
        amount: remaining(order),
        status: "previsto",
      })),
  ].sort((a, b) => asDate(a.date) - asDate(b.date));

  let running = 0;
  const runningRows = projections.map((item) => {
    running += item.amount;
    return { ...item, balance: running };
  });

  const byDay = Object.values(
    runningRows.reduce((acc, item) => {
      acc[item.date] = acc[item.date] || { date: dateLabel(item.date), amount: 0 };
      acc[item.date].amount += item.amount;
      return acc;
    }, {})
  );

  return (
    <>
      <PageHeader title="Fluxo de Caixa" subtitle="Entradas, saídas e saldo projetado" />
      <section className="dashboard-layout">
        <article className="panel wide">
          <div className="panel-title">
            <h2>Lançar custo da empresa</h2>
            <span>Despesa entra no financeiro e fluxo de caixa</span>
          </div>
          <form className="form-grid" onSubmit={saveExpense}>
            <label>Data<input type="date" value={expenseForm.date} onChange={(event) => updateExpense("date", event.target.value)} /></label>
            <label>Categoria<select value={expenseForm.category} onChange={(event) => updateExpense("category", event.target.value)}>
              {["Marketing", "Custo operacional", "Transporte", "Luz", "Funcionário", "Aluguel", "Internet", "Fornecedor", "Material", "Outro"].map((item) => <option key={item}>{item}</option>)}
            </select></label>
            <label>Valor<input value={expenseForm.amount} onChange={(event) => updateExpense("amount", event.target.value)} /></label>
            <label>Status<select value={expenseForm.status} onChange={(event) => updateExpense("status", event.target.value)}>
              {["pago", "pendente", "vencido"].map((item) => <option key={item}>{item}</option>)}
            </select></label>
            <label className="span-2">Descrição<input value={expenseForm.description} onChange={(event) => updateExpense("description", event.target.value)} placeholder="Ex.: campanha Instagram, conta de luz, transporte de entrega" /></label>
            <div className="form-actions span-2">
              <Button icon="plus">Lançar custo</Button>
            </div>
          </form>
        </article>
        <article className="panel wide">
          <div className="panel-title">
            <h2>Fluxo diário</h2>
          </div>
          <ChartCanvas
            type="bar"
            data={{
              labels: byDay.map((item) => item.date),
              datasets: [{ label: "Resultado do dia", data: byDay.map((item) => item.amount), backgroundColor: "#d7a900", borderRadius: 6 }],
            }}
          />
        </article>
        <article className="panel wide">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {runningRows.map((item, index) => (
                  <tr key={`${item.description}-${index}`}>
                    <td>{dateLabel(item.date)}</td>
                    <td>{item.description}</td>
                    <td>{item.type}</td>
                    <td>{BRL.format(item.amount)}</td>
                    <td><StatusBadge>{item.status}</StatusBadge></td>
                    <td>{BRL.format(item.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
}

function ProductsView({ orders }) {
  const productStats = Object.entries(groupSum(orders, (order) => order.product, (order) => order.quantity)).map(([name, qty]) => {
    const related = orders.filter((order) => order.product === name);
    const revenue = related.reduce((sum, order) => sum + order.total, 0);
    const profit = related.reduce((sum, order) => sum + order.total - order.cost, 0);
    return { name, qty, revenue, profit };
  });
  const serviceStats = Object.entries(groupSum(orders, (order) => order.service, (order) => order.total - order.cost)).map(([name, profit]) => {
    const related = orders.filter((order) => order.service === name);
    return { name, orders: related.length, revenue: related.reduce((sum, order) => sum + order.total, 0), profit };
  });

  return (
    <>
      <PageHeader title="Produtos e Serviços" subtitle="Mix de vendas, lucratividade e ranking operacional" />
      <section className="split-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Produtos</h2>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Unidades</th>
                  <th>Faturamento</th>
                  <th>Lucro</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{BRL.format(item.revenue)}</td>
                    <td>{BRL.format(item.profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="panel">
          <div className="panel-title">
            <h2>Serviços</h2>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Pedidos</th>
                  <th>Faturamento</th>
                  <th>Lucro</th>
                </tr>
              </thead>
              <tbody>
                {serviceStats.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.orders}</td>
                    <td>{BRL.format(item.revenue)}</td>
                    <td>{BRL.format(item.profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
}

function SupplierForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    phone: "5522",
    category: "",
    balance: 0,
  });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const phone = normalizePhone(form.phone);
    if (!form.name.trim() || !phone) return;
    onSave({
      id: Date.now(),
      name: form.name.trim(),
      contact: form.contact.trim(),
      phone,
      category: form.category.trim() || "Fornecedor geral",
      balance: parseCurrencyInput(form.balance),
      lastPurchase: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Fornecedor<input value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
      <label>Contato<input value={form.contact} onChange={(event) => update("contact", event.target.value)} /></label>
      <label>WhatsApp<input value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></label>
      <label>Categoria<input value={form.category} onChange={(event) => update("category", event.target.value)} /></label>
      <label>Saldo em aberto<input value={form.balance} onChange={(event) => update("balance", event.target.value)} /></label>
      <div className="form-actions span-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button icon="save">Salvar fornecedor</Button>
      </div>
    </form>
  );
}

function EmployeesView({ employees, setEmployees, absences, setAbsences, advances, setAdvances, periodRange, showToast }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({ name: "", role: "", salary: 0, status: "ativo" });
  const [absenceForm, setAbsenceForm] = useState({ employeeId: "", date: isoDate(new Date()), reason: "Falta sem justificativa", note: "", certificateName: "" });
  const [advanceForm, setAdvanceForm] = useState({ employeeId: "", date: isoDate(new Date()), amount: 0, receiptName: "", note: "" });

  const activeEmployees = employees.filter((employee) => employee.status === "ativo");
  const periodAbsences = absences.filter((item) => isWithinPeriod(item.date, periodRange));
  const periodAdvances = advances.filter((item) => isWithinPeriod(item.date, periodRange));
  const selected = employees.find((employee) => employee.id === selectedEmployeeId) || employees[0];

  function dailyValue(employee) {
    return Number(employee?.salary || 0) / 30;
  }

  function employeeAbsences(employeeId) {
    return periodAbsences.filter((item) => item.employeeId === employeeId);
  }

  function employeeAdvances(employeeId) {
    return periodAdvances.filter((item) => item.employeeId === employeeId);
  }

  function absenceDiscount(employee) {
    return employeeAbsences(employee.id).filter((item) => item.deduct).length * dailyValue(employee);
  }

  function advanceDiscount(employee) {
    return employeeAdvances(employee.id).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }

  function finalSalary(employee) {
    return Math.max(0, Number(employee.salary || 0) - absenceDiscount(employee) - advanceDiscount(employee));
  }

  const totalSalary = activeEmployees.reduce((sum, employee) => sum + Number(employee.salary || 0), 0);
  const totalAbsenceDiscount = activeEmployees.reduce((sum, employee) => sum + absenceDiscount(employee), 0);
  const totalAdvances = periodAdvances.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const justifiedAbsences = periodAbsences.filter((item) => item.reason === "Doença" && item.certificateName).length;
  const deductedAbsences = periodAbsences.filter((item) => item.deduct).length;
  const finalPayroll = activeEmployees.reduce((sum, employee) => sum + finalSalary(employee), 0);

  function saveEmployee(event) {
    event.preventDefault();
    if (!employeeForm.name.trim()) {
      showToast("Informe o nome do funcionário.");
      return;
    }
    const employee = {
      id: Date.now(),
      name: employeeForm.name.trim(),
      role: employeeForm.role.trim() || "Funcionário",
      salary: parseCurrencyInput(employeeForm.salary),
      status: employeeForm.status,
      createdAt: isoDate(new Date()),
    };
    setEmployees((items) => [employee, ...items]);
    setSelectedEmployeeId(employee.id);
    setEmployeeForm({ name: "", role: "", salary: 0, status: "ativo" });
    showToast("Funcionário cadastrado.");
  }

  function saveAbsence(event) {
    event.preventDefault();
    const employeeId = Number(absenceForm.employeeId || selected?.id);
    if (!employeeId) {
      showToast("Selecione um funcionário.");
      return;
    }
    if (absenceForm.reason === "Doença" && !absenceForm.certificateName) {
      showToast("Para doença, anexe a foto do atestado médico.");
      return;
    }
    setAbsences((items) => [
      {
        id: Date.now(),
        employeeId,
        date: absenceForm.date,
        reason: absenceForm.reason,
        note: absenceForm.note,
        certificateName: absenceForm.certificateName,
        deduct: absenceForm.reason !== "Doença",
      },
      ...items,
    ]);
    setAbsenceForm({ employeeId: "", date: isoDate(new Date()), reason: "Falta sem justificativa", note: "", certificateName: "" });
    showToast("Falta registrada.");
  }

  function saveAdvance(event) {
    event.preventDefault();
    const employeeId = Number(advanceForm.employeeId || selected?.id);
    const amount = parseCurrencyInput(advanceForm.amount);
    if (!employeeId || amount <= 0) {
      showToast("Selecione funcionário e valor do vale.");
      return;
    }
    if (!advanceForm.receiptName) {
      showToast("Anexe o comprovante de pagamento do vale.");
      return;
    }
    setAdvances((items) => [
      {
        id: Date.now(),
        employeeId,
        date: advanceForm.date,
        amount,
        receiptName: advanceForm.receiptName,
        note: advanceForm.note,
      },
      ...items,
    ]);
    setAdvanceForm({ employeeId: "", date: isoDate(new Date()), amount: 0, receiptName: "", note: "" });
    showToast("Vale registrado e descontado automaticamente.");
  }

  function toggleEmployeeStatus(employee) {
    const nextStatus = employee.status === "ativo" ? "inativo" : "ativo";
    setEmployees((items) => items.map((item) => (item.id === employee.id ? { ...item, status: nextStatus } : item)));
    showToast(`${employee.name} marcado como ${nextStatus}.`);
  }

  return (
    <>
      <PageHeader title="Funcionários" subtitle="Equipe, faltas, vales, descontos e salário final do período" />

      <section className="metric-grid compact-metrics">
        <MetricCard icon="users" label="Funcionários ativos" value={activeEmployees.length} helper={`${employees.length} cadastrados`} />
        <MetricCard icon="wallet" label="Salários combinados" value={BRL.format(totalSalary)} helper="Funcionários ativos" tone="gold" />
        <MetricCard icon="calendar-x" label="Faltas no período" value={periodAbsences.length} helper={`${deductedAbsences} descontadas`} tone="warning" />
        <MetricCard icon="file-check-2" label="Faltas com atestado" value={justifiedAbsences} helper="Sem desconto de diária" tone="success" />
        <MetricCard icon="hand-coins" label="Vales pagos" value={BRL.format(totalAdvances)} helper={`${periodAdvances.length} lançamentos`} tone="warning" />
        <MetricCard icon="minus-circle" label="Descontos automáticos" value={BRL.format(totalAbsenceDiscount + totalAdvances)} helper="Faltas + vales" tone="danger" />
        <MetricCard icon="badge-dollar-sign" label="Total final a pagar" value={BRL.format(finalPayroll)} helper={periodRange.label} tone="success" />
      </section>

      <section className="split-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Cadastrar funcionário</h2>
            <span>Diária calculada automaticamente</span>
          </div>
          <form className="form-grid" onSubmit={saveEmployee}>
            <label>Nome<input value={employeeForm.name} onChange={(event) => setEmployeeForm((current) => ({ ...current, name: event.target.value }))} required /></label>
            <label>Função<input value={employeeForm.role} onChange={(event) => setEmployeeForm((current) => ({ ...current, role: event.target.value }))} /></label>
            <label>Salário combinado<input value={employeeForm.salary} onChange={(event) => setEmployeeForm((current) => ({ ...current, salary: event.target.value }))} /></label>
            <label>Status<select value={employeeForm.status} onChange={(event) => setEmployeeForm((current) => ({ ...current, status: event.target.value }))}>
              <option>ativo</option>
              <option>inativo</option>
            </select></label>
            <div className="span-2 internal-note">Valor da diária: {BRL.format(parseCurrencyInput(employeeForm.salary) / 30)}</div>
            <div className="form-actions span-2">
              <Button icon="save">Salvar funcionário</Button>
            </div>
          </form>
        </article>

        <aside className="panel detail-panel">
          <div className="panel-title">
            <h2>Ficha individual</h2>
            <span>{selected?.name || "Selecione um funcionário"}</span>
          </div>
          {selected ? (
            <>
              <dl className="data-list compact">
                <div><dt>Nome</dt><dd>{selected.name}</dd></div>
                <div><dt>Função</dt><dd>{selected.role}</dd></div>
                <div><dt>Salário combinado</dt><dd>{BRL.format(selected.salary)}</dd></div>
                <div><dt>Valor da diária</dt><dd>{BRL.format(dailyValue(selected))}</dd></div>
                <div><dt>Status</dt><dd>{selected.status}</dd></div>
                <div><dt>Faltas registradas</dt><dd>{employeeAbsences(selected.id).length}</dd></div>
                <div><dt>Vales registrados</dt><dd>{BRL.format(advanceDiscount(selected))}</dd></div>
                <div><dt>Descontos aplicados</dt><dd>{BRL.format(absenceDiscount(selected) + advanceDiscount(selected))}</dd></div>
                <div><dt>Salário final</dt><dd>{BRL.format(finalSalary(selected))}</dd></div>
              </dl>
              <div className="mini-section">
                <h3>Ocorrências</h3>
                {[...employeeAbsences(selected.id).map((item) => ({ date: item.date, text: `Falta: ${item.reason}${item.certificateName ? ` · Atestado: ${item.certificateName}` : ""}` })), ...employeeAdvances(selected.id).map((item) => ({ date: item.date, text: `Vale: ${BRL.format(item.amount)} · Comprovante: ${item.receiptName}` }))].sort((a, b) => asDate(b.date) - asDate(a.date)).map((item, index) => (
                  <div className="timeline-row" key={`${item.text}-${index}`}>
                    <span>{dateLabel(item.date)}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState title="Nenhum funcionário" text="Cadastre um funcionário para ver a ficha individual." />
          )}
        </aside>
      </section>

      <section className="split-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Registrar falta</h2>
          </div>
          <form className="form-grid" onSubmit={saveAbsence}>
            <label>Funcionário<select value={absenceForm.employeeId || selected?.id || ""} onChange={(event) => setAbsenceForm((current) => ({ ...current, employeeId: event.target.value }))}>
              <option value="">Selecione</option>
              {employees.map((employee) => <option value={employee.id} key={employee.id}>{employee.name}</option>)}
            </select></label>
            <label>Data da falta<input type="date" value={absenceForm.date} onChange={(event) => setAbsenceForm((current) => ({ ...current, date: event.target.value }))} /></label>
            <label>Motivo<select value={absenceForm.reason} onChange={(event) => setAbsenceForm((current) => ({ ...current, reason: event.target.value, certificateName: event.target.value === "Doença" ? current.certificateName : "" }))}>
              <option>Doença</option>
              <option>Falta sem justificativa</option>
              <option>Outro motivo</option>
            </select></label>
            <label>Atestado médico<input type="file" accept="image/*,.pdf" onChange={(event) => setAbsenceForm((current) => ({ ...current, certificateName: event.target.files?.[0]?.name || "" }))} /></label>
            <label className="span-2">Observação<textarea value={absenceForm.note} onChange={(event) => setAbsenceForm((current) => ({ ...current, note: event.target.value }))} /></label>
            <div className="form-actions span-2">
              <Button icon="calendar-x">Registrar falta</Button>
            </div>
          </form>
        </article>

        <article className="panel">
          <div className="panel-title">
            <h2>Registrar vale</h2>
          </div>
          <form className="form-grid" onSubmit={saveAdvance}>
            <label>Funcionário<select value={advanceForm.employeeId || selected?.id || ""} onChange={(event) => setAdvanceForm((current) => ({ ...current, employeeId: event.target.value }))}>
              <option value="">Selecione</option>
              {employees.map((employee) => <option value={employee.id} key={employee.id}>{employee.name}</option>)}
            </select></label>
            <label>Data do vale<input type="date" value={advanceForm.date} onChange={(event) => setAdvanceForm((current) => ({ ...current, date: event.target.value }))} /></label>
            <label>Valor do vale<input value={advanceForm.amount} onChange={(event) => setAdvanceForm((current) => ({ ...current, amount: event.target.value }))} /></label>
            <label>Comprovante<input type="file" accept="image/*,.pdf" onChange={(event) => setAdvanceForm((current) => ({ ...current, receiptName: event.target.files?.[0]?.name || "" }))} /></label>
            <label className="span-2">Observação<textarea value={advanceForm.note} onChange={(event) => setAdvanceForm((current) => ({ ...current, note: event.target.value }))} /></label>
            <div className="form-actions span-2">
              <Button icon="hand-coins">Registrar vale</Button>
            </div>
          </form>
        </article>
      </section>

      <article className="panel">
        <div className="panel-title">
          <h2>Lista de funcionários</h2>
          <span>{employees.length} cadastrados</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Salário combinado</th>
                <th>Diária</th>
                <th>Faltas no período</th>
                <th>Vales recebidos</th>
                <th>Descontos automáticos</th>
                <th>Salário final previsto</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{BRL.format(employee.salary)}</td>
                  <td>{BRL.format(dailyValue(employee))}</td>
                  <td>{employeeAbsences(employee.id).length}</td>
                  <td>{BRL.format(advanceDiscount(employee))}</td>
                  <td>{BRL.format(absenceDiscount(employee) + advanceDiscount(employee))}</td>
                  <td>{BRL.format(finalSalary(employee))}</td>
                  <td>
                    <div className="row-actions">
                      <Button variant="secondary" icon="eye" onClick={() => setSelectedEmployeeId(employee.id)}>Ver</Button>
                      <Button variant="ghost" icon={employee.status === "ativo" ? "user-x" : "user-check"} onClick={() => toggleEmployeeStatus(employee)}>
                        {employee.status === "ativo" ? "Inativar" : "Ativar"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function SuppliersView({ suppliers, setSuppliers, stock, setStock, transactions, setTransactions, moveToTrash, showToast }) {
  function registerPurchase(supplier) {
    const itemName = window.prompt("Material comprado:", stock[0]?.item || "");
    if (!itemName) return;
    const amount = parseCurrencyInput(window.prompt("Valor total da compra:"));
    const qty = parseCurrencyInput(window.prompt("Quantidade de entrada no estoque:"));
    setStock((items) =>
      items.map((item) => (item.item.toLowerCase() === itemName.toLowerCase() ? { ...item, qty: item.qty + qty } : item))
    );
    setTransactions((items) => [
      {
        id: Date.now(),
        date: TODAY.toISOString().slice(0, 10),
        description: `Compra ${supplier.name} - ${itemName}`,
        category: "Fornecedor",
        type: "despesa",
        amount,
        status: "pendente",
        orderNumber: "",
      },
      ...items,
    ]);
    showToast("Compra registrada no estoque, financeiro e fluxo de caixa.");
  }

  function saveSupplier(supplier) {
    setSuppliers((items) => [supplier, ...items]);
    showToast("Fornecedor cadastrado.");
  }

  function deleteSupplier(supplier) {
    if (!window.confirm(`Excluir o fornecedor ${supplier.name}?`)) return;
    moveToTrash("suppliers", supplier);
  }

  function openSupplierWhatsApp(supplier) {
    const message = `Olá, ${supplier.contact || supplier.name}! Aqui é da Artes Lion Estamparia. Gostaria de falar sobre compras e materiais.`;
    window.open(whatsappLink(supplier.phone, message), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <PageHeader title="Fornecedores" subtitle="Cadastro, exclusão, WhatsApp e compras vinculadas a estoque e financeiro" />
      <section className="split-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Cadastrar fornecedor</h2>
            <span>Telefone salvo no padrão WhatsApp</span>
          </div>
          <SupplierForm onSave={saveSupplier} onCancel={() => showToast("Cadastro cancelado.")} />
        </article>
        <aside className="panel detail-panel">
          <div className="panel-title">
            <h2>Resumo</h2>
          </div>
          <dl className="data-list compact">
            <div><dt>Fornecedores</dt><dd>{suppliers.length}</dd></div>
            <div><dt>Saldo em aberto</dt><dd>{BRL.format(suppliers.reduce((sum, supplier) => sum + supplier.balance, 0))}</dd></div>
            <div><dt>Últimas compras</dt><dd>{transactions.filter((item) => item.category === "Fornecedor").length}</dd></div>
          </dl>
        </aside>
      </section>
      <article className="panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Fornecedor</th>
                <th>Contato</th>
                <th>WhatsApp</th>
                <th>Categoria</th>
                <th>Saldo</th>
                <th>Última compra</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.category}</td>
                  <td>{BRL.format(supplier.balance)}</td>
                  <td>{dateLabel(supplier.lastPurchase)}</td>
                  <td>
                    <div className="row-actions">
                      <IconButton label="WhatsApp" icon="message-circle" onClick={() => openSupplierWhatsApp(supplier)} />
                      <IconButton label="Compra" icon="shopping-cart" onClick={() => registerPurchase(supplier)} />
                      <IconButton label="Excluir" icon="trash-2" onClick={() => deleteSupplier(supplier)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function ReportsView({ clients, orders, stock, transactions, exportPDF }) {
  const reports = [
    {
      title: "Vendas por produto",
      icon: "shirt",
      value: BRL.format(orders.reduce((sum, order) => sum + order.total, 0)),
      rows: orders,
      columns: ["number", "product", "service", "total"],
    },
    {
      title: "Financeiro mensal",
      icon: "wallet-cards",
      value: BRL.format(transactions.reduce((sum, item) => sum + (item.type === "receita" ? item.amount : -item.amount), 0)),
      rows: transactions,
      columns: ["date", "description", "type", "amount", "status"],
    },
    {
      title: "Clientes por faturamento",
      icon: "users",
      value: clients.length,
      rows: clients,
      columns: ["name", "type", "totalPurchased", "status"],
    },
    {
      title: "Estoque crítico",
      icon: "package-x",
      value: stock.filter((item) => item.qty <= item.min).length,
      rows: stock.filter((item) => item.qty <= item.min),
      columns: ["item", "qty", "min", "supplier"],
    },
  ];

  const statusDistribution = groupSum(orders, (order) => order.productionStatus, () => 1);

  return (
    <>
      <PageHeader title="Relatórios" subtitle="Indicadores básicos para gestão e tomada de decisão" />
      <section className="dashboard-layout">
        <article className="panel wide">
          <div className="panel-title">
            <h2>Status dos pedidos</h2>
          </div>
          <ChartCanvas
            type="bar"
            data={{
              labels: Object.keys(statusDistribution),
              datasets: [{ label: "Pedidos", data: Object.values(statusDistribution), backgroundColor: "#171717", borderRadius: 6 }],
            }}
          />
        </article>
        {reports.map((report) => (
          <article className="panel report-card" key={report.title}>
            <div className="metric-icon">
              <Icon name={report.icon} />
            </div>
            <h2>{report.title}</h2>
            <strong>{report.value}</strong>
            <Button icon="file-text" variant="secondary" onClick={() => exportPDF(report.title, report.rows, report.columns)}>
              Exportar PDF
            </Button>
          </article>
        ))}
      </section>
    </>
  );
}

function ExportsView({ clients, quotes, orders, stock, transactions, reminders, employees, employeeAbsences, employeeAdvances, exportExcel, exportPDF, exportDashboardPDF }) {
  const exports = [
    { label: "Clientes", data: clients, columns: ["name", "phone", "type", "status"] },
    { label: "Orçamentos", data: quotes, columns: ["number", "product", "total", "status"] },
    { label: "Pedidos", data: orders, columns: ["number", "product", "total", "productionStatus", "financialStatus"] },
    { label: "Lembretes", data: reminders, columns: ["date", "time", "title", "status"] },
    { label: "Estoque", data: stock, columns: ["item", "qty", "min", "supplier"] },
    { label: "Financeiro", data: transactions, columns: ["date", "description", "type", "amount", "status"] },
    { label: "Funcionários", data: employees, columns: ["name", "role", "salary", "status"] },
    { label: "Faltas", data: employeeAbsences, columns: ["date", "employeeId", "reason", "deduct", "certificateName"] },
    { label: "Vales", data: employeeAdvances, columns: ["date", "employeeId", "amount", "receiptName"] },
  ];

  return (
    <>
      <PageHeader title="Exportações" subtitle="Arquivos Excel e PDF dos dados principais" actions={<Button icon="file-text" onClick={exportDashboardPDF}>PDF gerencial</Button>} />
      <section className="card-grid">
        {exports.map((item) => (
          <article className="panel export-card" key={item.label}>
            <div className="panel-title">
              <h2>{item.label}</h2>
              <span>{item.data.length} registros</span>
            </div>
            <div className="quick-grid two">
              <Button icon="sheet" variant="secondary" onClick={() => exportExcel(item.label.toLowerCase(), item.data)}>Excel</Button>
              <Button icon="file-text" variant="ghost" onClick={() => exportPDF(item.label, item.data, item.columns)}>PDF</Button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function TrashView({ trashItems, restoreTrashItem, deleteTrashItem }) {
  const labels = {
    clients: "Cliente",
    quotes: "Orçamento",
    orders: "Pedido",
    suppliers: "Fornecedor",
    reminders: "Lembrete",
  };
  const grouped = trashItems.reduce((acc, item) => {
    const label = labels[item.collection] || item.typeLabel || item.collection;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        title="Lixeira"
        subtitle="Itens removidos não entram no caixa, relatórios, gráficos ou exportações"
      />

      <section className="metric-grid compact-metrics">
        <MetricCard icon="trash-2" label="Itens na lixeira" value={trashItems.length} helper="Removidos das telas principais" tone="warning" />
        {Object.entries(grouped).slice(0, 3).map(([label, total]) => (
          <MetricCard key={label} icon="archive-restore" label={label} value={total} helper="Disponível para resgate" />
        ))}
      </section>

      <article className="panel">
        <div className="panel-title">
          <h2>Itens removidos</h2>
          <span>{trashItems.length} registros</span>
        </div>
        {trashItems.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Registro</th>
                  <th>Removido em</th>
                  <th>Dados vinculados</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {trashItems.map((item) => {
                  const relatedCount = Object.values(item.related || {}).reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0);
                  return (
                    <tr key={item.trashId}>
                      <td><StatusBadge>{labels[item.collection] || item.typeLabel}</StatusBadge></td>
                      <td>{item.title}</td>
                      <td>{item.deletedAt}</td>
                      <td>{relatedCount ? `${relatedCount} vínculo(s)` : "-"}</td>
                      <td>
                        <div className="row-actions">
                          <Button variant="secondary" icon="archive-restore" onClick={() => restoreTrashItem(item)}>Resgatar</Button>
                          <IconButton
                            label="Excluir definitivamente"
                            icon="x"
                            onClick={() => {
                              if (window.confirm("Excluir definitivamente este item da lixeira?")) {
                                deleteTrashItem(item);
                              }
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="Lixeira vazia" text="Quando você remover clientes, orçamentos, pedidos ou fornecedores, eles aparecerão aqui." />
        )}
      </article>
    </>
  );
}

function SettingsView({ users, currentUser, deleteUser, recreateTestUser }) {
  const isAdmin = currentUser?.role === "Administrador";
  const rules = [
    "Cliente não pode ser cadastrado sem telefone/WhatsApp.",
    "Pedido não pode ser criado sem cliente.",
    "Pedido calcula valor restante, lucro e margem automaticamente.",
    "Orçamento aprovado pode virar pedido automaticamente.",
    "Pagamento confirmado atualiza financeiro, dashboard, fluxo de caixa e histórico.",
    "Estoque abaixo do mínimo gera alerta no dashboard.",
    "Pedido atrasado é identificado pela data prevista de entrega.",
    "Pedido pronto abre WhatsApp com mensagem personalizada.",
    "Toda ação importante fica registrada no histórico do pedido.",
  ];
  const schema = ["clientes", "orcamentos", "pedidos", "itens_pedido", "estoque", "movimentacoes_estoque", "financeiro", "fornecedores", "funcionarios", "faltas_funcionarios", "vales_funcionarios", "usuarios", "historico_pedido", "lixeira"];

  return (
    <>
      <PageHeader title="Configurações" subtitle="Empresa, permissões, regras de negócio e base de dados" />
      <section className="dashboard-layout">
        <article className="panel">
          <div className="panel-title">
            <h2>Empresa</h2>
          </div>
          <dl className="data-list">
            <div><dt>Razão social</dt><dd>{COMPANY_INFO.legalName}</dd></div>
            <div><dt>Nome fantasia</dt><dd>{COMPANY_INFO.tradeName}</dd></div>
            <div><dt>CNPJ</dt><dd>{COMPANY_INFO.cnpj}</dd></div>
            <div><dt>Endereço</dt><dd>{COMPANY_INFO.address}</dd></div>
            <div><dt>Cidade</dt><dd>{COMPANY_INFO.city}</dd></div>
            <div><dt>CEP</dt><dd>{COMPANY_INFO.zip}</dd></div>
            <div><dt>Telefone</dt><dd>{COMPANY_INFO.phone}</dd></div>
            <div><dt>Atuação</dt><dd>Camisas, uniformes, brindes e promocionais</dd></div>
            <div><dt>Identidade</dt><dd>Preto grafite, branco e amarelo/dourado</dd></div>
            <div><dt>Moeda</dt><dd>Real brasileiro</dd></div>
          </dl>
        </article>
        <article className="panel">
          <div className="panel-title">
            <h2>Usuários e permissões</h2>
          </div>
          <div className="permission-list">
            {permissions.map((item) => (
              <div className="permission-row" key={item.role}>
                <strong>{item.role}</strong>
                <span>{item.access}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="panel-title">
            <h2>Usuários do sistema</h2>
            {isAdmin ? <Button variant="secondary" icon="user-plus" onClick={recreateTestUser}>Recriar teste</Button> : null}
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Perfil</th>
                  <th>Origem</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    <td>{item.createdAt}</td>
                    <td><StatusBadge>{item.protected ? "protegido" : "removível"}</StatusBadge></td>
                    <td>
                      {item.protected ? (
                        <span className="muted-text">Admin principal</span>
                      ) : (
                        <Button
                          variant="ghost"
                          icon="trash-2"
                          disabled={!isAdmin || currentUser?.id === item.id}
                          onClick={() => deleteUser(item)}
                        >
                          Excluir usuário
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="internal-note">Usuário de teste inicial: teste / teste123. Ele pode ser excluído pelo administrador nesta tabela.</p>
        </article>
        <article className="panel">
          <div className="panel-title">
            <h2>Regras de negócio</h2>
          </div>
          <ul className="rule-list">
            {rules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </article>
        <article className="panel">
          <div className="panel-title">
            <h2>PostgreSQL sugerido</h2>
          </div>
          <div className="schema-grid">
            {schema.map((table) => <span key={table}>{table}</span>)}
          </div>
        </article>
        <article className="panel">
          <div className="panel-title">
            <h2>Acesso de qualquer lugar</h2>
          </div>
          <p className="internal-note">
            Este MVP está pronto para publicação como site estático. Para dados sincronizados entre computadores e celular, o próximo passo é conectar um banco online e autenticação real.
          </p>
        </article>
      </section>
    </>
  );
}

function ClientForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    document: "",
    phone: "5522",
    email: "",
    address: "",
    type: "empresa",
    notes: "",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const phone = normalizePhone(form.phone);
    if (!phone) {
      setError("Telefone/WhatsApp é obrigatório.");
      return;
    }
    onSave({
      ...form,
      id: Date.now(),
      phone,
      createdAt: TODAY.toISOString().slice(0, 10),
      totalPurchased: 0,
      orderCount: 0,
      lastPurchase: TODAY.toISOString().slice(0, 10),
      status: "ativo",
    });
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Nome completo ou razão social<input value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
      <label>CPF ou CNPJ<input value={form.document} onChange={(event) => update("document", event.target.value)} /></label>
      <label>Telefone/WhatsApp<input value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></label>
      <label>E-mail<input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
      <label className="span-2">Endereço<input value={form.address} onChange={(event) => update("address", event.target.value)} /></label>
      <label>Tipo de cliente<select value={form.type} onChange={(event) => update("type", event.target.value)}>
        {["pessoa física", "empresa", "escola", "igreja", "evento", "loja", "revendedor", "outro"].map((type) => <option key={type}>{type}</option>)}
      </select></label>
      <label className="span-2">Observações internas<textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} /></label>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="form-actions span-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button icon="save">Salvar cliente</Button>
      </div>
    </form>
  );
}

function OrderForm({ clients, stock, onSave, onCancel, initialQuote }) {
  const [form, setForm] = useState({
    clientId: initialQuote?.clientId || clients[0]?.id || "",
    quoteNumber: initialQuote?.number || "",
    dueDate: initialQuote?.requestedDueDate || TODAY.toISOString().slice(0, 10),
    priority: "normal",
    product: initialQuote?.product || "Camisa personalizada",
    service: initialQuote?.service || "DTF",
    quantity: initialQuote?.quantity || 1,
    sizes: "A definir",
    colors: "A definir",
    description: initialQuote?.notes || "",
    total: initialQuote?.total || 0,
    deposit: 0,
    cost: initialQuote ? Math.round(initialQuote.total * 0.56) : 0,
    responsible: "Carol",
    stockItemId: "",
    stockQty: initialQuote?.quantity || 1,
  });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const total = parseCurrencyInput(form.total);
    const deposit = parseCurrencyInput(form.deposit);
    onSave({
      id: Date.now(),
      number: `AL-${Math.floor(1056 + Math.random() * 800)}`,
      clientId: Number(form.clientId),
      quoteNumber: form.quoteNumber,
      createdAt: TODAY.toISOString().slice(0, 10),
      dueDate: form.dueDate,
      priority: form.priority,
      product: form.product,
      service: form.service,
      quantity: Number(form.quantity),
      sizes: form.sizes,
      colors: form.colors,
      description: form.description,
      total,
      deposit,
      cost: parseCurrencyInput(form.cost),
      stockItemId: form.stockItemId ? Number(form.stockItemId) : "",
      stockQty: parseCurrencyInput(form.stockQty),
      stockItemName: stock.find((item) => item.id === Number(form.stockItemId))?.item || "",
      productionStatus: deposit > 0 ? "Arte em criação" : "Aguardando pagamento",
      financialStatus: deposit > 0 ? "Entrada recebida" : "Não pago",
      responsible: form.responsible,
      attachments: [],
      history: [{ at: dateTimeNowLabel(), text: "Pedido criado." }],
    });
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Cliente<select value={form.clientId} onChange={(event) => update("clientId", event.target.value)} required>
        {clients.map((client) => <option value={client.id} key={client.id}>{client.name}</option>)}
      </select></label>
      <label>Orçamento vinculado<input value={form.quoteNumber} onChange={(event) => update("quoteNumber", event.target.value)} /></label>
      <label>Data prevista<input type="date" value={form.dueDate} onChange={(event) => update("dueDate", event.target.value)} /></label>
      <label>Prioridade<select value={form.priority} onChange={(event) => update("priority", event.target.value)}>
        {["baixa", "normal", "alta", "urgente"].map((value) => <option key={value}>{value}</option>)}
      </select></label>
      <label>Produto<select value={form.product} onChange={(event) => update("product", event.target.value)}>
        {PRODUCTS.map((value) => <option key={value}>{value}</option>)}
      </select></label>
      <label>Tipo de serviço<select value={form.service} onChange={(event) => update("service", event.target.value)}>
        {SERVICES.map((value) => <option key={value}>{value}</option>)}
      </select></label>
      <label>Quantidade<input type="number" value={form.quantity} onChange={(event) => update("quantity", event.target.value)} min="1" /></label>
      <label>Material do estoque<select value={form.stockItemId} onChange={(event) => update("stockItemId", event.target.value)}>
        <option value="">Não baixar estoque agora</option>
        {stock.map((item) => <option value={item.id} key={item.id}>{item.item} ({item.qty} {item.unit})</option>)}
      </select></label>
      <label>Quantidade a baixar<input type="number" value={form.stockQty} onChange={(event) => update("stockQty", event.target.value)} min="0" step="0.01" /></label>
      <label>Tamanhos<input value={form.sizes} onChange={(event) => update("sizes", event.target.value)} /></label>
      <label>Cores<input value={form.colors} onChange={(event) => update("colors", event.target.value)} /></label>
      <label>Valor total<input value={form.total} onChange={(event) => update("total", event.target.value)} /></label>
      <label>Valor de entrada<input value={form.deposit} onChange={(event) => update("deposit", event.target.value)} /></label>
      <label>Custo estimado<input value={form.cost} onChange={(event) => update("cost", event.target.value)} /></label>
      <label>Responsável<input value={form.responsible} onChange={(event) => update("responsible", event.target.value)} /></label>
      <label className="span-2">Descrição detalhada<textarea value={form.description} onChange={(event) => update("description", event.target.value)} /></label>
      <div className="form-actions span-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button icon="save">Salvar pedido</Button>
      </div>
    </form>
  );
}

function QuoteForm({ clients, onSave, onCancel }) {
  const [form, setForm] = useState({
    clientId: clients[0]?.id || "",
    product: "Camisa personalizada",
    service: "DTF",
    quantity: 50,
    requestedDueDate: TODAY.toISOString().slice(0, 10),
    unitValue: 55,
    discount: 0,
    payment: "50% de entrada e saldo na entrega",
    validUntil: TODAY.toISOString().slice(0, 10),
    notes: "",
  });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const total = Number(form.quantity) * parseCurrencyInput(form.unitValue) - parseCurrencyInput(form.discount);
    onSave({
      ...form,
      id: Date.now(),
      number: `ORC-2026-${Math.floor(26 + Math.random() * 700)}`,
      clientId: Number(form.clientId),
      unitValue: parseCurrencyInput(form.unitValue),
      discount: parseCurrencyInput(form.discount),
      quantity: Number(form.quantity),
      total,
      status: "Em criação",
      attachments: [],
    });
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Cliente<select value={form.clientId} onChange={(event) => update("clientId", event.target.value)}>
        {clients.map((client) => <option value={client.id} key={client.id}>{client.name}</option>)}
      </select></label>
      <label>Produto<select value={form.product} onChange={(event) => update("product", event.target.value)}>
        {PRODUCTS.map((value) => <option key={value}>{value}</option>)}
      </select></label>
      <label>Serviço<select value={form.service} onChange={(event) => update("service", event.target.value)}>
        {SERVICES.map((value) => <option key={value}>{value}</option>)}
      </select></label>
      <label>Quantidade<input type="number" value={form.quantity} onChange={(event) => update("quantity", event.target.value)} /></label>
      <label>Prazo solicitado<input type="date" value={form.requestedDueDate} onChange={(event) => update("requestedDueDate", event.target.value)} /></label>
      <label>Valor unitário<input value={form.unitValue} onChange={(event) => update("unitValue", event.target.value)} /></label>
      <label>Desconto<input value={form.discount} onChange={(event) => update("discount", event.target.value)} /></label>
      <label>Validade<input type="date" value={form.validUntil} onChange={(event) => update("validUntil", event.target.value)} /></label>
      <label className="span-2">Forma de pagamento<input value={form.payment} onChange={(event) => update("payment", event.target.value)} /></label>
      <label className="span-2">Observações<textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} /></label>
      <div className="form-actions span-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button icon="save">Salvar orçamento</Button>
      </div>
    </form>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [periodMode, setPeriodMode] = useState("geral");
  const [customStart, setCustomStart] = useState(isoDate(new Date()));
  const [customEnd, setCustomEnd] = useState(isoDate(new Date()));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clients, setClients] = useStoredState("alm_prod_clients", []);
  const [orders, setOrders] = useStoredState("alm_prod_orders", []);
  const [quotes, setQuotes] = useStoredState("alm_prod_quotes", []);
  const [artworks, setArtworks] = useStoredState("alm_prod_artworks", []);
  const [stock, setStock] = useStoredState("alm_prod_stock", []);
  const [transactions, setTransactions] = useStoredState("alm_prod_transactions", []);
  const [suppliers, setSuppliers] = useStoredState("alm_prod_suppliers", []);
  const [reminders, setReminders] = useStoredState("alm_prod_reminders", []);
  const [employees, setEmployees] = useStoredState("alm_prod_employees", initialEmployees);
  const [employeeAbsences, setEmployeeAbsences] = useStoredState("alm_prod_employee_absences", initialEmployeeAbsences);
  const [employeeAdvances, setEmployeeAdvances] = useStoredState("alm_prod_employee_advances", initialEmployeeAdvances);
  const [trashItems, setTrashItems] = useStoredState("alm_prod_trash", []);
  const [users, setUsers] = useStoredState("alm_prod_users", initialUsers);
  const [modal, setModal] = useState(null);
  const [readyOrder, setReadyOrder] = useState(null);
  const [toast, setToast] = useState("");
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  });

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    const today = new Date().toISOString().slice(0, 10);
    const pendingToday = reminders
      .filter((item) => item.date === today && item.status !== "concluído")
      .sort((a, b) => `${a.time}`.localeCompare(`${b.time}`));
    const sessionVoiceKey = `alm_voice_open_${today}`;
    if (window.sessionStorage.getItem(sessionVoiceKey) !== "done") {
      const intro = pendingToday.length
        ? `Bom dia. Você tem ${pendingToday.length} lembrete${pendingToday.length > 1 ? "s" : ""} para hoje. ${pendingToday
            .map((item) => `${timeLabel(item.time)}: ${item.title}`)
            .join(". ")}.`
        : "Bom dia. Você não tem lembretes pendentes para hoje.";
      window.setTimeout(() => speak(intro), 700);
      window.sessionStorage.setItem(sessionVoiceKey, "done");
    }

    const interval = window.setInterval(() => {
      const now = new Date();
      const dateKey = now.toISOString().slice(0, 10);
      const storageKey = `alm_voice_close_${dateKey}`;
      if (now.getHours() === 17 && now.getMinutes() === 0 && window.localStorage.getItem(storageKey) !== "done") {
        const stillPending = reminders.filter((item) => item.date === dateKey && item.status !== "concluído");
        const message = stillPending.length
          ? `São 17 horas. Confira se tudo foi executado. Ainda existem ${stillPending.length} lembrete${stillPending.length > 1 ? "s" : ""} pendente${stillPending.length > 1 ? "s" : ""} para hoje.`
          : "São 17 horas. Confira se todas as atividades do dia foram executadas.";
        speak(message);
        window.localStorage.setItem(storageKey, "done");
      }
    }, 30000);

    return () => window.clearInterval(interval);
  }, [isAuthenticated, reminders]);

  function showToast(message) {
    setToast(message);
  }

  function deleteUser(userItem) {
    if (userItem.protected) {
      showToast("O administrador principal não pode ser excluído.");
      return;
    }
    if (user?.id === userItem.id) {
      showToast("Você não pode excluir o usuário que está logado.");
      return;
    }
    if (!window.confirm(`Excluir o usuário ${userItem.username}?`)) return;
    setUsers((items) => items.filter((item) => item.id !== userItem.id));
    showToast(`Usuário ${userItem.username} excluído.`);
  }

  function recreateTestUser() {
    setUsers((items) => {
      if (items.some((item) => item.id === "teste" || item.username === "teste")) return items;
      return [...items, initialUsers.find((item) => item.id === "teste")];
    });
    showToast("Usuário de teste disponível: teste / teste123.");
  }

  function clientForId(id) {
    return clients.find((client) => client.id === Number(id));
  }

  function openModal(type, payload = null) {
    setModal({ type, payload });
  }

  function closeModal() {
    setModal(null);
  }

  function trashTitle(collection, item) {
    if (collection === "clients") return item.name;
    if (collection === "quotes") return item.number;
    if (collection === "orders") return item.number;
    if (collection === "suppliers") return item.name;
    if (collection === "reminders") return item.title;
    return item.name || item.title || item.number || "Registro";
  }

  function moveToTrash(collection, item) {
    const related = {};
    const trashRecord = {
      trashId: `${collection}-${item.id}-${Date.now()}`,
      collection,
      title: trashTitle(collection, item),
      data: item,
      related,
      deletedAt: dateTimeNowLabel(),
    };

    if (collection === "clients") {
      const relatedOrders = orders.filter((order) => order.clientId === item.id);
      const relatedQuotes = quotes.filter((quote) => quote.clientId === item.id);
      const orderNumbers = new Set(relatedOrders.map((order) => order.number));
      related.orders = relatedOrders;
      related.quotes = relatedQuotes;
      related.transactions = transactions.filter((transaction) => orderNumbers.has(transaction.orderNumber));
      related.artworks = artworks.filter((art) => art.clientId === item.id || orderNumbers.has(art.orderNumber));

      setClients((rows) => rows.filter((row) => row.id !== item.id));
      setOrders((rows) => rows.filter((row) => row.clientId !== item.id));
      setQuotes((rows) => rows.filter((row) => row.clientId !== item.id));
      setTransactions((rows) => rows.filter((row) => !orderNumbers.has(row.orderNumber)));
      setArtworks((rows) => rows.filter((row) => row.clientId !== item.id && !orderNumbers.has(row.orderNumber)));
    }

    if (collection === "orders") {
      related.transactions = transactions.filter((transaction) => transaction.orderNumber === item.number);
      related.artworks = artworks.filter((art) => art.orderNumber === item.number);
      setOrders((rows) => rows.filter((row) => row.id !== item.id));
      setTransactions((rows) => rows.filter((row) => row.orderNumber !== item.number));
      setArtworks((rows) => rows.filter((row) => row.orderNumber !== item.number));
    }

    if (collection === "quotes") {
      setQuotes((rows) => rows.filter((row) => row.id !== item.id));
    }

    if (collection === "suppliers") {
      related.transactions = transactions.filter((transaction) => transaction.category === "Fornecedor" && transaction.description.includes(item.name));
      setSuppliers((rows) => rows.filter((row) => row.id !== item.id));
      setTransactions((rows) => rows.filter((row) => !(row.category === "Fornecedor" && row.description.includes(item.name))));
    }

    if (collection === "reminders") {
      setReminders((rows) => rows.filter((row) => row.id !== item.id));
    }

    setTrashItems((rows) => [trashRecord, ...rows]);
    showToast(`${trashRecord.title} enviado para a lixeira.`);
  }

  function restoreUnique(setter, restoredRows) {
    if (!restoredRows?.length) return;
    setter((rows) => {
      const existing = new Set(rows.map((row) => row.id));
      return [...restoredRows.filter((row) => !existing.has(row.id)), ...rows];
    });
  }

  function restoreTrashItem(item) {
    if (item.collection === "clients") {
      restoreUnique(setClients, [item.data]);
      restoreUnique(setOrders, item.related?.orders || []);
      restoreUnique(setQuotes, item.related?.quotes || []);
      restoreUnique(setTransactions, item.related?.transactions || []);
      restoreUnique(setArtworks, item.related?.artworks || []);
    }

    if (item.collection === "orders") {
      restoreUnique(setOrders, [item.data]);
      restoreUnique(setTransactions, item.related?.transactions || []);
      restoreUnique(setArtworks, item.related?.artworks || []);
    }

    if (item.collection === "quotes") restoreUnique(setQuotes, [item.data]);
    if (item.collection === "suppliers") {
      restoreUnique(setSuppliers, [item.data]);
      restoreUnique(setTransactions, item.related?.transactions || []);
    }
    if (item.collection === "reminders") restoreUnique(setReminders, [item.data]);

    setTrashItems((rows) => rows.filter((row) => row.trashId !== item.trashId));
    showToast(`${item.title} resgatado da lixeira.`);
  }

  function deleteTrashItem(item) {
    setTrashItems((rows) => rows.filter((row) => row.trashId !== item.trashId));
    showToast(`${item.title} excluído definitivamente da lixeira.`);
  }

  function exportExcel(filename, rows) {
    if (!window.XLSX) {
      window.alert("Biblioteca XLSX não carregada.");
      return;
    }
    const worksheet = window.XLSX.utils.json_to_sheet(rows);
    const workbook = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
    window.XLSX.writeFile(workbook, `${filename}.xlsx`);
    showToast(`Exportação Excel gerada: ${filename}.xlsx`);
  }

  function exportPDF(title, rows, columns) {
    if (!window.jspdf) {
      window.alert("Biblioteca jsPDF não carregada.");
      return;
    }
    const doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 52;
    doc.setFillColor(23, 23, 23);
    doc.rect(0, 0, pageWidth, 84, "F");
    doc.setTextColor(215, 169, 0);
    doc.setFontSize(18);
    doc.text("Artes Lion Estamparia", 40, 38);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text(title, 40, 60);
    doc.setTextColor(23, 23, 23);
    doc.setFontSize(10);
    y = 110;
    rows.forEach((row, index) => {
      if (y > 760) {
        doc.addPage();
        y = 48;
      }
      const line = columns.map((column) => `${column}: ${row[column] ?? "-"}`).join("  |  ");
      doc.text(String(index + 1).padStart(2, "0") + ". " + line.slice(0, 130), 40, y);
      y += 18;
    });
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Documento gerado pelo Artes Lion Manager.", 40, 810);
    doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    showToast(`PDF gerado: ${title}.`);
  }

  function exportDashboardPDF() {
    const rows = [
      { indicador: "Pedidos", valor: orders.length },
      { indicador: "Clientes", valor: clients.length },
      { indicador: "Valor a receber", valor: BRL.format(orders.reduce((sum, order) => sum + remaining(order), 0)) },
      { indicador: "Estoque crítico", valor: stock.filter((item) => item.qty <= item.min).length },
      { indicador: "Pedidos atrasados", valor: orders.filter(isOverdue).length },
    ];
    exportPDF("Dashboard gerencial", rows, ["indicador", "valor"]);
  }

  function exportOrderPDF(order) {
    const client = clientForId(order.clientId);
    exportPDF(`Pedido ${order.number}`, [
      {
        pedido: order.number,
        cliente: client?.name,
        produto: order.product,
        servico: order.service,
        quantidade: order.quantity,
        total: BRL.format(order.total),
        entrada: BRL.format(order.deposit),
        restante: BRL.format(remaining(order)),
        entrega: dateLabel(order.dueDate),
        producao: order.productionStatus,
        financeiro: order.financialStatus,
      },
    ], ["pedido", "cliente", "produto", "servico", "quantidade", "total", "entrada", "restante", "entrega", "producao", "financeiro"]);
  }

  function exportFiscalCoupon(order) {
    if (!window.jspdf) {
      window.alert("Biblioteca jsPDF não carregada.");
      return;
    }
    const client = clientForId(order.clientId);
    const doc = new window.jspdf.jsPDF({ unit: "pt", format: [226, 620] });
    let y = 24;
    const center = 113;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(COMPANY_INFO.legalName, center, y, { align: "center" });
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    [COMPANY_INFO.address, `${COMPANY_INFO.zip} ${COMPANY_INFO.city}`, `Fone: ${COMPANY_INFO.phone}`, `CNPJ: ${COMPANY_INFO.cnpj}`].forEach((line) => {
      doc.text(line, center, y, { align: "center" });
      y += 11;
    });

    y += 8;
    doc.line(12, y, 214, y);
    y += 16;
    doc.setFont("helvetica", "bold");
    doc.text("CUPOM FISCAL / RECIBO GERENCIAL", center, y, { align: "center" });
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.text(`Pedido: ${order.number}`, 12, y);
    y += 12;
    doc.text(`Data: ${dateLabel(new Date().toISOString().slice(0, 10))}`, 12, y);
    y += 12;
    doc.text(`Cliente: ${client?.name || "-"}`.slice(0, 42), 12, y);
    y += 12;
    doc.text(`CPF/CNPJ: ${client?.document || "-"}`.slice(0, 42), 12, y);
    y += 14;
    doc.line(12, y, 214, y);
    y += 16;
    doc.setFont("helvetica", "bold");
    doc.text("Item", 12, y);
    doc.text("Qtd", 130, y);
    doc.text("Total", 174, y);
    y += 12;
    doc.setFont("helvetica", "normal");
    const itemLines = doc.splitTextToSize(`${order.product} - ${order.service}`, 112);
    doc.text(itemLines, 12, y);
    doc.text(String(order.quantity), 132, y);
    doc.text(BRL.format(order.total), 174, y, { align: "left" });
    y += itemLines.length * 10 + 14;
    doc.line(12, y, 214, y);
    y += 16;
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: ${BRL.format(order.total)}`, 12, y);
    y += 13;
    doc.text(`RECEBIDO: ${BRL.format(order.deposit)}`, 12, y);
    y += 13;
    doc.text(`SALDO: ${BRL.format(remaining(order))}`, 12, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(doc.splitTextToSize("Documento gerencial emitido pelo Artes Lion Manager. Para validade fiscal oficial, integrar com emissor NFC-e/SAT autorizado e certificado digital.", 196), 12, y);
    y += 36;
    doc.text("Obrigado pela preferência!", center, y, { align: "center" });
    doc.save(`cupom-${order.number}.pdf`);
    showToast(`Cupom fiscal gerencial do pedido ${order.number} gerado.`);
  }

  function exportQuotePDF(quote) {
    if (!window.jspdf) {
      window.alert("Biblioteca jsPDF não carregada.");
      return;
    }
    const client = clientForId(quote.clientId);
    const doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
    const page = { width: doc.internal.pageSize.getWidth(), height: doc.internal.pageSize.getHeight(), margin: 40 };
    const gold = [215, 169, 0];
    const graphite = [23, 23, 23];
    const muted = [98, 105, 116];
    const line = [221, 225, 231];
    let y = 42;

    const quoteItems = Array.isArray(quote.items) && quote.items.length
      ? quote.items
      : [
          {
            description: quote.product || "Item orçado",
            service: quote.service || "-",
            quantity: quote.quantity || 1,
            unitValue: quote.unitValue || 0,
            discount: quote.discount || 0,
            total: quote.total || (Number(quote.quantity || 1) * Number(quote.unitValue || 0) - Number(quote.discount || 0)),
          },
        ];
    const subtotal = quoteItems.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitValue || 0), 0);
    const discount = Number(quote.discount || quoteItems.reduce((sum, item) => sum + Number(item.discount || 0), 0));
    const total = Number(quote.total || subtotal - discount);

    function safeText(value) {
      return String(value ?? "-");
    }

    function addFooter() {
      doc.setDrawColor(...line);
      doc.line(page.margin, page.height - 48, page.width - page.margin, page.height - 48);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...muted);
      doc.text(`${COMPANY_INFO.legalName} · CNPJ ${COMPANY_INFO.cnpj}`, page.margin, page.height - 30);
      doc.text("Documento gerado pelo Artes Lion Manager", page.width - page.margin, page.height - 30, { align: "right" });
    }

    function checkPage(space = 80) {
      if (y + space <= page.height - 64) return;
      addFooter();
      doc.addPage();
      y = 44;
    }

    function sectionTitle(title) {
      checkPage(48);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...graphite);
      doc.text(title.toUpperCase(), page.margin, y);
      doc.setDrawColor(...gold);
      doc.setLineWidth(2);
      doc.line(page.margin, y + 7, page.margin + 78, y + 7);
      y += 24;
    }

    function keyValue(label, value, x, width) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...muted);
      doc.text(label.toUpperCase(), x, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...graphite);
      const lines = doc.splitTextToSize(safeText(value), width);
      doc.text(lines, x, y + 14);
      return 18 + lines.length * 12;
    }

    doc.setFillColor(...graphite);
    doc.rect(0, 0, page.width, 116, "F");
    doc.setFillColor(...gold);
    doc.roundedRect(page.margin, 30, 54, 54, 8, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...graphite);
    doc.text("AL", page.margin + 27, 64, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Proposta Comercial", page.margin + 72, 48);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(COMPANY_INFO.tradeName, page.margin + 72, 66);
    doc.text(`${COMPANY_INFO.address} · ${COMPANY_INFO.city}`, page.margin + 72, 82);
    doc.text(`CNPJ ${COMPANY_INFO.cnpj} · ${COMPANY_INFO.phone}`, page.margin + 72, 98);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...gold);
    doc.text(safeText(quote.number), page.width - page.margin, 48, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text(`Emissão: ${dateLabel(new Date().toISOString().slice(0, 10))}`, page.width - page.margin, 68, { align: "right" });
    doc.text(`Validade: ${dateLabel(quote.validUntil)}`, page.width - page.margin, 84, { align: "right" });

    y = 148;
    sectionTitle("Dados do cliente");
    const leftX = page.margin;
    const rightX = page.width / 2 + 12;
    let leftHeight = keyValue("Cliente", client?.name || "Cliente não informado", leftX, 232);
    let rightHeight = keyValue("Telefone / WhatsApp", client?.phone || "-", rightX, 210);
    y += Math.max(leftHeight, rightHeight);
    leftHeight = keyValue("CPF / CNPJ", client?.document || "-", leftX, 232);
    rightHeight = keyValue("E-mail", client?.email || "-", rightX, 210);
    y += Math.max(leftHeight, rightHeight);
    const addressHeight = keyValue("Endereço", client?.address || "-", leftX, page.width - page.margin * 2);
    y += addressHeight + 4;

    sectionTitle("Itens orçados");
    const tableX = page.margin;
    const tableW = page.width - page.margin * 2;
    const cols = {
      item: tableX + 12,
      service: tableX + 244,
      qty: tableX + 340,
      unit: tableX + 386,
      total: tableX + 470,
    };

    function tableHeader() {
      doc.setFillColor(248, 249, 250);
      doc.setDrawColor(...line);
      doc.rect(tableX, y, tableW, 28, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...muted);
      doc.text("ITEM", cols.item, y + 18);
      doc.text("SERVIÇO", cols.service, y + 18);
      doc.text("QTD", cols.qty, y + 18);
      doc.text("UNITÁRIO", cols.unit, y + 18);
      doc.text("TOTAL", cols.total, y + 18);
      y += 28;
    }

    tableHeader();
    quoteItems.forEach((item, index) => {
      const description = `${index + 1}. ${safeText(item.description || item.product || quote.product)}`;
      const itemLines = doc.splitTextToSize(description, 216);
      const serviceLines = doc.splitTextToSize(safeText(item.service || quote.service), 82);
      const rowHeight = Math.max(36, 14 + Math.max(itemLines.length, serviceLines.length) * 12);
      checkPage(rowHeight + 28);
      if (y < 80) tableHeader();
      doc.setDrawColor(...line);
      doc.rect(tableX, y, tableW, rowHeight);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...graphite);
      doc.text(itemLines, cols.item, y + 16);
      doc.text(serviceLines, cols.service, y + 16);
      doc.text(safeText(item.quantity || 0), cols.qty, y + 16);
      doc.text(BRL.format(Number(item.unitValue || 0)), cols.unit, y + 16);
      doc.text(BRL.format(Number(item.total || Number(item.quantity || 0) * Number(item.unitValue || 0))), cols.total, y + 16);
      y += rowHeight;
    });

    y += 20;
    checkPage(130);
    doc.setFillColor(255, 249, 219);
    doc.setDrawColor(255, 236, 153);
    doc.roundedRect(page.width - 238, y, 198, 96, 8, 8, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text("Subtotal", page.width - 218, y + 24);
    doc.text(BRL.format(subtotal), page.width - 58, y + 24, { align: "right" });
    doc.text("Desconto", page.width - 218, y + 45);
    doc.text(BRL.format(discount), page.width - 58, y + 45, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...graphite);
    doc.text("Total", page.width - 218, y + 73);
    doc.text(BRL.format(total), page.width - 58, y + 73, { align: "right" });
    y += 122;

    sectionTitle("Condições comerciais");
    leftHeight = keyValue("Prazo solicitado", dateLabel(quote.requestedDueDate), leftX, 232);
    rightHeight = keyValue("Forma de pagamento", quote.payment || "-", rightX, 210);
    y += Math.max(leftHeight, rightHeight);
    leftHeight = keyValue("Status do orçamento", quote.status || "-", leftX, 232);
    rightHeight = keyValue("Validade da proposta", dateLabel(quote.validUntil), rightX, 210);
    y += Math.max(leftHeight, rightHeight) + 4;

    if (quote.notes) {
      sectionTitle("Observações");
      const notes = doc.splitTextToSize(quote.notes, page.width - page.margin * 2);
      checkPage(notes.length * 12 + 24);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...graphite);
      doc.text(notes, page.margin, y);
      y += notes.length * 12 + 12;
    }

    if (quote.attachments?.length) {
      sectionTitle("Referências e anexos");
      const attachmentText = quote.attachments.join(", ");
      const attachmentLines = doc.splitTextToSize(attachmentText, page.width - page.margin * 2);
      checkPage(attachmentLines.length * 12 + 20);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...graphite);
      doc.text(attachmentLines, page.margin, y);
      y += attachmentLines.length * 12 + 10;
    }

    checkPage(70);
    doc.setDrawColor(...line);
    doc.line(page.margin, y + 22, page.margin + 190, y + 22);
    doc.line(page.width - page.margin - 190, y + 22, page.width - page.margin, y + 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text("Artes Lion Estamparia", page.margin + 95, y + 38, { align: "center" });
    doc.text("Cliente / responsável", page.width - page.margin - 95, y + 38, { align: "center" });

    addFooter();
    doc.save(`orcamento-${quote.number}.pdf`);
    showToast(`Orçamento ${quote.number} gerado em PDF profissional.`);
  }

  function saveClient(client) {
    setClients((items) => [client, ...items]);
    setSelectedClientId(client.id);
    closeModal();
    showToast("Cliente cadastrado com WhatsApp normalizado.");
  }

  function saveOrder(order) {
    let finalOrder = order;
    const stockQty = Number(order.stockQty || 0);
    if (stockQty > 0 && !order.stockItemId) {
      window.alert("Selecione o material do estoque para fazer a baixa automatica.");
      return;
    }
    if (order.stockItemId && stockQty <= 0) {
      window.alert("Informe uma quantidade maior que zero para baixar do estoque.");
      return;
    }
    if (order.stockItemId) {
      const stockItem = stock.find((item) => item.id === Number(order.stockItemId));
      if (!stockItem) {
        window.alert("Material de estoque não encontrado. Atualize o pedido e tente novamente.");
        return;
      }
      if (stockQty > Number(stockItem.qty || 0)) {
        window.alert(`Estoque insuficiente para ${stockItem.item}. Disponível: ${stockItem.qty} ${stockItem.unit}.`);
        return;
      }
    }
    if (order.stockItemId && stockQty > 0) {
      finalOrder = {
        ...order,
        history: [
          { at: dateTimeNowLabel(), text: `Baixa automática no estoque: ${stockQty} de ${order.stockItemName}.` },
          ...(order.history || []),
        ],
      };
      setStock((items) =>
        items.map((item) =>
          item.id === Number(order.stockItemId)
            ? { ...item, qty: Math.max(0, Number(item.qty || 0) - stockQty) }
            : item
        )
      );
    }
    setOrders((items) => [finalOrder, ...items]);
    setSelectedOrderId(finalOrder.id);
    if (order.deposit > 0) {
      setTransactions((items) => [
        {
          id: Date.now() + 1,
          date: TODAY.toISOString().slice(0, 10),
          description: `Entrada ${order.number}`,
          category: "Pedidos",
          type: "receita",
          amount: order.deposit,
          status: "recebido",
          orderNumber: order.number,
        },
        ...items,
      ]);
    }
    closeModal();
    showToast(order.stockItemId ? `Pedido ${order.number} criado e estoque baixado.` : `Pedido ${order.number} criado.`);
  }

  function saveQuote(quote) {
    setQuotes((items) => [quote, ...items]);
    closeModal();
    showToast(`Orçamento ${quote.number} criado.`);
  }

  function createOrderFromQuote(quote) {
    openModal("order", { quote });
  }

  function registerPayment(order) {
    const pending = remaining(order);
    if (pending <= 0) {
      showToast("Pedido já está quitado.");
      return;
    }
    const raw = window.prompt(`Valor recebido para ${order.number}:`, pending.toFixed(2).replace(".", ","));
    const amount = Math.min(parseCurrencyInput(raw), pending);
    if (!amount) return;
    setOrders((items) =>
      items.map((item) => {
        if (item.id !== order.id) return item;
        const newDeposit = item.deposit + amount;
        const paid = newDeposit >= item.total;
        return addHistory(
          {
            ...item,
            deposit: newDeposit,
            financialStatus: paid ? "Pago integralmente" : "Parcialmente pago",
          },
          `Pagamento registrado: ${BRL.format(amount)}.`
        );
      })
    );
    setTransactions((items) => [
      {
        id: Date.now(),
        date: TODAY.toISOString().slice(0, 10),
        description: `Pagamento ${order.number}`,
        category: "Pedidos",
        type: "receita",
        amount,
        status: "recebido",
        orderNumber: order.number,
      },
      ...items,
    ]);
    showToast("Pagamento registrado e indicadores atualizados.");
  }

  function buildWhatsAppMessage(client, template, order) {
    const firstName = client?.name?.split(" ")[0] || "cliente";
    const orderLabel = order ? ` ${order.number}` : "";
    const orderContext = order ? ` do pedido ${order.number}` : "";
    const pendingText = order && remaining(order) > 0 ? ` Saldo pendente: ${BRL.format(remaining(order))}.` : "";
    const messages = {
      "Envio de orçamento": `Olá, ${firstName}! Aqui é da Artes Lion Estamparia. Estamos enviando seu orçamento para conferência. Qualquer ajuste, é só nos chamar.`,
      "Pedido criado": `Olá, ${firstName}! Seu pedido${orderLabel} foi criado na Artes Lion Estamparia. Vamos acompanhar tudo por aqui e te avisar a cada etapa.`,
      "Solicitação de aprovação de arte": `Olá, ${firstName}! A arte${orderContext} está pronta para aprovação. Pode conferir e nos responder se está aprovada?`,
      "Pedido pronto": `Olá, ${firstName}! Seu pedido${orderLabel} está pronto para retirada/entrega.${pendingText} Obrigado por escolher a Artes Lion Estamparia!`,
      "Lembrete de pagamento": `Olá, ${firstName}! Passando para lembrar sobre o pagamento pendente${orderContext}.${pendingText} Podemos te enviar a chave Pix se preferir.`,
      "Pós-venda": `Olá, ${firstName}! Queremos saber se ficou tudo certo com seu pedido. Sua opinião ajuda a Artes Lion Estamparia a melhorar sempre.`,
    };
    return messages[template] || messages["Pós-venda"];
  }

  function openWhatsAppTemplate(client, template, order = null) {
    if (!client?.phone) {
      window.alert("Cliente sem telefone/WhatsApp cadastrado.");
      return;
    }
    const link = whatsappLink(client.phone, buildWhatsAppMessage(client, template, order));
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function handleOrderReady(order) {
    const client = clientForId(order.clientId);
    if (!client?.phone) {
      window.alert("Cliente sem telefone/WhatsApp cadastrado.");
      return;
    }
    const message = buildWhatsAppMessage(client, "Pedido pronto", order);
    setReadyOrder({ orderId: order.id, client, message, pending: remaining(order) });
  }

  function confirmReadyWhatsApp() {
    const order = orders.find((item) => item.id === readyOrder.orderId);
    if (!order) return;
    window.open(whatsappLink(readyOrder.client.phone, readyOrder.message), "_blank", "noopener,noreferrer");
    setOrders((items) =>
      items.map((item) =>
        item.id === order.id
          ? addHistory(
              {
                ...item,
                productionStatus: "Pronto para retirada/entrega",
                financialStatus: readyOrder.pending <= 0 ? "Pago integralmente" : item.financialStatus,
              },
              "Botão Pedido pronto acionado; WhatsApp aberto para o cliente."
            )
          : item
      )
    );
    setReadyOrder(null);
    showToast("Pedido atualizado para pronto e WhatsApp aberto.");
  }

  const periodRange = getPeriodRange(periodMode, customStart, customEnd);
  const periodOrders = orders.filter((order) => isWithinPeriod(order.createdAt || order.dueDate, periodRange));
  const periodQuotes = quotes.filter((quote) => isWithinPeriod(quote.createdAt || quote.requestedDueDate || quote.validUntil, periodRange));
  const periodTransactions = transactions.filter((transaction) => isWithinPeriod(transaction.date, periodRange));
  const periodReminders = reminders.filter((reminder) => isWithinPeriod(reminder.date, periodRange));
  const periodEmployeeAbsences = employeeAbsences.filter((absence) => isWithinPeriod(absence.date, periodRange));
  const periodEmployeeAdvances = employeeAdvances.filter((advance) => isWithinPeriod(advance.date, periodRange));

  const activeLabel = MENU.find((item) => item.id === activeModule)?.label || "Dashboard";

  if (!isAuthenticated) {
    return (
      <Login
        users={users}
        onLogin={(payload) => {
          setUser(payload);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">AL</div>
          <div>
            <strong>Artes Lion</strong>
            <span>Manager</span>
          </div>
          <IconButton label="Fechar menu" icon="x" className="mobile-only" onClick={() => setSidebarOpen(false)} />
        </div>
        <nav className="sidebar-nav">
          {MENU.map((item) => (
            <button
              key={item.id}
              className={activeModule === item.id ? "active" : ""}
              onClick={() => {
                setActiveModule(item.id);
                setSidebarOpen(false);
              }}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <IconButton label="Abrir menu" icon="menu" className="desktop-hidden" onClick={() => setSidebarOpen(true)} />
            <div>
              <strong>{activeLabel}</strong>
              <span>Hoje: {dateLabel(TODAY.toISOString().slice(0, 10))}</span>
            </div>
          </div>
          <div className="topbar-user">
            <div className="period-filter">
              <label>
                Período
                <select value={periodMode} onChange={(event) => setPeriodMode(event.target.value)}>
                  <option value="geral">Geral</option>
                  <option value="semana">Semana</option>
                  <option value="quinzena">Quinzena</option>
                  <option value="mes">Mês</option>
                  <option value="trimestre">Trimestre</option>
                  <option value="semestre">Semestre</option>
                  <option value="anual">Anual</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </label>
              {periodMode === "personalizado" ? (
                <>
                  <input type="date" value={customStart} onChange={(event) => setCustomStart(event.target.value)} />
                  <input type="date" value={customEnd} onChange={(event) => setCustomEnd(event.target.value)} />
                </>
              ) : null}
            </div>
            <span>{user?.role}</span>
            <div className="user-dot">{user?.email?.slice(0, 1).toUpperCase()}</div>
          </div>
        </header>

        <div className="content-area">
          {activeModule === "dashboard" && (
            <DashboardView
              clients={clients}
              orders={periodOrders}
              quotes={periodQuotes}
              artworks={artworks}
              stock={stock}
              transactions={periodTransactions}
              openModal={openModal}
              exportDashboardPDF={exportDashboardPDF}
              exportExcel={exportExcel}
            />
          )}
          {activeModule === "lembretes" && (
            <RemindersView reminders={reminders} setReminders={setReminders} moveToTrash={moveToTrash} showToast={showToast} />
          )}
          {activeModule === "clientes" && (
            <ClientsView
              clients={clients}
              orders={periodOrders}
              quotes={periodQuotes}
              artworks={artworks}
              selectedClientId={selectedClientId}
              setSelectedClientId={setSelectedClientId}
              openModal={openModal}
              exportExcel={exportExcel}
              exportPDF={exportPDF}
              openWhatsAppTemplate={openWhatsAppTemplate}
              moveToTrash={moveToTrash}
            />
          )}
          {activeModule === "orcamentos" && (
            <QuotesView
              quotes={periodQuotes}
              clients={clients}
              setQuotes={setQuotes}
              createOrderFromQuote={createOrderFromQuote}
              openModal={openModal}
              exportExcel={exportExcel}
              exportQuotePDF={exportQuotePDF}
              moveToTrash={moveToTrash}
              showToast={showToast}
            />
          )}
          {activeModule === "pedidos" && (
            <OrdersView
              orders={periodOrders}
              clients={clients}
              setOrders={setOrders}
              openModal={openModal}
              exportExcel={exportExcel}
              exportPDF={exportPDF}
              exportOrderPDF={exportOrderPDF}
              exportFiscalCoupon={exportFiscalCoupon}
              handleOrderReady={handleOrderReady}
              registerPayment={registerPayment}
              moveToTrash={moveToTrash}
              selectedOrderId={selectedOrderId}
              setSelectedOrderId={setSelectedOrderId}
            />
          )}
          {activeModule === "producao" && <ProductionView orders={periodOrders} clients={clients} setOrders={setOrders} />}
          {activeModule === "estoque" && <StockView stock={stock} setStock={setStock} exportExcel={exportExcel} exportPDF={exportPDF} showToast={showToast} />}
          {activeModule === "financeiro" && (
            <FinanceView transactions={periodTransactions} orders={periodOrders} clients={clients} exportExcel={exportExcel} exportPDF={exportPDF} registerPayment={registerPayment} />
          )}
          {activeModule === "fluxo" && <CashFlowView transactions={periodTransactions} orders={periodOrders} setTransactions={setTransactions} showToast={showToast} />}
          {activeModule === "produtos" && <ProductsView orders={periodOrders} />}
          {activeModule === "fornecedores" && (
            <SuppliersView suppliers={suppliers} setSuppliers={setSuppliers} stock={stock} setStock={setStock} transactions={transactions} setTransactions={setTransactions} moveToTrash={moveToTrash} showToast={showToast} />
          )}
          {activeModule === "funcionarios" && (
            <EmployeesView
              employees={employees}
              setEmployees={setEmployees}
              absences={employeeAbsences}
              setAbsences={setEmployeeAbsences}
              advances={employeeAdvances}
              setAdvances={setEmployeeAdvances}
              periodRange={periodRange}
              showToast={showToast}
            />
          )}
          {activeModule === "relatorios" && <ReportsView clients={clients} orders={periodOrders} stock={stock} transactions={periodTransactions} exportPDF={exportPDF} />}
          {activeModule === "exportacoes" && (
            <ExportsView clients={clients} quotes={periodQuotes} orders={periodOrders} stock={stock} transactions={periodTransactions} reminders={periodReminders} employees={employees} employeeAbsences={periodEmployeeAbsences} employeeAdvances={periodEmployeeAdvances} exportExcel={exportExcel} exportPDF={exportPDF} exportDashboardPDF={exportDashboardPDF} />
          )}
          {activeModule === "lixeira" && (
            <TrashView trashItems={trashItems} restoreTrashItem={restoreTrashItem} deleteTrashItem={deleteTrashItem} />
          )}
          {activeModule === "configuracoes" && (
            <SettingsView users={users} currentUser={user} deleteUser={deleteUser} recreateTestUser={recreateTestUser} />
          )}
        </div>
      </main>

      {modal?.type === "client" && (
        <Modal title="Cadastrar cliente" onClose={closeModal}>
          <ClientForm onSave={saveClient} onCancel={closeModal} />
        </Modal>
      )}
      {modal?.type === "order" && (
        <Modal title="Criar pedido" onClose={closeModal}>
          <OrderForm clients={clients} stock={stock} onSave={saveOrder} onCancel={closeModal} initialQuote={modal.payload?.quote} />
        </Modal>
      )}
      {modal?.type === "quote" && (
        <Modal title="Criar orçamento" onClose={closeModal}>
          <QuoteForm clients={clients} onSave={saveQuote} onCancel={closeModal} />
        </Modal>
      )}
      {readyOrder ? (
        <Modal
          title="Pedido pronto"
          onClose={() => setReadyOrder(null)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setReadyOrder(null)}>Cancelar</Button>
              <Button icon="message-circle" onClick={confirmReadyWhatsApp}>Abrir WhatsApp</Button>
            </>
          }
        >
          <div className="whatsapp-preview">
            <div>
              <strong>{readyOrder.client.name}</strong>
              <span>{readyOrder.client.phone}</span>
            </div>
            <p>{readyOrder.message}</p>
            <StatusBadge>{readyOrder.pending > 0 ? `saldo ${BRL.format(readyOrder.pending)}` : "sem cobrança"}</StatusBadge>
          </div>
        </Modal>
      ) : null}
      {toast ? <div className="toast">{toast}</div> : null}
      {sidebarOpen ? <div className="scrim" onClick={() => setSidebarOpen(false)} /> : null}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
