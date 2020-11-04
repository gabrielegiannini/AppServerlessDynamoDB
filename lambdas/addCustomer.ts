'use strict'

import { DynamoDB } from 'aws-sdk'
import * as uuid from 'uuid'

const dynamoDb = new DynamoDB.DocumentClient()

exports.addCustomer = function(event, context, callback){
    const data = JSON.parse(JSON.stringify(event))
    if (typeof data.name !== 'string' && data.lastname !== 'string') {//controllo sul tipo dell'input per determinare se e' conforme
      console.error('Wrong format.')
      callback(new Error('Could not creat the new Customer.'))
      return
    }

    const params = {//definizione dei parametri per la funzione put di dynamoDB
      TableName: "CustomersDB",
      Item: {
        id: uuid.v1(),
        name: data.name,
        lastname: data.lastname
      }
    }

    dynamoDb.put(params, error => {
    if (error) {//gestione errori
      console.log('Could not creat the new Customer.')
    }else{
      console.log('Customer added')
    }
  })

}