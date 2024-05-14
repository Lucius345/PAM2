import  pool  from '../data/index.js';

export const consultar = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM filmes WHERE nome LIKE ?;`;
        const [dados, meta_dados] = await cx.query(cmdSql, [`%${filtro}%`]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {        
        const cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM filmes WHERE filmes.id = ?';
        const [dados, meta_dados] = await cx.query(cmdSql,[id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const cadastrar = async (nome, duracao, classificacao, nota) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'INSERT INTO filmes(nome, duracao, classificacao, nota) VALUES (?, ?, ?, ?)';
        const [execucao] = await cx.query(cmdSql, [nome, duracao, classificacao, nota]);        
        if(execucao.affectedRows > 0){
            const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
            const lastId = result[0].lastId;
            const [novoFilme, meta_dados] = await cx.query('SELECT * FROM filmes WHERE id = ?', [lastId]);
            cx.release();
            return novoFilme;
        }
        cx.release();
        return execucao;

    } catch (error) {
        throw error;
    }
};

export const alterar = async (Id, nome, duracao, classificacao, nota) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'UPDATE filmes SET nome = ?, duracao = ?, classificacao = ?, nota = ? WHERE Id = ?';
        const [execucao] = await cx.query(cmdSql, [nome, duracao, classificacao, nota, Id]);
        if(execucao.affectedRows > 0){            
            const [FilmeAlterado, meta_dados] = await cx.query('SELECT * FROM filmes WHERE id = ?', [Id]);
            cx.release();
            return FilmeAlterado;
        }
        cx.release();
        return execucao;
    } catch (error) {
        throw error;
    }
};

export const deletar = async (Id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'DELETE FROM filmes WHERE Id = ?';
        const [execucao] = await cx.query(cmdSql, [Id]);
        if(execucao.affectedRows > 0){ 
            cx.release();
            return [];
        }        
        cx.release();
        return 'Recurso não foi encontrado';
    } catch (error) {
        throw error;
    }
};


