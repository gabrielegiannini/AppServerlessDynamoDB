'use strict'

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

exports.removeAppointment = function(event, context, callback){
    const data = JSON.parse(JSON.stringify(event))
    if (typeof data.date !== 'string') {//controllo sul tipo dell'input per determinare se e' conforme
      console.error('Wrong format.')
      callback(new Error('Could not delete this Appointment.'))
      return
    }

    var params = {//definizione dei parametri per la funzione delete di dynamoDB
      TableName: "AppointmentDB",
      Key: {
          "date":event.date
      }
    }

    dynamoDb.delete(params, error => {
    if (error) {//gestione errori
      console.log("Impossible to delete")
    }else{
      console.log("Appointment deleted")
    }
  })
  
}

