const express = require('express');
const router = express.Router();

const courses =[
    {id: 1, name: 'course1' },
    {id: 2, name: 'course2' },
    {id: 3, name: 'course3' },
];

//router.get('/api/courses', (req, res) => {
router.get('/', (req, res) => {
    res.send(courses);
});

//router.post('/api/courses', (req, res) => {
router.post('/', (req, res) => {
    const {error} = validadeCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);//404 bad req
        
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    course.push(course);
    res.send(course);
});

//router.put('/api/courses:id', (req, res)=>{
router.put('/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('ID Nao Encontrado');

    const {error} = validadeCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);//404 bad req

    course.name = req.body.name;
    res.send(course);
});

//router.delete('/api/courses/:id',(req, res)=>{
router.delete('/:id',(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('ID Nao Encontrado');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

router.get('/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('ID Nao Encontrado');
    res.send(course);
})

function validateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validade(course, schema);
}
module.exports = router;