import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Atualizações de Processos</h1>
      <nav>
        <ul>
          <li><Link href="/clientes"><a>Cadastro de Clientes</a></Link></li>
          <li><Link href="/advogados"><a>Cadastro de Advogados</a></Link></li>
          <li><Link href="/atualizacoes"><a>Atualizações de Processos</a></Link></li>
        </ul>
      </nav>
    </div>
  );
}
