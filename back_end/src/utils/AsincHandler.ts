const asyncHandlers = (requestHandler : Function) => {
  return (req : any, res : any, next : any): Promise<any> => {
    return Promise.resolve(requestHandler(req, res, next)).catch((err) =>
      next(err),
    );
  };
};

export default asyncHandlers;