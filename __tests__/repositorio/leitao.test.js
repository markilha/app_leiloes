import { obtemLeiloes } from '../../src/repositorio/leilao';
import apiLeiloes from '../../src/servicos/apiLeiloes';

jest.mock('../../src/servicos/apiLeiloes')
const mockLeiloes = [
    {
        id: 1,
        nome: 'Leilão',
        descricao: 'Descricão do leilão'
    }
]

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno
            })
        }, 200)
    });
}
const mockRequisicaoErro = () => {
    return new Promise((_,reject) => {
        setTimeout(() => {
           reject();
        }, 200)
    });
}

describe('repositorio/leilao', () => {
    describe('obtemLeiloes', () => {
        it('dever retornar um lista de leilões', async () => {
            apiLeiloes.get.mockImplementation(()=> mockRequisicao(mockLeiloes))
            const leiloes = await obtemLeiloes();
            expect(leiloes).toEqual(mockLeiloes);
        });
        it('dever retornar uma lista vazia quando a requisição falhar', async () => {
            apiLeiloes.get.mockImplementation(()=> mockRequisicaoErro())
            const leiloes = await obtemLeiloes();
            expect(leiloes).toEqual([]);
        })
    });
   
})