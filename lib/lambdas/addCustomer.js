'use strict';
import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';
const dynamoDb = new DynamoDB.DocumentClient();
exports.addCustomer = function (event, context, callback) {
    const data = JSON.parse(JSON.stringify(event));
    if (typeof data.name !== 'string' && data.lastname !== 'string') {
        console.error('Wrong format.');
        callback(new Error('Could not creat the new Customer.'));
        return;
    }
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            name: data.name,
            lastname: data.lastname
        }
    };
    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(new Error('Could not creat the new Customer.'));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
};
//# sourceMappingURL=addCustomer.js.map