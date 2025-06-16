import { Test, TestingModule } from '@nestjs/testing'
import { LocationsController } from './locations.controller'
import { LocationsService } from './locations.service'
import { CreateLocationDto } from './dto'

describe('LocationsController', () => {
  let controller: LocationsController

  const mockLocation = {
    orientation: 'NORTH',
    row: 1,
    column: 1,
  } as CreateLocationDto

  const mockService = {
    create: jest.fn().mockResolvedValue(mockLocation),
    findLast: jest.fn().mockResolvedValue(mockLocation),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
          provide: LocationsService,
          useValue: mockService,
        },
      ],
    }).compile()

    controller = module.get<LocationsController>(LocationsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a new location', async () => {
    const location = {
      orientation: 'NORTH',
      row: 1,
      column: 1,
    } as CreateLocationDto

    const result = await controller.create(location)

    expect(mockService.create).toHaveBeenCalledWith(location)
    expect(result).toEqual(mockLocation)
  })

  it('should return the last location', async () => {
    const result = await controller.lastLocation()

    expect(mockService.findLast).toHaveBeenCalled()
    expect(result).toEqual(mockLocation)
  })
})
