import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { Storage } from "./storage";

export const test: Handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
	return {
		statusCode: 200,
		body: "Lambda is working"
	}
}

export const getOne: Handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
	
}

export const getAll: Handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
	
}


export const create: Handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
	if(!event.body) {
		return {
			statusCode: 400,
			body: "Empty request"
		}
	}
	const model = await JSON.parse(event.body)
	const storage = new Storage();
	try {
		const response = await storage.create(model);
		return {
			statusCode: 201,
			body: JSON.stringify(response)
		};
	} catch(err) {
		return {
			statusCode: err.statusCode || 500,
			body: err
		}
	}
	
}

export const update: Handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
	
}

export const deleteOne: Handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
	
}

