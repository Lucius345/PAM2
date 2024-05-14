import express from 'express';
import * as Filmes from '../service/filmes.js';

const router = express.Router();

router.get('/filmes', async (req, res) => {
    try {
        let nome = req.query.nome;
        let result;
        if (nome) {
            result = await Filmes.consultar(nome);
        } else {
            result = await Filmes.consultar();
        }
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta:', error);
        let erro = { 
            erro: 'Erro interno do servidor', 
            info_erro: error 
        }
        res.status(500).json(erro);
    }
});


router.get('/filmes/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Filmes.consultarPorId(id);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Recurso não encontrado' });
        }
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta por ID:', error);
        let erro = { 
            erro: 'Erro interno do servidor', 
            info_erro: error 
        }
        res.status(500).json(erro);
    }
});


router.post('/filmes',async(req,res)=>{
    try {
        const { nome, duracao, classificacao, nota } = req.body; // Supondo que os dados enviados tenham campos 'nome' e 'valorDeMercado'

        // Chamar a função cadastrar com os dados recebidos
        const novoFilme = await Filmes.cadastrar(nome, duracao, classificacao, nota);

        // Enviar uma resposta com os dados da nova empresa cadastrada
        res.status(201).json(novoFilme);
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta por ID:', error);
        let erro = { 
            erro: 'Erro interno do servidor', 
            info_erro: error 
        }
        res.status(500).json(erro);
    }
})

router.put('/filmes/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const { nome, duracao, classificacao, nota } = req.body; // Supondo que os dados enviados tenham campos 'nome' e 'valorDeMercado'

        // Chamar a função cadastrar com os dados recebidos
        const FilmeAlterado = await Filmes.alterar(id, nome, duracao, classificacao, nota);

        // Enviar uma resposta com os dados da nova empresa cadastrada
        res.status(201).json(FilmeAlterado);
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta por ID:', error);
        let erro = { 
            erro: 'Erro interno do servidor', 
            info_erro: error 
        }
        res.status(500).json(erro);
    }
})

router.delete('/filmes/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const result = await Filmes.deletar(id);
        if(result.length == 0){
            res.status(204).json([]);
        }
        else{
            res.status(404).json({ erro: 'Recurso não encontrado' })
        }
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta por ID:', error);
        let erro = { 
            erro: 'Erro interno do servidor', 
            info_erro: error 
        }
        res.status(500).json(erro);
    }
})

export default router;