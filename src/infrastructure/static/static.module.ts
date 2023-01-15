import {ServeStaticModule} from '@nestjs/serve-static';
import {Module} from '@nestjs/common';
import {join} from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {rootPath: createClientPath('assets'), serveRoot: '/'},
      {rootPath: createClientPath('icons'), serveRoot: '/'},
      {rootPath: createClientPath('www'), serveRoot: '/'},
      {rootPath: 'node_modules/vue/dist/', serveRoot: '/'},
      {rootPath: createClientPath('www'), serveRoot: '/:room'},
    ),
  ],
})
export class StaticModule {}

function createClientPath(path: string): string {
  return join(__dirname, '../../../..', 'client', path);
}
