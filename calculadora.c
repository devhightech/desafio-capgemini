#include <stdio.h>
#include <stdlib.h>

int calculadora(double valor_investido) {
    int visualizacoes, cliques, compartilhamentos, novas_visualizacoes, total_visualizacoes, total_compartilhamentos;

    visualizacoes = valor_investido * 30; //30 pessoas visualizam o anúncio original (sem compartilhamento) a cada R$1,00 investido.
    cliques = (visualizacoes * 12)/100; //a cada 100 pessoas que visualizam o anúncio, 12 clicam nele.
    compartilhamentos = (cliques * 3)/20; //a cada 20 pessoas que clicam no anúncio, 3 compartilham nas redes sociais.

    if (compartilhamentos < 1) { 
        novas_visualizacoes = 0;
    } else if (compartilhamentos >= 1) { 
        total_compartilhamentos = compartilhamentos * 4; //o mesmo anúncio é compartilhado no máximo 4 vezes em sequência.   
        novas_visualizacoes = total_compartilhamentos * 40; //cada compartilhamento nas redes sociais gera 40 novas visualizações.
    }
    total_visualizacoes = visualizacoes + novas_visualizacoes;
    return total_visualizacoes;
}

int main() {
    double valor_investido;   
    printf("Investimento: R$ "); 
    scanf("%lf", &valor_investido);
    
    //projeção aproximada da quantidade máxima de pessoas que visualizarão o mesmo anúncio (considerando o anúncio original + os compartilhamentos)
    printf("Visualizações: %d\n", calculadora(valor_investido));
    return 0;
}