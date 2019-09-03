const p1 = new Promise((resolve) => {
    setTimeout(()=>{
        console.log('async op 1...');
        //reject(new Error ('qweqwe.'));
        resolve(1);
    }, 2000);
});

const p2= new Promise((resolve) => {
    setTimeout(()=>{
        console.log('async op 2...');
        resolve(2);
    }, 2000);
});


Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('ERRO:',err.message));
    

/*
const p1= Promise.resolve({ id:1});
p1.then(result => console.log(result));

const p2= Promise.reject(new Error('blablabla'));
p2.catch(error => console.log(result));
*/