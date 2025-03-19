import fs from "fs";
import trataErros from "./erros/funcoesErro.js";
import { contaPalavras } from "./index.js";
import { montaSaidaArquivo } from "./helpers.js";

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const path = caminhoArquivo[3];

fs.readFile(link, "utf-8", (erro, texto) => {
  try {
    if (erro) throw erro;
    const resultado = contaPalavras(texto);
    criaESalvaArquivo(resultado, path);
  } catch (erro) {
    trataErros(erro);
  }
});

// * Função async usando método { .then .catch .finally }
function criaESalvaArquivo(listaPalavras, path) {
  const arquivoNovo = `${path}\\resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  fs.promises
    .writeFile(arquivoNovo, textoPalavras)
    .then(() => {
      console.log("✅ Arquivo criado com sucesso");
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => console.log("✅ Operação finalizada com sucesso"));
}
