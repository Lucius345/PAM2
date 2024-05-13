import express from 'express';
import * as Empresas from '../service/empresa.js';

const router = express.Router();

router.get('/empresa', async (req, res) => {
    try {
        let nome = req.query.nome;
        let result;
        if (nome) {
            result = await Empresas.consultar(nome);
        } else {
            result = await Empresas.consultar();
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


router.get('/empresa/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Empresas.consultarPorId(id);
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


router.post('/empresa',async(req,res)=>{
    try {
        const { nome, valor } = req.body; // Supondo que os dados enviados tenham campos 'nome' e 'valorDeMercado'

        // Chamar a função cadastrar com os dados recebidos
        const novaEmpresa = await Empresas.cadastrar(nome, valor);

        // Enviar uma resposta com os dados da nova empresa cadastrada
        res.status(201).json(novaEmpresa);
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

router.put('/empresa/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const { nome, valor } = req.body; // Supondo que os dados enviados tenham campos 'nome' e 'valorDeMercado'

        // Chamar a função cadastrar com os dados recebidos
        const empresaAlterada = await Empresas.alterar(id, nome, valor);

        // Enviar uma resposta com os dados da nova empresa cadastrada
        res.status(201).json(empresaAlterada);
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

router.delete('/empresa/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const result = await Empresas.deletar(id);
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