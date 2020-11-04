import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const eventBody = JSON.parse(JSON.stringify(event))
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:eventBody.key1 == "value1",
    }, null, 2),
  };
}
