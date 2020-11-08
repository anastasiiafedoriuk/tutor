import {Get, JsonController} from 'routing-controllers';

@JsonController('/hello')
export class HelloController {

  @Get()
  hello(): Record<string, string> {
    return {
      hello: 'Hello World'
    };
  }
}
