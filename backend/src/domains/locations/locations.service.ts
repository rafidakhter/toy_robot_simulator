import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Location } from '../../entities'
import { Orientation } from '@toy-robot-simulator/shared'
import { CreateLocationDto } from './dto'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  private toDto(location: Location): CreateLocationDto {
    return {
      row: location.row,
      column: location.column,
      orientation: location.orientation as Orientation,
    }
  }

  private toEntity(dto: CreateLocationDto): Partial<Location> {
    return {
      row: dto.row,
      column: dto.column,
      orientation: dto.orientation,
    }
  }

  async create(dto: CreateLocationDto): Promise<CreateLocationDto> {
    const newLocation = this.locationsRepository.create(this.toEntity(dto))
    const savedLocation = await this.locationsRepository.save(newLocation)
    return this.toDto(savedLocation)
  }

  async findLast(): Promise<CreateLocationDto | null> {
    const [lastLocation] = await this.locationsRepository.find({
      order: { id: 'DESC' },
      take: 1,
    })
    return lastLocation ? this.toDto(lastLocation) : null
  }
}
