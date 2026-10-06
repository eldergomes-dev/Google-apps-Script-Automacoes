/**
 * PROJETO: NotificadorAcordoNivelServico
 * ARQUIVO: 02_servico_email_suporte.gs
 * OBJETIVO: Montar o relatório visual e enviar por e-mail.
 */

function processarEEnviarNotificacaoAcordoServico() { 
  try {
    Logger.log("[INFORMACAO] Iniciando processamento do relatório...");

    const listaChamados = obterChamadosSimulados();
    if (!listaChamados || listaChamados.length === 0) {
      Logger.log("[AVISO] Nenhum chamado encontrado para processamento.");
      return;
    }

    const totalChamados = listaChamados.length;
    const chamadosEstourados = listaChamados.filter(chamado => chamado.statusAcordoServico === "ESTOURADO").length;
    const chamadosEmRisco = listaChamados.filter(chamado => chamado.statusAcordoServico === "EM_RISCO").length;

    let linhasTabelaHtml = "";

    listaChamados.forEach((chamadoItem, indice) => {
      const corFundo = indice % 2 === 0 ? "#ffffff" : "#f8f9fa";
      
      let corEmblema = "#2e7d32";
      let textoStatus = "No Prazo";

      if (chamadoItem.statusAcordoServico === "ESTOURADO") {
        corEmblema = "#c62828";
        textoStatus = "Prazo Estourado";
      } else if (chamadoItem.statusAcordoServico === "EM_RISCO") {
        corEmblema = "#ef6c00";
        textoStatus = "Atenção (Em Risco)";
      }

      linhasTabelaHtml += `
        <tr style="background-color: ${corFundo};">
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1a73e8;">${chamadoItem.identificador}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${chamadoItem.cliente}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${chamadoItem.categoria}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;"><b>${chamadoItem.prioridade}</b></td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">${chamadoItem.horasAberto}h</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">
            <span style="background-color: ${corEmblema}; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">
              ${textoStatus}
            </span>
          </td>
        </tr>
      `;
    });

    const mensagemCorpoHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333333; line-height: 1.5;">
        <div style="background-color: #0f172a; padding: 20px; border-radius: 8px 8px 0 0; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px;">${CONFIGURACAO_SISTEMA.NOME_EMPRESA} | Painel Operacional</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #94a3b8;">Alerta Consolidado de Incidentes e Controle de Acordo de Nível de Serviço</p>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; background-color: #ffffff;">
          <table style="width: 100%; margin-bottom: 20px; border-spacing: 10px; border-collapse: separate;">
            <tr>
              <td style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center; width: 33%;">
                <span style="font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">Total Abertos</span><br>
                <span style="font-size: 22px; font-weight: bold; color: #0f172a;">${totalChamados}</span>
              </td>
              <td style="background-color: #fff7ed; padding: 15px; border-radius: 6px; text-align: center; width: 33%;">
                <span style="font-size: 11px; color: #c2410c; font-weight: bold; text-transform: uppercase;">Em Risco</span><br>
                <span style="font-size: 22px; font-weight: bold; color: #c2410c;">${chamadosEmRisco}</span>
              </td>
              <td style="background-color: #fef2f2; padding: 15px; border-radius: 6px; text-align: center; width: 33%;">
                <span style="font-size: 11px; color: #b91c1c; font-weight: bold; text-transform: uppercase;">Estourados</span><br>
                <span style="font-size: 22px; font-weight: bold; color: #b91c1c;">${chamadosEstourados}</span>
              </td>
            </tr>
          </table>
          <p style="font-size: 14px;">Abaixo estão listados os chamados que requerem atuação imediata da equipe técnica:</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f8fafc; color: #475569; text-align: left; border-bottom: 2px solid #cbd5e1;">
                <th style="padding: 10px;">Ticket</th>
                <th style="padding: 10px;">Cliente</th>
                <th style="padding: 10px;">Categoria</th>
                <th style="padding: 10px;">Prioridade</th>
                <th style="padding: 10px; text-align: center;">Tempo</th>
                <th style="padding: 10px; text-align: center;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${linhasTabelaHtml}
            </tbody>
          </table>
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
            <p style="margin: 0;">Relatório gerado automaticamente via Google Apps Script.</p>
          </div>
        </div>
      </div>
    `;

    const mensagemTextoSimples = `Aviso do Acordo de Nível de Serviço - ${totalChamados} chamados monitorados. Estourados: ${chamadosEstourados}.`;

    GmailApp.sendEmail(CONFIGURACAO_SISTEMA.EMAIL_GESTÃO, `[ALERTA OPERACIONAL] Status do Acordo de Serviço - ${CONFIGURACAO_SISTEMA.NOME_EMPRESA}`, mensagemTextoSimples, {
      htmlBody: mensagemCorpoHtml
    });

    Logger.log("[SUCESSO] Mensagem enviada com sucesso para: " + CONFIGURACAO_SISTEMA.EMAIL_GESTÃO);

  } catch (objetoErro) {
    Logger.log("[ERRO CRÍTICO] Falha ao processar e enviar mensagem: " + objetoErro.toString());
  }
}