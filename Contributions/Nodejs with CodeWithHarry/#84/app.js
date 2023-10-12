/* 
    TODO: Learning Mongodb
! mongodb command
? mongodb
? mongosh
? insert data in mongo db
    * use vishalCart
    * show collections
    * db.items.insertOne({name: "Samsung 30s", price : 22000, rating : 4.5, qty : 233, sold : 98})
    * db.items.insertMany([{name: "Samsung 30s", price : 22000, rating : 4.5, qty : 233, sold : 98},{name: "Nokia", price : 2000, rating : 5, qty : 500, sold : 500}])
    * db.items.find()
? searching in mongo db
    * db.items.find({name : "Nokia"})
    * db.items.find({rating : {$gte: 3.5}}) greater than equal
    * db.items.find({rating : {$gt: 3.5}}) greater than
    * db.items.find({rating : {$gt: 3.5}, price : {$lt: 10000}}) AND Operation
    * db.items.find({rating : {$gt: 3.5}, price : {$lt: 10000, qty : 288}}) AND Operation
    * db.items.find({ $or: [{rating : {$gt: 3.5}}, {price : {$lt: 10000}}]}) OR Operation
? deleting in mongo db ( syntax same as searching )
    * db.items.deleteOne({_id:ObjectId("6413b7665e4242855d427880")}) 
    * delete first matching entry
    * db.items.deleteMany({name: "Samsung 30s"})
? update in mongo db
    * db.anotherCollections.insertOne({name : "vishal", a : 89})
    * db.items.updateOne({filter or find},{update-value})
    * db.items.updateOne({name : "Samsung 30s"},{$set: {price : 2}})
    * db.items.updateMany({name : "Samsung 30s"},{$set: {rating : 5}})
*/