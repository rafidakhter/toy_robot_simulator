import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationsModule } from './domains'
import { Location } from './entities'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database:
          process.env.NODE_ENV === 'test' ? ':memory:' : 'database.sqlite',
        entities: [Location],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    LocationsModule,
  ],
  exports: [LocationsModule],
})
export class AppModule {}
