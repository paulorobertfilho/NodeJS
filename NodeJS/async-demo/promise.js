const p = new Promise((resolve,reject) => {
//kick off async work
    setTimeout(()=>{
        resolve(1);
        reject(new Error('erro reject'));
    },2000);
    
    
});

p
    .then(result => console.log('result', result))
    .catch(err => console.log('Error', err.message));