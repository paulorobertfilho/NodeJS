const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi');
async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', 'Nome do Heroi')
    .option('-p, --poder [value]', 'Poder do Heroi')
    .option('-i, --id [value]', 'Id do Heroi')

    .option('-c, --cadastrar', 'Cadastra um hero')
    .option('-l, --listar', 'listar herois')
    .option('-r, --remover [value]', 'remove herois por id')
    .option('-a, --atualizar [value]', 'atualiza herois por id')
    .parse(process.argv)

  const heroi = new Heroi(Commander)

  try {
    if (Commander.cadastrar) {
      delete heroi.id
      const resultado = await Database.cadastrar(heroi)
      if (!resultado) {
        console.error('Hero nao foi cadastrado')
        return;
      }
      console.log('Hero cadastrado.')
    }
  } catch (error) {
    console.error('Falha: ', error)
  }
  if (Commander.listar) {
    const resultado = await Database.listar()
    console.log(resultado)
    return;
  }
  if (Commander.remover) {
    const resultado = await Database.remover(heroi.id)
    if (!resultado) {
      console.error('Nao foi possivel remover o Hero')
      return;
    }
    console.log('Hero removed')
  }
  if (Commander.atualizar) {
    const idAtualizar = parseInt(Commander.atualizar);
    const dado = JSON.stringify(heroi)
    const heroiAtualizar = JSON.parse(dado)
    const resultado = await Database.atualizar(idAtualizar, heroiAtualizar)
    if (!resultado) {
      console.error('falha ao atualizar')
      return;
    }
    console.log('Atualizado')
  }
}
main()
