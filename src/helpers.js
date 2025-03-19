const filtaOcorrencia = (paragrafo) =>
  Object.keys(paragrafo).filter((chave) => paragrafo[chave] > 1);

const montaSaidaArquivo = (listaPalavras) => {
  let textoFinal = "";
  listaPalavras.forEach((paragrafo, i) => {
    const duplicadas = filtaOcorrencia(paragrafo).join(", ");
    textoFinal += `Palavras Duplicadas no parágrafo ${i + 1}: ${duplicadas} \n`;
  });
  return textoFinal;
};
export { montaSaidaArquivo };
