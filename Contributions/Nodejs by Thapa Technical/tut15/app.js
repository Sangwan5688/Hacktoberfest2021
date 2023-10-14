/* 
    TODO: JSON & Mini Challenge
    ? create api using json
    ? json -> javascript object notation
    ? it is a lightweight format for storing & transforming data
    ? stringify = object -> json
    ? parse = json -> object
*/

const bioData = {
    name : 'vishal',
    age : 20,
    sex : 'male'
}
console.log(bioData)

const jsonBioData = JSON.stringify(bioData)
console.log(jsonBioData)

const newData = JSON.parse(jsonBioData)
console.log(newData)