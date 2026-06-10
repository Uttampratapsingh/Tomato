import { Request, Response, RequestHandler, NextFunction} from "express"; //These are TypeScript types provided by Express.
//Request -> Represents the incoming HTTP request. eg. req.body, req.params, req.query, etc.
//Response -> Represents the outgoing HTTP response. eg. res.json(...), res.send(...), res.status(...)
//RequestHandler -> Represents a function that handles HTTP requests. 
//NextFunction -> Represents the next function in the middleware chain.

// Instead of writing try-catch inside every controller, write it once and reuse it everywhere.

const TryCatch = (handler: RequestHandler): RequestHandler => { //it returns a new function that wraps the original handler with a try-catch block. The returned function is also of type RequestHandler, so it can be used as a middleware in Express routes.
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("TryCatch middleware initialized");
            await handler(req, res, next);
        } catch (error) {
            console.error("Error in TryCatch middleware:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

export default TryCatch;