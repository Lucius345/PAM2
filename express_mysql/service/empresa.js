import  pool  from '../data/index.js';

export const consultar = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM empresa WHERE empresa.nome LIKE ?`;
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
        const cmdSql = 'SELECT * FROM empresa WHERE empresa.id = ?';
        const [dados, meta_dados] = await cx.query(cmdSql,[id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const cadastrar = async (Nome, ValorDeMercado) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'INSERT INTO empresa(Nome, ValorDeMercado) VALUES (?, ?)';
        const [execucao] = await cx.query(cmdSql, [Nome, ValorDeMercado]);        
        if(execucao.affectedRows > 0){
            const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
            const lastId = result[0].lastId;
            const [novaEmpresa, meta_dados] = await cx.query('SELECT * FROM empresa WHERE id = ?', [lastId]);
            cx.release();
            return novaEmpresa;
        }
        cx.release();
        return execucao;

    } catch (error) {
        throw error;
    }
};

export const alterar = async (Id, Nome, ValorDeMercado) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'UPDATE empresa SET Nome = ?,ValorDeMercado = ? WHERE Id = ?';
        const [execucao] = await cx.query(cmdSql, [Nome, ValorDeMercado, Id]);
        if(execucao.affectedRows > 0){            
            const [empresaAlterada, meta_dados] = await cx.query('SELECT * FROM empresa WHERE id = ?', [Id]);
            cx.release();
            return empresaAlterada;
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
        const cmdSql = 'DELETE FROM empresa WHERE Id = ?';
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


