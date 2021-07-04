const readlineSync = require('readline-sync');
 
let valor_investido = readlineSync.question('Investimento: R$ ')
let visualizacoes, cliques, compartilhamentos, novas_visualizacoes, total_visualizacoes, total_compartilhamentos;

visualizacoes = parseInt(valor_investido) * 30 //30 pessoas visualizam o anúncio original (sem compartilhamento) a cada R$1,00 investido.
cliques = parseInt((visualizacoes * 12)/100) //a cada 100 pessoas que visualizam o anúncio, 12 clicam nele.
compartilhamentos = parseInt((cliques * 3)/20 )//a cada 20 pessoas que clicam no anúncio, 3 compartilham nas redes sociais.

if (compartilhamentos < 1) { 
    novas_visualizacoes = 0
} else if (compartilhamentos >= 1) { 
    total_compartilhamentos = compartilhamentos * 4 //o mesmo anúncio é compartilhado no máximo 4 vezes em sequência.   
    novas_visualizacoes = total_compartilhamentos * 40 //cada compartilhamento nas redes sociais gera 40 novas visualizações.
}
total_visualizacoes = visualizacoes + novas_visualizacoes
console.log('Visualizações: ' + total_visualizacoes)


