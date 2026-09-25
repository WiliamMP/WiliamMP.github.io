export type Project = {
  name: string
  description: string
  tags: string[]
  repo: string
}

export const projects: Project[] = [
  {
    name: 'My Lib',
    description:
      'Aplicação para organizar sua biblioteca pessoal de jogos, filmes e séries, com login, cadastro e CRUD completo.',
    tags: ['PHP', 'Laravel'],
    repo: 'My-Lib',
  },
  {
    name: 'Consumindo API de CEP',
    description: 'Consulta de endereços consumindo a API pública do ViaCEP a partir de uma aplicação desktop.',
    tags: ['Delphi', 'REST API'],
    repo: 'Consumindo-API-CEP',
  },
  {
    name: 'Gerenciamento de Estoque',
    description: 'Sistema desktop de controle de estoque com cadastro, atualização e configuração de produtos.',
    tags: ['Delphi', 'Pascal'],
    repo: 'gerenciamento-de-estoque',
  },
  {
    name: 'Calculadora Delphi',
    description: 'Calculadora desktop construída em Delphi com a VCL.',
    tags: ['Delphi'],
    repo: 'calculadoraDelphi',
  },
  {
    name: 'Cadastro de Cliente',
    description: 'Cadastro de clientes para a web feito em PHP.',
    tags: ['PHP', 'HTML', 'CSS'],
    repo: 'Cadastro-de-Cliente',
  },
  {
    name: 'Página de Anotação',
    description: 'Página para criar e organizar anotações, feita com HTML, CSS e um pouco de JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    repo: 'Pagina-de-Anotacao',
  },
]

export const stack = {
  'No dia a dia': ['Delphi', 'Object Pascal', 'SQL'],
  'Na web': ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  'Já trabalhei com': ['PHP', 'Laravel', 'Java', 'C', 'Python'],
}

export const links = {
  github: 'https://github.com/WiliamMP',
  linkedin: 'https://www.linkedin.com/in/wiliam-patricio-170069222/',
  email: 'wiliampatricio1235@gmail.com',
}
