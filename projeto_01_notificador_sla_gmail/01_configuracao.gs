/**
 * PROJETO: NotificadorAcordoNivelServico
 * ARQUIVO: 01_configuracao.gs
 * OBJETIVO: Guardar as configurações e a lista de chamados.
 */

const CONFIGURACAO_SISTEMA = {
  EMAIL_GESTÃO: "gomesdasilvasantoselder7@gmail.com", 
  NOME_EMPRESA: "TechOps Solutions",
  LIMITE_ALERTA_HORAS: 2
};

/**
 * Retorna os dados dos chamados para monitoramento
 * @return {Array<Object>}
 */
function obterChamadosSimulados() {
  return [
    {
      identificador: "INC-8801",
      cliente: "Banco Alfa - Filial Rio de Janeiro",
      categoria: "Infraestrutura",
      prioridade: "CRÍTICA",
      horasAberto: 4,
      statusAcordoServico: "ESTOURADO"
    },
    {
      identificador: "INC-8804",
      cliente: "Logística Express",
      categoria: "Sistemas",
      prioridade: "ALTA",
      horasAberto: 1,
      statusAcordoServico: "EM_RISCO"
    },
    {
      identificador: "INC-8809",
      cliente: "Clínica Saúde Total",
      categoria: "Redes",
      prioridade: "MÉDIA",
      horasAberto: 0.5,
      statusAcordoServico: "NO_PRAZO"
    },
    {
      identificador: "INC-8812",
      cliente: "Varejo Mais",
      categoria: "Banco de Dados",
      prioridade: "CRÍTICA",
      horasAberto: 5,
      statusAcordoServico: "ESTOURADO"
    }
  ];
}