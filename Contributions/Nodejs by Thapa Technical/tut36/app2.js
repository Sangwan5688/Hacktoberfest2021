/* 
    TODO: Read Operation
    ? db.collection_name.find(query, projections)
    ? cmd type, mongosh, go to mongoCompass
        * show dbs
        * use Vishal_inovation
        * show collections 
        * db.vishal_data.find().pretty()
        * db.vishal_data.find({isMarried : false})
        * db.vishal_data.find({name : 'vishal'}, { _id : 1})
        * db.vishal_data.find({name : 'vishal'}, { name : 1})
        * db.vishal_data.find({name : 'vishal'}, { name : 1, _id : 0})
        * db.vishal_data.find({ isMarried : false}).limit(1)
        * db.vishal_data.findOne({ isMarried : false})
        * db.vishal_data.find({ isMarried : false}).limit(1).skip(1)
*/