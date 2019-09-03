const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Conn to MongoDB...'))
    .catch(err => console.err('Failed to Conn...', err))

    const courseSchema = new mongoose.Schema({
        // name: String,
        name: {
            type: String,
            require:true,
            minlength: 5,
            maxlength: 255,
            // match: /pattern/
        },
        category: {
            type: String,
            require: true,
            enum: ['web', 'mobile', 'network'],
            lowercase: true
        },
        author: String,
        tags: {
            type: Array,
            validade: {
                isAsync: true,
                validator: function(v, callback) {
                    setTimeout(()=> {
                        const result =  v && v.length >0;
                        callback(result);
                    }, 1000);
                },
                message: 'Course must have at least 1 tag'
            }
        },
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
        price: {
            type: Number,
            required: function(){ return this.isPublished; },
            min: 15,
            max: 200
        }
    });

    const Course = mongoose.model('Course', courseSchema);

    async function createCourse(){
        const course = new Course({
            name:'Angular',
            category: 'web',
            author: 'Paulo',
            tags: ['Angular','FrontEnd'],
            isPublished: true,
            price: 15
        });

        try{
            const result = await course.save();

        console.log(result);
        }
        catch(ex){
            // console.log(ex.message);
            for (field in ex.errors)
                console.log(ex.errors[field].message);
        }
    }

    async function getCourses() {
// eq (equal) // ne (not equal) // gt (greater than) // gte (greater than or equal to) // lt (less than) // lte (less than or equal to) // in // nin (not in)
        const pageNumber = 2;
        const pageSize = 10;
        // /api/courses?pageNumber2&pageSize=10

        const courses = await Course
            .find({ author: 'Paulo', isPublished: true })
            // .find({ price: { $gte: 10, $lte: 20 } })
            // .find({ price: { $in: [10,15,20] } })
            // .find()
            // .or([ {author: 'Paulo'}, {isPublished: true} ])
            // .and([])
            // .find({ author: /^Paulo/  }) // starts with Paulo
            // .find({ author: /Roberto$/i  }) // ends with Paulo case Incensitive
            // .find({ author: /.*Paulo.*/  }) // Contains Paulo
            .limit(10)
            // .skip((pageNumber -1)*pageSize)
            // .limit(pageSize)
            .sort({ name: 1 })
            .select({ name: 1, tags: 1 });
            // .count();
        console.log(courses);
    }

    async function updateCourse(id) {
        //Query First
        // const course = await Course.findById(id);
        // if(!course) return;
        // course.isPublished = true;
        // course.author='Dominus';

        // const result = await course.save();
        // console.log(result);
            // course.set({
            //     isPublished: true,
            //     author: 'Dominus'
            // })

        //Update to DB
        // const result = await Course.update({ _id: id}, {
        //     $set: {
        //         author: 'Imperius',
        //         isPublished: false
        //     }
        // });
        const course = await Course.findByIdAndUpdate( id, {
            $set: {
                author: 'Dominus Imperius',
                isPublished: false
            }
        }, { new: true} );
        console.log(result);
    }

    async function removeCourse(id) {
        // const result = await Course.deleteOne({_id:id});
        // const result = await Course.deleteMany({_id:id});
        const course = await Course.findOneAndRemove(id);
        // console.log(result);
        console.log(course);
    }

    // getCourses();
    // removeCourse('5cacdb2304361e3d2c11f1e8');
    createCourse();
