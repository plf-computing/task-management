import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from './auth.schema';

// export const GetUser = createParamDecorator((data,req)): User =>{
//     return req.user;
// }
// export const GetUser = () => createParamDecorator((data, req):User => {
//   return req.user;
// });

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );