import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { writeFileSync } from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 4800

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Toy Robot Simulator API')
    .setDescription('API documentation for the Toy Robot Simulator backend')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  // Save Swagger JSON to a file
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2))

  SwaggerModule.setup('api', app, document)

  console.log(`Application is running on: http://localhost:${port}`)

  // Enable CORS
  app.enableCors()

  await app.listen(port)
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err)
})
