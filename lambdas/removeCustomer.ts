'use strict'

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

exports.removeCustomer = function(event, context, callback){
    const data = JSON.parse(JSON.stringify(event))
    if (typeof data.id != 'string') {//controllo sul tipo dell'input per determinare se e' conforme
      console.error('Wrong format.')
      callback(new Error('Could not delete this Customer.'))
      return
    }

    var params = {//definizione dei parametri per la funzione delete di dynamoDB
      TableName: "CustomersDB",
      Key: {
          "id":event.id
      }
    }

    dynamoDb.delete(params, error => {
    if (error) {//gestione errori
        console.log("Impossible to delete")
    }else{
        console.log("Item deleted")
    }
  })
  
}

