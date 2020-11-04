'use strict'

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

exports.getCustomer = function(event, context, callback){
    const data = JSON.parse(JSON.stringify(event))
    if (typeof data.name !== 'string' && data.lastname !== 'string') {
      console.error('Wrong format.')
      callback(new Error('Could not get this Customer.'))
      return
    }

    var params = {//sono aggiunte filtering expression per effettuare un get condizionale e non solo con chiave primaria
        TableName : 'CustomersDB',
        FilterExpression : '#name = :nome AND lastname = :lastname',
        ExpressionAttributeValues: { 
            ':nome': event.name,
            ':lastname': event.lastname
        },
        ExpressionAttributeNames: {
            '#name': 'name'
          }
    };

    var id = ""
    var name = ""
    var lastname = ""
    var res = dynamoDb.scan(params, (error, result) => {
    if (error) {//gestione errori
      console.error(error)
      callback(new Error('Something wrong, could not delete this Customer.'))
      return
    }else{// cast a stringa per stampare il risultato della richiesta 
        console.log("Scan succeeded.");
        result.Items.forEach(function(itemdata){
            id = JSON.stringify(itemdata.id);
            name = JSON.stringify(itemdata.name);
            lastname = JSON.stringify(itemdata.lastname);
        })
    }

    // create a response
    const response = {
      statusCode: 200,
      body:id+name+lastname
    }
    callback(null, response)
  })
}