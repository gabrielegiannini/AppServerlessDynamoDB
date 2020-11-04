'use strict'

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

exports.addAppointment = function(event, context, callback){
    const data = JSON.parse(JSON.stringify(event))
    if (typeof data.date !== 'string') {//controllo sul tipo dell'input per determinare se e' conforme
      console.error('Wrong format.')
      callback(new Error('Could not creat the new Appointment.'))
      return
    }

    const params = {//e' aggiunta una condition expression per evitare che il nuovo appuntamento venga sovrascritto a quello gia' esistente.
      TableName: 'AppointmentDB',
      Item: {
        date: event.date
      },
      ConditionExpression: "#date <> :dateKeyVal",
      ExpressionAttributeValues: {
        ":dateKeyVal" : event.date
      },
      ExpressionAttributeNames: {
        "#date" : 'date'
      }
    }

    dynamoDb.put(params, (error, result) => {
    if (error) {//gestione errori
      console.log('Could not creat the new Appointment, the date is occupied')
    }else{
      console.log('Appointment added')
    }

  })
}