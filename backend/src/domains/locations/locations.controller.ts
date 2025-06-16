import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LocationsService } from './locations.service'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { LocationDto } from '@toy-robot-simulator/shared'
import { CreateLocationDto } from './dto'

@Controller('locations')
@UsePipes(new ValidationPipe())
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get the last stored location' })
  lastLocation(): Promise<LocationDto | null> {
    return this.locationService.findLast()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: CreateLocationDto })
  @ApiBadRequestResponse({ description: 'Invalid Params' })
  create(
    @Body() location: CreateLocationDto,
  ): Promise<CreateLocationDto | null> {
    return this.locationService.create(location)
  }
}
