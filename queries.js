//Task2
db.books.find({genre:'Fiction'});

db.books.find({published_year: {$gt: 1950}})

db.books.find({author:'J.D. Salinger'})

db.books.updateOne({title:'The Alchemist'},
    {$set:{price:12.99}}
)
db.books.deleteOne({title:'The Catcher in the Rye'})

//Task 3
db.books.find({in_stock:true,published_year: {$gt:2010}})

db.books.find({},{title:true,author:true,price:true,_id:false}) || db.books.find({},{title:1,author:1,price:1,_id:0})

db.books.find().sort({price:1})//ascending order
db.books.find().sort({price:-1})//descending order

db.books.find().limit(5)
db.books.find().skip(5).limit(5)

//Task4
db.books.aggregate([
    {$group: {_id:"$genre",averagePrice:{ $avg:"$price"}}}
])
db.books.aggregate([
    { $group: { _id: "$author", bookCount: { $sum: 1 } } },
    { $sort: { bookCount: -1 } },
    { $limit: 1 }
])

db.books.aggregate([
    {$project:{
        decade:{$substr:["$published_year",0,3]}
    }},
    {$group:{
        _id:{$concat:["$_id.decade",'0s']},count:{$sum:1}
    }}
])

//Task5
db.books.createIndex({title:1})

db.books.createIndex({author:1,published_year:1})

db.books.find({title:"1984"}).explain('executionStats')

db.books.find({title:'1984'}).explain('executionStats')