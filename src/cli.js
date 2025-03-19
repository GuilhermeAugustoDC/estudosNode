import fs from "fs";
import { Command } from "commander";
import path from "path";
import trataErros from "./erros/funcoesErro.js";
import { contaPalavras } from "./index.js";
import { montaSaidaArquivo } from "./helpers.js";

const program = new Command();

program
  .version("0.1")
  .option("-t, --texto <string>", "⚙️ - Caminho do texto a ser processado")
  .option("-d, --destino <string>", "⚙️ - Caminho para salvar resultados")
  .action((options) => {
    const { texto, destino } = options;
    if (!texto || !destino) {
      console.error("❌ - Erro inserir caminho de DESTINO e ORIGEM");
      console.help();
      return;
    }

    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    try {
      processaArquivo(caminhoTexto, caminhoDestino);
      console.log("✅ Texto Processado Com Sucesso ✅\n",);
    } catch (error) {
      console.log("❌ Ocorreu Erro No Processamento ❌", error);
    }
  });

program.parse();

function processaArquivo(texto, destino) {
  fs.readFile(texto, "utf-8", (erro, texto) => {
    try {
      if (erro) throw erro;
      const resultado = contaPalavras(texto);
      criaESalvaArquivo(resultado, destino);
    } catch (erro) {
      trataErros(erro);
    }
  });
}

// * Função async usando método { .then .catch .finally }
function criaESalvaArquivo(listaPalavras, path) {
  const arquivoNovo = `${path}\\resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  fs.promises
    .writeFile(arquivoNovo, textoPalavras)
    .then(() => {
      console.log("✅ Arquivo criado com sucesso ✅\n");
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => console.log("✅ Operação finalizada com sucesso ✅\n"));
}
