import 'source-map-support/register';
export const hello = async (event, _context) => {
    const eventBody = JSON.parse(JSON.stringify(event));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: eventBody.key1 == "value1",
        }, null, 2),
    };
};
//# sourceMappingURL=handler.js.map