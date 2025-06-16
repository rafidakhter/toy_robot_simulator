import { Test, TestingModule } from '@nestjs/testing'
import { LocationsService } from './locations.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Location } from '../../entities'
import { Orientation } from '@toy-robot-simulator/shared'
import { CreateLocationDto } from './dto'

describe('LocationsService', () => {
  let service: LocationsService
  let repository: Repository<Location>

  const mockLocation: Location = {
    id: 1,
    orientation: 'NORTH' as Orientation,
    row: 1,
    column: 1,
  }

  const mockCreateLocationDto: CreateLocationDto = {
    orientation: 'NORTH' as Orientation,
    row: 1,
    column: 1,
  }

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockLocation),
    save: jest.fn().mockResolvedValue(mockLocation),
    find: jest.fn().mockResolvedValue([mockLocation]),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<LocationsService>(LocationsService)
    repository = module.get<Repository<Location>>(getRepositoryToken(Location))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('toDto', () => {
    it('should convert Location entity to CreateLocationDto', () => {
      const result = service['toDto'](mockLocation)
      expect(result).toEqual({
        orientation: 'NORTH',
        row: 1,
        column: 1,
      })
    })
  })

  describe('toEntity', () => {
    it('should convert CreateLocationDto to Location entity', () => {
      const result = service['toEntity'](mockCreateLocationDto)
      expect(result).toEqual({
        orientation: 'NORTH',
        row: 1,
        column: 1,
      })
    })
  })

  describe('create', () => {
    it('should create a new location', async () => {
      const result = await service.create(mockCreateLocationDto)

      expect(mockRepository.create).toHaveBeenCalledWith({
        orientation: 'NORTH',
        row: 1,
        column: 1,
      })
      expect(mockRepository.save).toHaveBeenCalledWith(mockLocation)
      expect(result).toEqual({
        orientation: 'NORTH',
        row: 1,
        column: 1,
      })
    })

    it('should throw an error if repository save fails', async () => {
      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new Error('Save failed'))

      await expect(service.create(mockCreateLocationDto)).rejects.toThrow(
        'Save failed',
      )
    })
  })

  describe('findLast', () => {
    it('should find the last location', async () => {
      const result = await service.findLast()

      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { id: 'DESC' },
        take: 1,
      })
      expect(result).toEqual({
        orientation: 'NORTH',
        row: 1,
        column: 1,
      })
    })

    it('should return null if no locations exist', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([])

      const result = await service.findLast()

      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { id: 'DESC' },
        take: 1,
      })
      expect(result).toBeNull()
    })

    it('should throw an error if repository find fails', async () => {
      jest
        .spyOn(repository, 'find')
        .mockRejectedValueOnce(new Error('Find failed'))

      await expect(service.findLast()).rejects.toThrow('Find failed')
    })
  })
})
