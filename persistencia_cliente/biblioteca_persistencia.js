﻿const { Client } = require('pg')
const { conexao } = require('../persistencia_livro/conexao')

// Função para INSERIR CLIENTES
async function inserirCliente(clientes) {
  const cliente = new Client(conexao)

  await cliente.connect();

  const res = await cliente.query('INSERT INTO cliente(id_cliente,nome_cliente,matricula,telefone) VALUES ($1,$2,$3,$4) RETURNING *', 
      [clientes.id_cliente, clientes.nome_cliente,clientes.matricula,clientes.telefone]);
  await cliente.end();
  return res.rows[0]
}

// Função para LISTAR CLIENTES
async function listarCliente() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM cliente');
    await cliente.end();
    return res.rows;
  }

// Função para BUSCAR POR ID DE CLIENTES
async function buscarPorIdCliente(id) {
  const cliente = new Client(conexao)
  await cliente.connect();
  const res = await cliente.query('SELECT * FROM cliente WHERE id_cliente = $1',[id.id_cliente]);
  await cliente.end();
  return res.rows[0];
}

// Função para DELETAR CLIENTES
async function deletarCliente(id) {
  const cliente = new Client(conexao)
  await cliente.connect();
  const res = await cliente.query('DELETE FROM cliente WHERE id_cliente = $1 RETURNING *',[id.id_cliente]);
  await cliente.end();
  return res.rows[0];
}

// Função para ATUALIZAR UM CLIENTE
async function atualizarClientes(id, clientes) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = 
    await cliente.query('UPDATE cliente SET nome_cliente=$1,telefone=$2 where id_cliente = $3 RETURNING *', 
        [clientes.nome_cliente, clientes.telefone, id]);
    await cliente.end();

    return res.rows[0];

}


module.exports = {
    listarCliente,
    inserirCliente,
    buscarPorIdCliente,
    deletarCliente,
    atualizarClientes
}
