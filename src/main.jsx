import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const carrosIniciais = [
  {
    id: 1,
    modelo: 'Toyota Corolla',
    categoria: 'Sedan',
    ano: 2025,
    diaria: 189.90,
    status: 'Disponível',
    km: 12500,
  },
  {
    id: 2,
    modelo: 'Jeep Renegade',
    categoria: 'SUV',
    ano: 2024,
    diaria: 219.90,
    status: 'Disponível',
    km: 18700,
  },
  {
    id: 3,
    modelo: 'Fiat Argo',
    categoria: 'Econômico',
    ano: 2025,
    diaria: 129.90,
    status: 'Disponível',
    km: 8300,
  },
  {
    id: 4,
    modelo: 'Chevrolet Onix',
    categoria: 'Econômico',
    ano: 2023,
    diaria: 119.90,
    status: 'Alugado',
    km: 32100,
  },
  {
    id: 5,
    modelo: 'Honda HR-V',
    categoria: 'SUV',
    ano: 2024,
    diaria: 239.90,
    status: 'Manutenção',
    km: 27600,
  },
];

function App() {
  const [logado, setLogado] = useState(false);
  const [pagina, setPagina] = useState('veiculos');
  const [carros, setCarros] = useState(carrosIniciais);

  const [reservas, setReservas] = useState([
    {
      id: 'RES-001',
      cliente: 'Mariana Silva',
      carro: 'Toyota Corolla',
      inicio: '25/11/2026',
      fim: '28/11/2026',
      status: 'Confirmada',
    },
  ]);

  const [locacoes, setLocacoes] = useState([]);

  const [mensagem, setMensagem] = useState('');

  function entrar(e) {
    e.preventDefault();
    setLogado(true);
  }

  function sair() {
    setLogado(false);
    setPagina('veiculos');
  }

  function registrarRetirada(e) {
    e.preventDefault();

    const dados = new FormData(e.target);

    const id = `LOC-${String(locacoes.length + 1).padStart(3, '0')}`;

    const novaLocacao = {
      id,
      reserva: dados.get('reserva'),
      cliente: dados.get('cliente'),
      carro: dados.get('carro'),
      retirada: dados.get('retirada'),
      kmInicial: dados.get('kmInicial'),
      combustivelInicial: dados.get('combustivelInicial'),
      vistoriaInicial: dados.get('vistoriaInicial'),
      pagamento: dados.get('pagamento'),
      status: 'Em andamento',
    };

    setLocacoes([...locacoes, novaLocacao]);

    setCarros(
      carros.map((carro) =>
        carro.modelo === dados.get('carro')
          ? { ...carro, status: 'Alugado' }
          : carro
      )
    );

    setMensagem(`✓ Locação ${id} registrada com sucesso.`);
    setPagina('locacoes');
  }

  function registrarDevolucao(e) {
    e.preventDefault();

    const dados = new FormData(e.target);

    const idLocacao = dados.get('locacao');

    const locacao = locacoes.find(
      (item) => item.id === idLocacao
    );

    if (!locacao) {
      alert('Selecione uma locação.');
      return;
    }

    const kmFinal = Number(dados.get('kmFinal'));
    const diariaExtra = Number(dados.get('diariaExtra') || 0);
    const multas = Number(dados.get('multas') || 0);
    const avarias = Number(dados.get('avarias') || 0);

    const total = diariaExtra + multas + avarias;

    const novaLocacao = {
      ...locacao,
      status: 'Finalizada',
      devolucao: {
        kmFinal,
        combustivelFinal: dados.get('combustivelFinal'),
        vistoriaFinal: dados.get('vistoriaFinal'),
        diariaExtra,
        multas,
        avarias,
        total,
      },
    };

    setLocacoes(
      locacoes.map((item) =>
        item.id === idLocacao ? novaLocacao : item
      )
    );

    setCarros(
      carros.map((carro) =>
        carro.modelo === locacao.carro
          ? {
              ...carro,
              km: kmFinal,
              status:
                avarias > 0
                  ? 'Manutenção'
                  : 'Disponível',
            }
          : carro
      )
    );

    setMensagem(
      `✓ Devolução ${idLocacao} registrada. Total adicional: R$ ${total.toFixed(
        2
      )}.`
    );

    setPagina('devolucoes');
  }

  if (!logado) {
    return (
      <div className="app">
        <header>
          <h1>Sistema de Locação de Automóveis</h1>
        </header>

        <main className="container">
          <div className="card">
            <h2>Entrar no sistema</h2>

            <form onSubmit={entrar}>
              <label>
                Usuário
                <input
                  type="text"
                  placeholder="Digite seu usuário"
                  required
                />
              </label>

              <label>
                Senha
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  required
                />
              </label>

              <label>
                Perfil
                <select>
                  <option>Atendente / Funcionário</option>
                  <option>Cliente</option>
                </select>
              </label>

              <button className="primary">
                Entrar
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Sistema de Locação de Automóveis</h1>

        <button onClick={sair}>Sair</button>
      </header>

      <div className="layout">
        <aside>
          <button onClick={() => setPagina('dashboard')}>
            Dashboard
          </button>

          <button onClick={() => setPagina('veiculos')}>
            Consultar veículos
          </button>

          <button
            onClick={() => setPagina('gerenciar')}
          >
            Gerenciar veículos
          </button>

          <button onClick={() => setPagina('reservas')}>
            Reservas
          </button>

          <button onClick={() => setPagina('locacoes')}>
            Locações / Retiradas
          </button>

          <button
            onClick={() => setPagina('devolucoes')}
          >
            Devoluções
          </button>

          <button onClick={() => setPagina('clientes')}>
            Clientes
          </button>

          <button
            onClick={() => setPagina('pagamentos')}
          >
            Pagamentos
          </button>
        </aside>

        <main className="content">
          {mensagem && (
            <div className="success">
              {mensagem}

              <button
                onClick={() => setMensagem('')}
              >
                ×
              </button>
            </div>
          )}

          {pagina === 'dashboard' && (
            <Dashboard
              carros={carros}
              reservas={reservas}
              locacoes={locacoes}
            />
          )}

          {pagina === 'veiculos' && (
            <ConsultarVeiculos
              carros={carros}
            />
          )}

          {pagina === 'gerenciar' && (
            <GerenciarVeiculos
              carros={carros}
              setCarros={setCarros}
            />
          )}

          {pagina === 'reservas' && (
            <Reservas reservas={reservas} />
          )}

          {pagina === 'locacoes' && (
            <Locacoes
              locacoes={locacoes}
              setPagina={setPagina}
            />
          )}

          {pagina === 'nova-locacao' && (
            <NovaLocacao
              reservas={reservas}
              carros={carros}
              registrarRetirada={registrarRetirada}
            />
          )}

          {pagina === 'devolucoes' && (
            <Devolucoes
              locacoes={locacoes}
              registrarDevolucao={registrarDevolucao}
            />
          )}

          {pagina === 'clientes' && (
            <Clientes />
          )}

          {pagina === 'pagamentos' && (
            <Pagamentos />
          )}
        </main>
      </div>
    </div>
  );
}

function Dashboard({
  carros,
  reservas,
  locacoes,
}) {
  const disponiveis = carros.filter(
    (carro) => carro.status === 'Disponível'
  ).length;

  const andamento = locacoes.filter(
    (locacao) => locacao.status === 'Em andamento'
  ).length;

  return (
    <section>
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="stat">
          <strong>{carros.length}</strong>
          <span>Veículos</span>
        </div>

        <div className="stat">
          <strong>{disponiveis}</strong>
          <span>Disponíveis</span>
        </div>

        <div className="stat">
          <strong>{reservas.length}</strong>
          <span>Reservas</span>
        </div>

        <div className="stat">
          <strong>{andamento}</strong>
          <span>Locações em andamento</span>
        </div>
      </div>
    </section>
  );
}

function ConsultarVeiculos({ carros }) {
  return (
    <section>
      <h2>Consultar veículos</h2>

      <p>
        Consulte os veículos disponíveis para locação.
      </p>

      <div className="cars-grid">
        {carros.map((carro) => (
          <div className="card" key={carro.id}>
            <h3>{carro.modelo}</h3>

            <p>
              Categoria: {carro.categoria}
            </p>

            <p>
              Ano: {carro.ano}
            </p>

            <p>
              Diária: R$ {carro.diaria.toFixed(2)}
            </p>

            <p>
              KM: {carro.km}
            </p>

            <p>
              Status: <strong>{carro.status}</strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GerenciarVeiculos({
  carros,
  setCarros,
}) {
  function alterarStatus(id, status) {
    setCarros(
      carros.map((carro) =>
        carro.id === id
          ? { ...carro, status }
          : carro
      )
    );
  }

  return (
    <section>
      <h2>Gerenciar veículos</h2>

      <p>
        Cadastro, status e controle da frota.
      </p>

      <div className="cars-grid">
        {carros.map((carro) => (
          <div className="card" key={carro.id}>
            <h3>{carro.modelo}</h3>

            <p>
              Categoria: {carro.categoria}
            </p>

            <p>
              Ano: {carro.ano}
            </p>

            <p>
              KM: {carro.km}
            </p>

            <label>
              Status
              <select
                value={carro.status}
                onChange={(e) =>
                  alterarStatus(
                    carro.id,
                    e.target.value
                  )
                }
              >
                <option>Disponível</option>
                <option>Alugado</option>
                <option>Manutenção</option>
              </select>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reservas({ reservas }) {
  return (
    <section>
      <h2>Reservas</h2>

      <p>
        Reservas cadastradas no sistema.
      </p>

      <table>
        <thead>
          <tr>
            <th>Reserva</th>
            <th>Cliente</th>
            <th>Veículo</th>
            <th>Período</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.cliente}</td>
              <td>{reserva.carro}</td>
              <td>
                {reserva.inicio} até {reserva.fim}
              </td>
              <td>{reserva.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Locacoes({
  locacoes,
  setPagina,
}) {
  return (
    <section>
      <h2>Locações / Retiradas</h2>

      <p>
        Registre e acompanhe os veículos retirados
        pelos clientes.
      </p>

      <button
        className="primary"
        onClick={() => setPagina('nova-locacao')}
      >
        + Registrar retirada
      </button>

      <br />
      <br />

      {locacoes.length === 0 ? (
        <div className="card">
          Nenhuma locação registrada.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Locação</th>
              <th>Cliente</th>
              <th>Veículo</th>
              <th>Retirada</th>
              <th>KM inicial</th>
              <th>Pagamento</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {locacoes.map((locacao) => (
              <tr key={locacao.id}>
                <td>{locacao.id}</td>
                <td>{locacao.cliente}</td>
                <td>{locacao.carro}</td>
                <td>{locacao.retirada}</td>
                <td>{locacao.kmInicial} km</td>
                <td>{locacao.pagamento}</td>
                <td>
                  <strong>{locacao.status}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function NovaLocacao({
  reservas,
  carros,
  registrarRetirada,
}) {
  const carrosDisponiveis = carros.filter(
    (carro) => carro.status === 'Disponível'
  );

  return (
    <section>
      <h2>Registrar retirada</h2>

      <p>
        Registre a retirada do veículo e a vistoria
        inicial.
      </p>

      <div className="card">
        <form onSubmit={registrarRetirada}>
          <label>
            Reserva
            <select name="reserva" required>
              <option value="">
                Selecione uma reserva
              </option>

              {reservas.map((reserva) => (
                <option
                  key={reserva.id}
                  value={reserva.id}
                >
                  {reserva.id} — {reserva.carro}
                </option>
              ))}
            </select>
          </label>

          <label>
            Cliente
            <input
              name="cliente"
              defaultValue="Mariana Silva"
              required
            />
          </label>

          <label>
            Veículo
            <select name="carro" required>
              <option value="">
                Selecione um veículo
              </option>

              {carrosDisponiveis.map((carro) => (
                <option
                  key={carro.id}
                  value={carro.modelo}
                >
                  {carro.modelo}
                </option>
              ))}
            </select>
          </label>

          <label>
            Data e hora da retirada
            <input
              type="datetime-local"
              name="retirada"
              required
            />
          </label>

          <label>
            Quilometragem inicial
            <input
              type="number"
              name="kmInicial"
              placeholder="Ex.: 12500"
              required
            />
          </label>

          <label>
            Combustível inicial
            <select
              name="combustivelInicial"
              required
            >
              <option value="">Selecione</option>
              <option>Cheio</option>
              <option>3/4</option>
              <option>1/2</option>
              <option>1/4</option>
              <option>Vazio</option>
            </select>
          </label>

          <label>
            Vistoria inicial
            <textarea
              name="vistoriaInicial"
              required
              placeholder="Descreva a vistoria..."
            />
          </label>

          <label>
            Caução / Sinal
            <select name="pagamento" required>
              <option value="">Selecione</option>
              <option>PIX</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <button className="primary">
            Registrar locação
          </button>
        </form>
      </div>
    </section>
  );
}

function Devolucoes({
  locacoes,
  registrarDevolucao,
}) {
  const ativas = locacoes.filter(
    (locacao) => locacao.status === 'Em andamento'
  );

  return (
    <section>
      <h2>Registrar devolução</h2>

      <p>
        Registre a devolução, vistoria final e cobranças
        adicionais.
      </p>

      {ativas.length === 0 ? (
        <div className="card">
          <h3>Nenhuma locação em andamento</h3>

          <p>
            As locações retiradas aparecerão aqui para
            devolução.
          </p>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={registrarDevolucao}>
            <label>
              Locação
              <select name="locacao" required>
                <option value="">
                  Selecione uma locação
                </option>

                {ativas.map((locacao) => (
                  <option
                    key={locacao.id}
                    value={locacao.id}
                  >
                    {locacao.id} — {locacao.cliente} —{' '}
                    {locacao.carro}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Quilometragem final
              <input
                type="number"
                name="kmFinal"
                placeholder="Ex.: 12850"
                required
              />
            </label>

            <label>
              Combustível final
              <select
                name="combustivelFinal"
                required
              >
                <option value="">Selecione</option>
                <option>Cheio</option>
                <option>3/4</option>
                <option>1/2</option>
                <option>1/4</option>
                <option>Vazio</option>
              </select>
            </label>

            <label>
              Vistoria final
              <textarea
                name="vistoriaFinal"
                placeholder="Descreva a condição do veículo..."
                required
              />
            </label>

            <label>
              Diárias adicionais (R$)
              <input
                type="number"
                step="0.01"
                name="diariaExtra"
                defaultValue="0"
              />
            </label>

            <label>
              Multas (R$)
              <input
                type="number"
                step="0.01"
                name="multas"
                defaultValue="0"
              />
            </label>

            <label>
              Avarias / danos (R$)
              <input
                type="number"
                step="0.01"
                name="avarias"
                defaultValue="0"
              />
            </label>

            <button className="primary">
              Finalizar devolução
            </button>
          </form>
        </div>
      )}

      <h3>Histórico de locações</h3>

      {locacoes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Locação</th>
              <th>Cliente</th>
              <th>Veículo</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {locacoes.map((locacao) => (
              <tr key={locacao.id}>
                <td>{locacao.id}</td>
                <td>{locacao.cliente}</td>
                <td>{locacao.carro}</td>
                <td>{locacao.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function Clientes() {
  return (
    <section>
      <h2>Clientes</h2>

      <p>
        Gerenciamento de clientes Pessoa Física e
        Pessoa Jurídica.
      </p>

      <div className="card">
        <h3>Mariana Silva</h3>
        <p>Tipo: Pessoa Física</p>
        <p>Status: Ativo</p>
      </div>
    </section>
  );
}

function Pagamentos() {
  const [pago, setPago] = useState(false);

  return (
    <section>
      <h2>Pagamentos</h2>

      <p>
        Integração com gateway de pagamento.
      </p>

      <div className="card">
        <h3>Gateway de Pagamento</h3>

        <p>
          Cartão de crédito, cartão de débito e PIX.
        </p>

        <button
          className="primary"
          onClick={() => setPago(true)}
        >
          Simular pagamento
        </button>

        {pago && (
          <div className="success">
            ✓ Pagamento simulado com sucesso.
          </div>
        )}
      </div>
    </section>
  );
}

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <App />
);