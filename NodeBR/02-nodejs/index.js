/*
0 obter user
1 obter nº de tel de user a partir do id
2 obter ender do user pelo id
*/
// importamo um modulo interno do node.js

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  //quando der problema -> reject(erro)
  //quando sucess -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: 'paulo',
        dataNascimento: new Date(),
      })
    }, 1000)
  })
}
function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '9990290',
        ddd: 11
      })
    }, 2000)
  })
}
function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'rua jjj',
      numero: 0,
    })
  }, 2000);
}

//1o passo add a palavra async na funcao -> automaticamente retorna uma promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
          Nome: ${usuario.nome},
          endereco: ${endereco.rua},${endereco.numero}
          Telefone: (${telefone.ddd}),${telefone.telefone}
          `)
    console.timeEnd('medida-promise')
  }
  catch (error) {
    console.error('falha', error)
  }
}

// const usuarioPromise = obterUsuario()
// //para manipular sucess usar função .then
// //para manipular erros usar função .catch
// // usuario -> telefone -> telefone
// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id)
//       .then(function resolverTelefone(result) {
//         return {
//           usuario: {
//             nome: usuario.nome,
//             id: usuario.id
//           },
//           telefone: result
//         }
//       })
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     console.log(`
//       nome: ${resultado.usuario.nome}
//       Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//       Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
//     `)
//   })
//   .catch(function (error) {
//     console.error('falha na funcao', error)
//   })

// obterUsuario(function resolverUsuario(error, usuario) {
//   // null || "" || 0 === false
//   if (error) {
//     console.error('Falha em Usuario', error)
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error('Falha em Telefone', error)
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error('falha em endereco', error2)
//         return;
//       }
//       console.log(`
//       Nome: ${usuario.nome},
//       endereco: ${endereco.rua},${endereco.numero},
//       Telefone: (${telefone.ddd}),${telefone.telefone}
//       `)
//     })
//   })
// })
// const telefone = obterTelefone(usuario.id)


// console.log('telefone', telefone)
